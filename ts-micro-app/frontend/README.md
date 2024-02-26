npx create-next-app@latest

with name frontend
with typescript > yes
with eslint > yes
with tailwind css > yes
with src > yes
with app router > yes
with default import alias > no

cd frontend
rm -rf package-lock.json 
yarn install
yarn dev



yarn install @mui/material @emotion/react @emotion/server @emotion/styled @emotion/cache

yarn add @fontsource/roboto

update src/app/page.tsx
```js
'use client';
import Switch from "@mui/material/Switch";
import styles from "../styles/List.module.css";

const label = { inputProps: { "aria-label": "Switch demo" } };
  
export default function Home() {
 return ( 
   <div className={styles.container}>
     <div>
       <span>With default Theme:</span>
     </div>
     <Switch {...label} defaultChecked />
     <Switch {...label} />
     <Switch {...label} disabled defaultChecked />
   </div>
 );
}
```

mkdir src/styles
add src/styles/List.module.css
```js
.container {
  padding: 0 2rem; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: aquamarine;
}  

```

