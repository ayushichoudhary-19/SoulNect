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
- Observe the rest



## Home FeatureCardComponent
Now for component our initial approah was creating seperate FeatureCard.jsx and access it directly into our home.jsx
Home.jsx looked like this after that:
```js
       <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-center my-12">
                        Features
                    </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-10 px-10 mx-10 ms:mx-3 ">
        <FeatureCard
        icon="src\assets\images\Home\moodlog.png"
        title="Mood Log"
        description="Log your moods and track them over time with an interactive graph on the dashboard, gaining insights into your emotional well-being."       />
        <FeatureCard
        icon="src\assets\images\Home\journal.png"
        title="Journal"
        description="Express yourself freely in a personal journal, with the ability to revisit and reflect on your thoughts and experiences over time."  />
        <FeatureCard
        icon="src\assets\images\Home\meditate.png"
        title="Meditation"
        description="Explore guided meditations to nurture your mind and soul, promoting mindfulness and relaxation for a balanced and centered lifestyle"    
        />
        <FeatureCard
        icon="src\assets\images\Home\resources.png"
        title="Resources"
        description="Access a wealth of mental health resources, including free videos and blogs, designed to support your well-being and personal growth." />
        <FeatureCard
        icon="src\assets\images\Home\community.png"
        title="Community"
        description="Engage in meaningful discussions with a supportive community, fostering connections and sharing experiences for a shared journey toward emotional resilience."     />
        </div>
        </div>
```

For omtimization I stored this info in a DS.
overview of approach: 
```jsx
import React from "react";
import FeatureCard from "./FeatureCard";

const featuresData = [
  {
    icon: "src/assets/images/Home/moodlog.png",
    title: "Mood Log",
    description: "Log your moods and track them over time with an interactive graph on the dashboard, gaining insi  ghts into your emotional well-being.",
  },
  {
    icon: "src/assets/images/Home/journal.png",
    title: "Journal",
    description: "Express yourself freely in a personal journal, with the ability to revisit and reflect on your thoughts and experiences over time.",
  },
  {
    icon: "src/assets/images/Home/meditate.png",
    title: "Meditation",
    description: "Explore guided meditations to nurture your mind and soul, promoting mindfulness and relaxation for a balanced and centered lifestyle.",
  },
  {
    icon: "src/assets/images/Home/resources.png",
    title: "Resources",
    description: "Access a wealth of mental health resources, including free videos and blogs, designed to support your well-being and personal growth.",
  },
  {
    icon: "src/assets/images/Home/community.png",
    title: "Community",
    description: "Engage in meaningful discussions with a supportive community, fostering connections and sharing experiences for a shared journey toward emotional resilience.",
  },
];

export default function Home() {
  return (
    <>
      {/* existing code  */}
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-center my-12">
          Features
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-10 px-10 mx-10 ms:mx-3">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </>
  );
}
```


- In 
```jsx
{featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
```

- `{}`: This syntax is used to embed JavaScript expressions within JSX.

- `featuresData.map((feature, index) => ...)`: This is the `map` function, a method provided by arrays in JavaScript. It iterates over each element of the `featuresData` array, and for each element, it executes the provided function. In this case, the function takes two parameters - `feature` and `index` - representing the current element and its index in the array.

- `<FeatureCard ... />`: This JSX element represents the `FeatureCard` component. For each iteration, it creates a new instance of the `FeatureCard` component with the specified properties.

- `key={index}`: The `key` attribute is used to help React identify which items have changed, are added, or are removed. In this case, it uses the `index` as a unique identifier.

- `icon={feature.icon}`, `title={feature.title}`, `description={feature.description}`: These are props being passed to the `FeatureCard` component, providing the necessary information for each feature.

So, this loop is dynamically creating instances of the `FeatureCard` component for each element in the `featuresData` array, rendering them with the specified properties.