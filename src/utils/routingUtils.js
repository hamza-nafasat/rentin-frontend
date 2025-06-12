/**
 * Centralized routing utility for role-based access control
 */

// Define route configurations with role permissions
export const ROUTE_CONFIG = {
  // Role-specific routes
  '/admin': { roles: ['admin'], exactMatch: false },
  '/owner': { roles: ['owner'], exactMatch: false },
  '/tenant': { roles: ['tenant'], exactMatch: false },
  '/agent': { roles: ['agent'], exactMatch: false },

  // Public routes (no auth required)
  '/login': { roles: [], exactMatch: true, public: true },
  '/signup': { roles: [], exactMatch: true, public: true },
  '/register': { roles: [], exactMatch: true, public: true },
  '/forgot-password': { roles: [], exactMatch: true, public: true },
};

/**
 * Gets the appropriate route an authenticated user should be redirected to
 * @param {string} currentPath - Current route user is trying to access
 * @param {string} role - User role
 * @returns {string|null} - Redirect path or null if no redirect needed
 */
export const getRedirectPath = (currentPath, role) => {
  if (!role) return '/login';

  // Handle public routes
  const isPublicRoute = Object.entries(ROUTE_CONFIG).some(([path, config]) => {
    if (!config.public) return false;
    return config.exactMatch ? currentPath === path : currentPath.startsWith(path);
  });

  if (isPublicRoute) {
    return getDefaultRouteForRole(role);
  }

  // Check if user has access to current path
  const hasAccess = hasRouteAccess(currentPath, { role }, true);
  if (!hasAccess) {
    return getDefaultRouteForRole(role);
  }

  // Special case for root path
  if (currentPath === '/' && getDefaultRouteForRole(role) !== '/') {
    return getDefaultRouteForRole(role);
  }

  return null;
};

/**
 * Checks if user has access to a specific route based on their role
 * @param {string} pathname - Current route path
 * @param {object} user - User object containing role information
 * @param {boolean} isAuthenticated - Authentication status
 * @returns {boolean} - Whether user has access to route
 */
export const hasRouteAccess = (pathname, user, isAuthenticated) => {
  // Public routes are accessible without authentication
  const isPublicRoute = Object.entries(ROUTE_CONFIG).some(([route, config]) => {
    if (!config.public) return false;
    return config.exactMatch ? pathname === route : pathname.startsWith(route);
  });

  if (isPublicRoute) return true;
  if (!isAuthenticated || !user?.role) return false;

  // Check role-based access
  return Object.entries(ROUTE_CONFIG).some(([route, config]) => {
    if (config.public) return false;
    const pathMatches = config.exactMatch ? pathname === route : pathname.startsWith(route);
    return pathMatches && (!config.roles.length || config.roles.includes(user.role));
  });
};

/**
 * Gets default route for a user based on their role
 * @param {string} role - User role
 * @returns {string} - Default route for role
 */
export const getDefaultRouteForRole = role => {
  const roleRoutes = {
    admin: '/admin',
    owner: '/owner',
    tenant: '/tenant',
    agent: '/agent',
  };
  return roleRoutes[role] || '/login';
};

/**
 * Determine if a path should be protected by authentication
 * @param {string} pathname - Current path
 * @returns {boolean} - Whether path requires authentication
 */
export const isProtectedRoute = pathname => {
  return !Object.entries(ROUTE_CONFIG).some(([route, config]) => {
    if (!config.public) return false;
    return config.exactMatch ? pathname === route : pathname.startsWith(route);
  });
};
