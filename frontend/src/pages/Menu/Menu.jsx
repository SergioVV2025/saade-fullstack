import MenuSection from "../../components/MenuSection/MenuSection";

function Menu() {
  return (
    <main className="menu">
      <header className="menu__header">
        <p className="menu__eyebrow">Eat & drink</p>
        <h1 className="menu__title">Menu</h1>
        <p className="menu__description">
          Good food, cold drinks and plenty to share.
        </p>
      </header>

      <div className="menu__sections">
        <MenuSection title="Food">
          <p>Seasonal plates</p>
          <p>Things to share</p>
          <p>Something sweet</p>
        </MenuSection>

        <MenuSection title="Drinks">
          <p>Cocktails</p>
          <p>Wine</p>
          <p>Beer</p>
          <p>Zero proof</p>
        </MenuSection>

        <MenuSection title="Late night">
          <p>Snacks</p>
          <p>Drinks</p>
          <p>Good decisions optional</p>
        </MenuSection>
      </div>
    </main>
  );
}

export default Menu;
