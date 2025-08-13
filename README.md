# 🧱 @nirajbagdi/react-masonry

> A lightweight, responsive masonry layout component for React.

---

## ✨ Features

-   **⚡ Tiny & Fast** – ~3KB gzipped, no dependencies
-   **📱 Responsive by Design** – Set custom columns per screen size
-   **🎨 Highly Customizable** – Change gaps, breakpoints, and base columns
-   **💡 No Extra CSS** – All layout logic is inline styles
-   **🛡 Built for TypeScript** – Full typings out of the box

---

## 📦 Installation

```bash
npm install @nirajbagdi/react-masonry

# or

yarn add @nirajbagdi/react-masonry
```

---

## 🚀 Usage

### Basic Example

```tsx
import Masonry from '@nirajbagdi/react-masonry';

export default function App() {
    return (
        <Masonry>
            <div style={{ background: '#f88', height: 100 }}>Item 1</div>
            <div style={{ background: '#8f8', height: 150 }}>Item 2</div>
            <div style={{ background: '#88f', height: 200 }}>Item 3</div>
            <div style={{ background: '#ff8', height: 120 }}>Item 4</div>
        </Masonry>
    );
}
```

### Responsive with Breakpoints

```tsx
<Masonry
    defaultColumns={4}
    breakpoints={{
        480: 1,
        768: 2,
        1024: 3,
        1440: 4,
    }}
    gap="1rem"
>
    {Array.from({ length: 10 }).map((_, i) => (
        <div
            key={i}
            style={{
                background: '#eee',
                height: 80 + i * 20,
            }}
        >
            Item {i + 1}
        </div>
    ))}
</Masonry>
```

---

## ⚙️ Props

| Prop             | Type                     | Default                                | Description                                   |
| ---------------- | ------------------------ | -------------------------------------- | --------------------------------------------- |
| `defaultColumns` | `number`                 | `4`                                    | Number of columns when no breakpoint matches. |
| `breakpoints`    | `Record<number, number>` | `{ 480: 1, 768: 2, 1024: 3, 1440: 4 }` | Map of viewport width (px) to column count.   |
| `gap`            | `number \| string`       | `"1.6rem"`                             | Gap between columns and items.                |
| `className`      | `string`                 | `undefined`                            | Custom class for the container.               |
| `children`       | `React.ReactNode`        | —                                      | Masonry items to display.                     |

---

## 🛠 How it Works

-   ResizeObserver watches the container width
-   Chooses the right column count based on your breakpoints
-   Splits children into evenly distributed columns
-   Uses flex layout for minimal CSS

---

## 📜 License

MIT © [Niraj Bagdi](https://github.com/nirajbagdi)
