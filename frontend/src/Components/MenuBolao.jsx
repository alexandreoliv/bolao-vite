import { Menu } from "antd";

const generateMenuItems = (startYear, endYear, setComponent) => {
  const menuItems = [];
  const opcoes = [
    { label: "Classificação", page: "classificacao" },
    { label: "Apostas", page: "apostas" },
    { label: "Distância", page: "distancia" },
  ];
  let keyCounter = 1;

  for (let year = endYear; year >= startYear; year--) {
    const yearMenu = {
      key: `s${year}`,
      label: `${year}`,
      children: [],
    };

    // Generate Série A menu items
    const seriesA = opcoes.map((item) => ({
      key: `s${year}-A-${keyCounter++}`,
      label: item.label,
      onClick: () => setComponent({ ano: year, serie: "A", page: item.page }),
    }));

    yearMenu.children.push({
      type: "group",
      label: "Série A",
      children: seriesA,
    });

    // Generate Série B menu items (skip for 2020)
    if (year !== 2020) {
      const seriesB = opcoes.map((item) => ({
        key: `s${year}-B-${keyCounter++}`,
        label: item.label,
        onClick: () => setComponent({ ano: year, serie: "B", page: item.page }),
      }));

      yearMenu.children.push({
        type: "group",
        label: "Série B",
        children: seriesB,
      });
    }

    menuItems.push(yearMenu);
  }

  // menuItems.push({
  //   key: `s-ranking`,
  //   label: "Ranking",
  //   onClick: () => setComponent((prev) => ({ ...prev, page: "ranking" })),
  // });

  menuItems.push({
    key: `s-regras`,
    label: "Regras",
    onClick: () => setComponent((prev) => ({ ...prev, page: "regras" })),
  });

  return menuItems;
};

const MenuBolao = ({ setComponent, startYear = 2020, endYear = 2025 }) => {
  const menuItems = generateMenuItems(startYear, endYear, setComponent);

  return <Menu theme="light" mode="inline" defaultSelectedKeys={[`s${endYear}`]} items={menuItems} />;
};

export default MenuBolao;
