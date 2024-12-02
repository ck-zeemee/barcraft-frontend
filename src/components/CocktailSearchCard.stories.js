import React from 'react';
import CocktailSearchCard from './CocktailSearchCard';

export default {
  title: 'Components/Cocktail Sarch Card', // Organize stories in Storybook
  component: CocktailSearchCard,
};

const Template = (args) => <CocktailSearchCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    imgSrc: "https://www.thecocktaildb.com/images/media/drink/fgq2bl1492975771.jpg",
    name: "Smashed Watermelon Margarita",
    category: "Cocktail",
};
