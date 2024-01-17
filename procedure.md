# Procedure

- Add Navbar, Home and Footer components.
- The go to the `App.jsx` and add the components.
- The inside the main.jsx remove `<App>` and add `<RouterProvider>` since we're using router for navbar.
- Now for the RouterProvider we have to create a new router.
- Lets name the router as `navrouter` and add it to the `<RouterProvider router={navrouter}>`.
- Also, add `import {RouterProvider, createBrowserRouter} from 'react-router'dom`.
- now create the router named `navrouter`.
- then 
```js
const router = createBrowserRouter([
    {path: '/',
    element: <Layout/>}
])
```
- The '/' is home page, we can add to path for different elements


- Now create a new component `Layout.jsx` in `Layout` folder
- In it add all the components.
- Then import outlet from react router dom
- Whereever you place your Outlet that particular components change and rest remain fixed on the page.
- 
