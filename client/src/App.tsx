import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, Bell, ChevronRight, Clock3, Compass, Heart, Home as HomeIcon,
  Minus, Plus, Search, ShoppingBag, Sparkles, UserRound, Utensils, X,
} from "lucide-react";

type Category = "Main Dish" | "Soup" | "Swallow" | "Snacks" | "Protein";
type Product = { id: string; name: string; description: string; price: number; category: Category; image?: string; featured?: boolean };
type BasketLine = Product & { quantity: number };

const img = (id: string) => `https://smrxhjrlcbjhyyocyyyq.supabase.co/storage/v1/object/public/menu-images/${id}.jpg`;
const heroImages = [
  "https://smrxhjrlcbjhyyocyyyq.supabase.co/storage/v1/object/public/hero-slides/be13227c-e0d2-4d29-83ac-5eaf0c7dc5af.jpg",
  "https://smrxhjrlcbjhyyocyyyq.supabase.co/storage/v1/object/public/hero-slides/031582f8-d34e-438b-b999-49bfa1a511f0.jpg",
];

const products: Product[] = [
  { id: "jollof", name: "Jollof Rice", description: "2 spoons", price: 1400, category: "Main Dish", image: "a9424fec-83f0-4d2d-a011-404fb7b30d92", featured: true },
  { id: "fried", name: "Fried Rice", description: "2 spoons", price: 1400, category: "Main Dish", image: "e99e681e-cd3a-44fc-9005-25b984328a61", featured: true },
  { id: "white", name: "White Rice", description: "2 spoons", price: 1400, category: "Main Dish", image: "65f12540-debe-47bc-b0e3-928bac042cf9" },
  { id: "ricebeans", name: "Rice and Beans", description: "2 spoons", price: 1400, category: "Main Dish", image: "e595f5b3-fa2e-40db-a986-13f661b8631a" },
  { id: "chinese", name: "Chinese Rice", description: "2 spoons", price: 1500, category: "Main Dish", image: "0fd132dc-1fa7-4e4b-bce6-71ce35ad38bb" },
  { id: "coconut", name: "Coconut Rice", description: "2 spoons", price: 1500, category: "Main Dish", image: "be3cc04a-0fff-4d6e-b1f1-76bfcc6d6163" },
  { id: "special", name: "Special Rice", description: "1 spoon", price: 1000, category: "Main Dish", image: "35d239de-829a-4ae4-9cc7-937e3cd5c663" },
  { id: "native", name: "Native Rice", description: "2 spoons", price: 1200, category: "Main Dish", image: "86e3b107-bcb6-404c-b0ef-89cba77cc0b3" },
  { id: "asun", name: "Asun Rice", description: "1 spoon", price: 1000, category: "Main Dish", image: "54bde6f0-24bb-402e-bed8-028dfe250986" },
  { id: "yam", name: "Yamarita and Sauce", description: "Three pieces of yam and sauce", price: 2500, category: "Main Dish", image: "d9b91915-e070-4e65-95a8-9afca86b3f3d" },
  { id: "egusi", name: "Egusi", description: "2 spoons", price: 1000, category: "Soup", image: "b6c5e337-85fd-4aa5-bef6-d839a6991901", featured: true },
  { id: "efo", name: "Efo", description: "2 spoons", price: 1000, category: "Soup", image: "d4dabae1-6610-45a1-b9e6-e8c351813616" },
  { id: "afang", name: "Afang", description: "2 spoons", price: 1000, category: "Soup", image: "ed94472b-e91c-42a8-bbe5-2c2005f47d58" },
  { id: "okro", name: "Okro", description: "1 spoon", price: 800, category: "Soup", image: "2b73b0ca-77d6-4c3f-abd7-59f55aa0c336" },
  { id: "semo", name: "Semo", description: "One wrap", price: 400, category: "Swallow", image: "978c20e3-10e0-4802-a235-0838254a0945" },
  { id: "eba", name: "Eba", description: "One wrap", price: 400, category: "Swallow", image: "c1b64987-4cc1-4dcc-bb22-fbf621bafbc7" },
  { id: "chickenpie", name: "Chicken Pie", description: "Freshly baked", price: 900, category: "Snacks", image: "a0bbee8c-5688-48f2-accc-a09e8d921e1e", featured: true },
  { id: "meatpie", name: "Meat Pie", description: "Freshly baked", price: 900, category: "Snacks", image: "30a7e689-f492-4049-b647-e066cc549a37" },
  { id: "doughnut", name: "Jam Doughnut", description: "Filled with jam", price: 500, category: "Snacks", image: "4971be10-d8fb-4145-bf20-e093a4d261a3" },
  { id: "milky", name: "Milky Doughnut", description: "Creamy and soft", price: 800, category: "Snacks", image: "14dc27a0-97fa-4198-8eb8-adae8198c3a6" },
  { id: "fishroll", name: "Fish Roll", description: "Crispy fish roll", price: 700, category: "Snacks", image: "7ca6c9dd-81f3-48e9-8ac7-86c4b3fb5535" },
  { id: "toast", name: "CBX Toast", description: "Cookbox signature toast", price: 1500, category: "Snacks", image: "3727d9f5-f83d-47fb-a15f-53a86e075ccb" },
  { id: "turkey", name: "Turkey", description: "Full portion", price: 7500, category: "Protein", image: "3a96069f-8b2d-4606-93f3-58d42c674281" },
  { id: "smallturkey", name: "Small Turkey", description: "Small portion", price: 4000, category: "Protein", image: "d0cd0cee-f1b3-4a60-a16b-1b41f1d3fce7" },
  { id: "bigchicken", name: "Big Chicken", description: "Large chicken", price: 5500, category: "Protein", image: "19527f1b-5e41-433a-81f7-f19e57281702" },
  { id: "smallchicken", name: "Small Chicken", description: "Small chicken", price: 3000, category: "Protein", image: "04bda100-92bc-460f-97dc-4d34e2c13ac7" },
  { id: "crispy", name: "Crispy Chicken", description: "Crispy fried", price: 3000, category: "Protein", image: "75b29b32-c903-44c6-89db-1189d102d5cc" },
  { id: "egg", name: "Boiled Egg", description: "One boiled egg", price: 500, category: "Protein", image: "0f1b0508-66a0-4157-a18e-584e9892f1aa" },
  { id: "beef", name: "Beef", description: "Beef portion", price: 700, category: "Protein", image: "6c271b69-66f3-4309-90d5-eef82f7d694c" },
  { id: "fishsoup", name: "Cat Fish Pepper Soup", description: "Spicy pepper soup", price: 3000, category: "Protein", image: "6e83e4e3-47a2-4f1a-a3c0-2d90aa353dd4" },
];
const categories: { name: Category; icon: string; tone: string }[] = [
  { name: "Main Dish", icon: "🍚", tone: "gold" }, { name: "Soup", icon: "🍲", tone: "orange" },
  { name: "Swallow", icon: "🥣", tone: "cream" }, { name: "Snacks", icon: "🥐", tone: "peach" }, { name: "Protein", icon: "🍗", tone: "green" },
];
const money = (value: number) => `₦${value.toLocaleString("en-NG")}`;

export default function App() {
  const [screen, setScreen] = useState<"home" | "menu" | "orders" | "account">("home");
  const [category, setCategory] = useState<Category>("Main Dish");
  const [query, setQuery] = useState("");
  const [basket, setBasket] = useState<BasketLine[]>([]);
  const [showBasket, setShowBasket] = useState(false);
  const [toast, setToast] = useState("");
  const [hero, setHero] = useState(0);

  useEffect(() => { const timer = window.setInterval(() => setHero((v) => (v + 1) % heroImages.length), 5000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { const raw = localStorage.getItem("cookbox-basket"); if (raw) setBasket(JSON.parse(raw)); }, []);
  useEffect(() => { localStorage.setItem("cookbox-basket", JSON.stringify(basket)); }, [basket]);
  useEffect(() => { if (!toast) return; const timer = window.setTimeout(() => setToast(""), 2200); return () => window.clearTimeout(timer); }, [toast]);

  const add = (product: Product) => { setBasket((lines) => { const found = lines.find((line) => line.id === product.id); return found ? lines.map((line) => line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line) : [...lines, { ...product, quantity: 1 }]; }); setToast(`${product.name} added to basket`); };
  const changeQty = (id: string, delta: number) => setBasket((lines) => lines.flatMap((line) => line.id === id ? (line.quantity + delta > 0 ? [{ ...line, quantity: line.quantity + delta }] : []) : [line]));
  const itemCount = basket.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const visible = useMemo(() => products.filter((p) => p.category === category && p.name.toLowerCase().includes(query.toLowerCase())), [category, query]);
  const whatsapp = `https://wa.me/2348025724498?text=${encodeURIComponent(`Hello Cookbox Cafe, I'd like to order ${basket.map((i) => `${i.quantity}x ${i.name}`).join(", ") || "from the menu"}. Estimated subtotal: ${money(subtotal)}.`)}`;

  const goMenu = (next?: Category) => { if (next) setCategory(next); setScreen("menu"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return <div className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={() => setScreen("home")} aria-label="Cookbox Cafe home"><span className="brand-mark">CBX</span><span><strong>Cookbox</strong><small>Cafe</small></span></button>
      <div className="top-actions"><span className="open-status"><i /> Open until 8:30pm</span><button className="icon-button" aria-label="Notifications"><Bell size={19} /></button><button className="avatar-button" aria-label="Account" onClick={() => setScreen("account")}><UserRound size={18} /></button></div>
    </header>

    <main className="page-content">
      {screen === "home" && <>
        <section className="hero-card"><img src={heroImages[hero]} alt="Fresh Cookbox Cafe meal" /><div className="hero-shade" /><div className="hero-copy"><span className="eyebrow"><Sparkles size={14} /> Freshly cooked in Lagos</span><h1>Warm meals,<br /><em>boxed with love.</em></h1><p>Jollof, soups, snacks and more — made fresh for your table.</p><button className="primary-button" onClick={() => goMenu()}>Order now <ArrowRight size={17} /></button></div><div className="hero-dots">{heroImages.map((_, i) => <button key={i} onClick={() => setHero(i)} className={i === hero ? "active" : ""} aria-label={`Slide ${i + 1}`} />)}</div></section>
        <section className="delivery-strip"><div className="strip-icon"><Compass size={19} /></div><div><strong>Delivery across Lagos</strong><span>Akesan · Igando · Isheri & nearby areas</span></div><button onClick={() => setToast("Delivery fee is calculated at checkout")}>Details <ChevronRight size={16} /></button></section>
        <section className="section-block"><div className="section-heading"><div><span className="eyebrow dark">The quick pick</span><h2>What are you craving?</h2></div><button className="text-button" onClick={() => goMenu()}>See full menu <ArrowRight size={15} /></button></div><div className="category-row">{categories.map((c) => <button key={c.name} className={`category-tile ${c.tone}`} onClick={() => goMenu(c.name)}><span>{c.icon}</span><strong>{c.name}</strong><small>Browse picks</small></button>)}</div></section>
        <section className="section-block"><div className="section-heading"><div><span className="eyebrow dark">Customer favourites</span><h2>Popular near you</h2></div><button className="text-button" onClick={() => goMenu()}>View menu <ArrowRight size={15} /></button></div><div className="popular-row">{products.filter((p) => p.featured).map((p) => <ProductCard key={p.id} product={p} onAdd={add} />)}</div></section>
        <section className="trust-panel"><div><span className="eyebrow dark">Made for real life</span><h2>Good food, no guesswork.</h2><p>See portions, prices and ordering details before you commit. Guest checkout stays fast, and WhatsApp is always one tap away.</p></div><div className="trust-stats"><div><strong>4.9</strong><span>Everyday rating</span></div><div><strong>8am–8:30pm</strong><span>Open daily</span></div><div><strong>Lagos</strong><span>Local delivery</span></div></div></section>
      </>}

      {screen === "menu" && <section className="menu-screen"><div className="page-intro"><div><span className="eyebrow dark">Cookbox menu</span><h1>Pick your comfort food.</h1><p>Tap a category to swap the list in place — no endless scrolling.</p></div><button className="basket-inline" onClick={() => setShowBasket(true)}><ShoppingBag size={17} /> Basket {itemCount > 0 && <b>{itemCount}</b>}</button></div><label className="search-box"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jollof, soup, snacks..." /><kbd>/</kbd></label><div className="category-tabs">{categories.map((c) => <button className={category === c.name ? "selected" : ""} onClick={() => setCategory(c.name)} key={c.name}>{c.icon} {c.name}</button>)}</div><div className="menu-toolbar"><span>{visible.length} items in {category}</span><span><Clock3 size={14} /> Freshly prepared daily</span></div><div className="product-grid">{visible.map((p) => <ProductCard key={p.id} product={p} onAdd={add} />)}</div></section>}
      {screen === "orders" && <section className="empty-screen"><div className="empty-icon"><ShoppingBag size={28} /></div><span className="eyebrow dark">Your orders</span><h1>Nothing here yet.</h1><p>Your order history and live order updates will show up here after your first Cookbox order.</p><button className="primary-button" onClick={() => goMenu()}>Start an order <ArrowRight size={17} /></button></section>}
      {screen === "account" && <section className="account-screen"><div className="account-head"><div className="large-avatar"><UserRound size={28} /></div><div><span className="eyebrow dark">Cookbox account</span><h1>Order your way.</h1><p>Guest checkout is always welcome. Sign in later to save favourites and addresses.</p></div></div><div className="account-list"><button><Heart size={18} /> Favourites <ChevronRight size={17} /></button><button><Compass size={18} /> Saved delivery areas <ChevronRight size={17} /></button><button><Bell size={18} /> Notification preferences <ChevronRight size={17} /></button><a href="https://wa.me/2348025724498" target="_blank" rel="noreferrer"><Utensils size={18} /> Chat with Cookbox on WhatsApp <ChevronRight size={17} /></a></div></section>}
    </main>

    {itemCount > 0 && <button className="floating-basket" onClick={() => setShowBasket(true)}><span><ShoppingBag size={18} /> Your basket</span><b>{itemCount} · {money(subtotal)}</b></button>}
    <nav className="bottom-nav"><NavItem active={screen === "home"} icon={<HomeIcon size={19} />} label="Home" onClick={() => setScreen("home")} /><NavItem active={screen === "menu"} icon={<Utensils size={19} />} label="Menu" onClick={() => setScreen("menu")} /><NavItem active={screen === "orders"} icon={<ShoppingBag size={19} />} label="Orders" onClick={() => setScreen("orders")} /><NavItem active={screen === "account"} icon={<UserRound size={19} />} label="Account" onClick={() => setScreen("account")} /></nav>

    {showBasket && <div className="sheet-backdrop" onClick={() => setShowBasket(false)}><aside className="basket-sheet" onClick={(e) => e.stopPropagation()}><div className="sheet-handle" /><div className="sheet-heading"><div><span className="eyebrow dark">Ready when you are</span><h2>Your basket</h2></div><button className="close-button" onClick={() => setShowBasket(false)} aria-label="Close basket"><X size={19} /></button></div>{basket.length === 0 ? <p className="muted">Your basket is waiting for something delicious.</p> : <div className="basket-lines">{basket.map((line) => <div className="basket-line" key={line.id}><img src={line.image ? img(line.image) : heroImages[0]} alt="" /><div><strong>{line.name}</strong><span>{money(line.price)} · {line.description}</span><div className="qty"><button onClick={() => changeQty(line.id, -1)}><Minus size={13} /></button><b>{line.quantity}</b><button onClick={() => changeQty(line.id, 1)}><Plus size={13} /></button></div></div><strong>{money(line.price * line.quantity)}</strong></div>)}</div>}<div className="basket-total"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><p className="delivery-note">Delivery fee is calculated after you select your area. Payment is completed securely through the final ordering step.</p><a className="primary-button wide" href={whatsapp} target="_blank" rel="noreferrer" onClick={() => setShowBasket(false)}>Continue on WhatsApp <ArrowRight size={17} /></a></aside></div>}
    {toast && <div className="toast" role="status">{toast} <button onClick={() => setToast("")}>Undo</button></div>}
  </div>;
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) { return <article className="product-card"><div className="product-image-wrap">{product.image ? <img src={img(product.image)} alt={product.name} loading="lazy" /> : <div className="image-fallback">🍽️</div>}<button className="add-button" onClick={() => onAdd(product)} aria-label={`Add ${product.name}`}><Plus size={18} /></button></div><div className="product-meta"><div><h3>{product.name}</h3><p>{product.description}</p></div><strong>{money(product.price)}</strong></div></article>; }
function NavItem({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) { return <button className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>{icon}<span>{label}</span></button>; }
