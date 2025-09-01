'use client';

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import Button from '../shared/small/Button';
import { useGiveConsentMutation } from '@/features/auth/authApi';
import { setUser } from '@/features/auth/authSlice';
import { getDefaultRouteForRole } from '@/utils/routingUtils';

const ConsentForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [giveConsent, { isLoading: isSubmitting }] = useGiveConsentMutation();

  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const canvasRef = useRef(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  const startDrawing = e => {
    if (isSubmitting) return;

    setIsDrawing(true);
    setHasSignature(true);

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    lastPositionRef.current = { x, y };
  };

  const draw = e => {
    if (!isDrawing || isSubmitting) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastPositionRef.current.x, lastPositionRef.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPositionRef.current = { x, y };
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    if (isSubmitting) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const isFormValid = hasSignature && agreedToTerms;

  const canvasToBlob = canvas => {
    return new Promise(resolve => {
      canvas.toBlob(resolve, 'image/png');
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error('Please sign and agree to the terms and conditions');
      return;
    }

    try {
      const canvas = canvasRef.current;
      const blob = await canvasToBlob(canvas);

      const formData = new FormData();
      formData.append('signature', blob, 'signature.png');

      const response = await giveConsent(formData).unwrap();

      // Update user state to reflect consent
      const updatedUserData = {
        ...user,
        user: {
          ...user.user,
          data: {
            ...user?.user?.data,
            hasConsented: true,
          },
        },
      };
      dispatch(setUser(updatedUserData));

      toast.success('Consent given successfully!');

      // Redirect to role-specific dashboard

      const defaultRoute = getDefaultRouteForRole(user?.role);
      window.location.href = defaultRoute;
    } catch (error) {
      console.error('Consent error:', error);
      toast.error(error?.data?.message || 'Failed to submit consent');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form className="w-full max-w-4xl rounded-xl bg-white p-5 lg:px-[8%] lg:py-8" onSubmit={handleSubmit}>
        <h6 className="text-text-textPrimary mb-6 text-center text-xl font-semibold md:text-left lg:text-2xl">
          Terms and Conditions Agreement
        </h6>

        {/* Terms and Conditions Content */}
        <div className="mb-8 max-h-80 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">Rentin Platform Agreement</h3>

          <div className="space-y-4 text-sm leading-relaxed text-gray-700">
            <p>
              <strong>1. Platform Purpose:</strong> Rentin is a digital platform designed to facilitate legitimate
              property rental transactions between property owners and tenants. All properties listed and rented through
              this platform are subject to legal oversight and regulation.
            </p>

            <p>
              <strong>2. Legal Validity:</strong> By using this platform, you acknowledge that:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>All rental agreements facilitated through Rentin constitute legally binding contracts</li>
              <li>Properties listed on this platform are legitimate and legally available for rental</li>
              <li>
                All transactions conducted through this platform are subject to applicable local, state, and federal
                laws
              </li>
            </ul>

            <p>
              <strong>3. Digital Signature Authority:</strong> Your digital signature provided on this platform:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Will be used for official rental contracts and legal documentation</li>
              <li>Carries the same legal weight as a handwritten signature</li>
              <li>Binds you to the terms of any rental agreement you enter into through this platform</li>
            </ul>

            <p>
              <strong>4. Legal Enforcement:</strong> In case of contract breach or dispute:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Legal action may be taken against any party that violates the terms of rental agreements</li>
              <li>Your signature and consent serve as evidence of your agreement to these terms</li>
              <li>All parties are subject to the jurisdiction of applicable courts</li>
            </ul>

            <p>
              <strong>5. Platform Responsibility:</strong> Rentin serves as a facilitator for legitimate rental
              transactions and maintains the right to enforce these terms through appropriate legal channels.
            </p>

            <p>
              <strong>6. User Responsibility:</strong> By signing below, you confirm that you understand the legal
              implications of using this platform and agree to conduct all transactions in good faith and in accordance
              with applicable laws.
            </p>
          </div>
        </div>

        {/* Signature Section */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Digital Signature <span className="text-red-500">*</span>
          </label>
          <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
            <canvas
              ref={canvasRef}
              width={600}
              height={200}
              className="h-32 w-full cursor-crosshair touch-none rounded border border-gray-200 bg-white"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={e => {
                e.preventDefault();
                startDrawing(e);
              }}
              onTouchMove={e => {
                e.preventDefault();
                draw(e);
              }}
              onTouchEnd={e => {
                e.preventDefault();
                stopDrawing();
              }}
              style={{ touchAction: 'none' }}
            />
            <div className="mt-3 flex items-center justify-between">
              <p className="text-xs text-gray-500">Sign above using your mouse or finger</p>
              <button
                type="button"
                onClick={clearSignature}
                disabled={isSubmitting}
                className="text-sm text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear Signature
              </button>
            </div>
          </div>
        </div>

        {/* Checkbox for Terms Agreement */}
        <div className="mb-6">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={e => setAgreedToTerms(e.target.checked)}
              disabled={isSubmitting}
              className="text-primary focus:ring-primary mt-1 h-4 w-4 rounded border-gray-300 disabled:opacity-50"
            />
            <span className="text-sm leading-relaxed text-gray-700">
              I have read, understood, and agree to the terms and conditions stated above. I acknowledge that my digital
              signature will be used for official rental contracts and legal documentation, and I understand the legal
              implications of using the Rentin platform.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row lg:justify-start">
          <Button
            width="w-full md:w-[240px]"
            height="h-[43px]"
            text={isSubmitting ? 'Submitting...' : 'Accept Terms & Continue'}
            type="submit"
            disabled={!isFormValid || isSubmitting}
            cn={!isFormValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
          />
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you acknowledge that you have the legal authority to enter into binding rental agreements and
            understand the legal consequences of using this platform.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ConsentForm;
