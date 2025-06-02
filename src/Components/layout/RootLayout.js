// // import { Outlet, useLocation } from "react-router-dom";
// // import MainNavigation from "./MainNavigation";
// // import React from "react";

// // export default function RootLayout() {
// //   const location = useLocation();

   
// //   const hideNav = location.pathname === "/login" || location.pathname === "/signup";

// //   return (
// //     <>
// //       {!hideNav && <MainNavigation />}
// //       <Outlet />
// //     </>
// //   );
// // }

import { Outlet, useLocation } from "react-router-dom";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout() {
  const location = useLocation();
  const hideLayout = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideLayout && <Header />}
      <main>
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}

// import { Outlet, useLocation } from "react-router-dom";
// import React from "react";
// import Header from "./Header";
// import Footer from "./Footer";

// export default function RootLayout() {
//   const location = useLocation();
//   // const hiddenRoutes = ["/login", "/signup"];
//   // const hideLayout = hiddenRoutes.includes(location.pathname);
//   const hideLayout = location.pathname === "/login" || location.pathname === "/signup";
  

//   return (
//     <>
//       {!hideLayout && <Header />}
//       <main>
//         <Outlet />
//       </main>
//       {!hideLayout && <Footer />}
//     </>
//   );
// }
