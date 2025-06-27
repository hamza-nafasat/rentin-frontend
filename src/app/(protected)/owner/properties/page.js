import MyProperties from '@/components/owner/properties/MyProperties';
import PropertyHeader from '@/components/owner/properties/PropertyHeader';
import TopCards from '@/components/owner/properties/TopCards';
import { propertiesCardsData } from '@/data/data';

const Properties = () => {
  return (
    <div>
      <PropertyHeader title={'Properties Details'} />
      <TopCards data={propertiesCardsData} />
      <MyProperties />
    </div>
  );
};

export default Properties;

// import MyProperties from '@/components/owner/properties/MyProperties';
// import PropertyHeader from '@/components/owner/properties/PropertyHeader';
// import TopCards from '@/components/owner/properties/TopCards';
// import { propertiesCardsData } from '@/data/data';
// import { cookies } from 'next/headers';

// const Properties = async () => {
//   const cookieStore = await cookies(); // Next.js 15+ async API  :contentReference[oaicite:0]{index=0}
//   console.log('All cookies I received:', cookieStore.getAll());
//   const accessToken = cookieStore.get('rentin-access-token')?.value ?? null;
//   const refreshToken = cookieStore.get('rentin-refresh-token')?.value ?? null;
//   console.log({ accessToken, refreshToken });
//   return (
//     <div>
//       <PropertyHeader title={'Properties Details'} />
//       <TopCards data={propertiesCardsData} />
//       <MyProperties />
//     </div>
//   );
// };

// export default Properties;

// app/(owner)/properties/page.js

// import PropertyHeader from '@/components/owner/properties/PropertyHeader';
// import TopCards from '@/components/owner/properties/TopCards';
// import MyProperties from '@/components/owner/properties/MyProperties';
// import { propertiesCardsData } from '@/data/data';
// import { cookies } from 'next/headers';

// export const dynamic = 'force-dynamic'; // make every request user-specific

// const PropertiesPage = async () => {
//   /* 1 — read cookies coming with the request */
//   const cookieStore = await cookies();
//   const accessToken = cookieStore.get('rentin-access-token')?.value;
//   const refreshToken = cookieStore.get('rentin-refresh-token')?.value;

//   /* 2 — build Cookie header exactly as the browser sends it */
//   const cookieHeader = [
//     accessToken && `rentin-access-token=${accessToken}`,
//     refreshToken && `rentin-refresh-token=${refreshToken}`,
//   ]
//     .filter(Boolean)
//     .join('; '); // "name=value; name2=value2"

//   /* 3 — compose the API URL */
//   const apiBase =
//     process.env.NEXT_PUBLIC_API_URL || // e.g. http://localhost:5001
//     process.env.NEXT_PUBLIC_BASE_URL ||
//     'http://localhost:5001';

//   // Adjust this path if your backend route differs
//   const endpoint = `${apiBase}/api/property/my-all`;

//   /* 4 — call backend and log the full payload */
//   let properties = [];

//   if (!cookieHeader) {
//     console.warn('No auth cookies found; returning empty list');
//   } else {
//     try {
//       const res = await fetch(endpoint, {
//         method: 'GET',
//         headers: { cookie: cookieHeader },
//         cache: 'no-store',
//       });

//       if (res.ok) {
//         properties = await res.json();
//         console.log('Fetched properties:', properties); // ← full data here
//       } else {
//         const body = await res.text();
//         console.error(`GET ${endpoint} → ${res.status}`, body);
//       }
//     } catch (err) {
//       console.error(`GET ${endpoint} failed:`, err);
//     }
//   }

//   /* 5 — render */
//   return (
//     <div className="space-y-6">
//       <PropertyHeader title="Properties Details" />
//       <TopCards data={propertiesCardsData} />
//       <MyProperties data={properties} />
//     </div>
//   );
// };

// export default PropertiesPage;
