import { useState } from 'react';
import Menu from './menu';
import Tabs from './tabs';

export default function Restaurants({ restaurants }) {
  const [activeId, setActiveId] = useState(restaurants[0].id);

  const tabs = restaurants.map(({ id, name }) => ({ id, label: name }));

  const activeRestaurant = restaurants.find(
    (restaurant) => restaurant.id === activeId
  );

  return (
    <div>
      <Tabs tabs={tabs} onChange={setActiveId} />
      <Menu menu={activeRestaurant.menu} />
    </div>
  );
}
