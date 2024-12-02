import React from 'react';
import CocktailDetailsCard from './CocktailDetailsCard';

export default {
  title: 'Components/Cocktail Details Card', // Organize stories in Storybook
  component: CocktailDetailsCard,
};

const Template = (args) => <CocktailDetailsCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    id: 18,
    name: "Van Vleet",
    category: "Ordinary Drink",
    container: "Old-fashioned glass",
    instructions: "Shake all ingredients with ice, strain into an old-fashioned glass over ice cubes, and serve.",
    image: "https://www.thecocktaildb.com/images/media/drink/fgq2bl1492975771.jpg",
    ingredients: [
        {
            name: "Light rum",
            measurement: "3 oz"
        },
        {
            name: "Maple syrup",
            measurement: "1 oz"
        },
        {
            name: "Lemon juice",
            measurement: "1 oz"
        }
    ]
};
