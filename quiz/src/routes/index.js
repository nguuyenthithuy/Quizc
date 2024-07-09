import Home from "../pages/Home";
import Topic from "../pages/Topic";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Answers from "../pages/Answers";
import Quiz from "../pages/Quiz";
import Result from "../pages/Result";
import Private from "../components/PrivateRoutes";
import LayoutDefault from "../layout/LayoutDefault";
import Logout from "../pages/Logout";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "logout",
        element: <Logout />,
      },

      {
        element: <Private />,
        children: [
          {
            path: "topic",
            element: <Topic />,
          },
          {
            path: "answers",
            element: <Answers />,
          },
          {
            path: "quiz/:id",
            element: <Quiz />,
          },
          {
            path: "result/:id",
            element: <Result />,
          },
        ],
      },
    ],
  },
];

{
  /* <Routes>
  <Route path="/" element={<LayoutDefault />}>
    <Route path="/" element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />
    <Route path="blog" element={<Blog />}>
      <Route index element={<BlogAll />} />
      <Route path="news" element={<BlogNews />} />
      <Route path="related" element={<BlogRelated />} />
      <Route path=":id" element={<BlogDetail />} />
    </Route>
    <Route path="*" element={<Error404 />} />
    <Route path="login" element={<Login />} />

    <Route element={<Private />}>
      <Route path="info-user" element={<InfoUser />} />
    </Route>
  </Route>
</Routes>; */
}
