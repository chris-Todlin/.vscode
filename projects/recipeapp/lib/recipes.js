const recipes = [
    {
        title: "Pasta Carbonara",
        description:
            "Delicious pasta with eggs, cheese, pancetta, and black pepper.",
        requirements: [
            "200g spaghetti",
            "100g pancetta",
            "2 large eggs",
            "1/2 cup grated Parmesan cheese",
            "2 cloves garlic",
            "Salt",
            "Black pepper"
        ],
        procedure: [
            "Boil salted water and cook spaghetti until al dente.",
            "Cook pancetta with garlic in a pan until crispy.",
            "Whisk eggs and Parmesan in a bowl.",
            "Drain pasta and combine with pancetta (remove from heat).",
            "Quickly mix in egg mixture.",
            "Season with black pepper and serve immediately."
        ]
    },
    {
        title: "Margherita Pizza",
        description:
            "Classic Italian pizza topped with tomato sauce, fresh mozzarella, and basil.",
        requirements: [
            "1 pizza dough base",
            "1/2 cup tomato sauce",
            "200g fresh mozzarella",
            "Fresh basil leaves",
            "2 tbsp olive oil",
            "Salt"
        ],
        procedure: [
            "Preheat oven to 220°C (430°F).",
            "Spread tomato sauce over dough.",
            "Add sliced mozzarella evenly.",
            "Drizzle olive oil and add salt.",
            "Bake for 12–15 minutes.",
            "Garnish with fresh basil before serving."
        ]
    },
    {
        title: "Chicken Tikka Masala",
        description:
            "Grilled chunks of chicken in a creamy spiced tomato sauce.",
        requirements: [
            "500g chicken breast",
            "1 cup yogurt",
            "2 tbsp tikka masala paste",
            "1 cup tomato puree",
            "1/2 cup heavy cream",
            "1 onion",
            "2 cloves garlic",
            "1 tsp ginger"
        ],
        procedure: [
            "Marinate chicken in yogurt and spices for 1 hour.",
            "Grill or pan-fry chicken until cooked.",
            "Sauté onion, garlic, and ginger.",
            "Add tomato puree and simmer.",
            "Stir in cream and cooked chicken.",
            "Simmer 10 minutes and serve with rice."
        ]
    },
    {
        title: "Beef Tacos",
        description:
            "Crispy taco shells filled with seasoned beef, lettuce, cheese, and salsa.",
        requirements: [
            "8 taco shells",
            "500g ground beef",
            "1 packet taco seasoning",
            "1 cup shredded lettuce",
            "1 cup shredded cheese",
            "1/2 cup salsa"
        ],
        procedure: [
            "Cook ground beef until browned.",
            "Add taco seasoning and simmer.",
            "Warm taco shells in oven.",
            "Fill shells with beef.",
            "Top with lettuce, cheese, and salsa."
        ]
    },
    {
        title: "Caesar Salad",
        description:
            "Fresh romaine lettuce tossed with Caesar dressing, croutons, and Parmesan cheese.",
        requirements: [
            "1 head romaine lettuce",
            "1/2 cup Caesar dressing",
            "1/2 cup croutons",
            "1/4 cup grated Parmesan",
            "1 chicken breast (optional)"
        ],
        procedure: [
            "Wash and chop romaine lettuce.",
            "Grill and slice chicken (if using).",
            "Toss lettuce with dressing.",
            "Add croutons and Parmesan.",
            "Top with sliced chicken and serve."
        ]
    },
    {
        title: "Sushi Rolls",
        description:
            "Vinegared rice rolled with fresh fish, vegetables, and seaweed.",
        requirements: [
            "2 cups sushi rice",
            "4 nori sheets",
            "200g fresh salmon or tuna",
            "1 cucumber",
            "1 avocado",
            "Soy sauce"
        ],
        procedure: [
            "Cook sushi rice and season with vinegar.",
            "Place nori on bamboo mat.",
            "Spread rice evenly over nori.",
            "Add fish and sliced vegetables.",
            "Roll tightly and slice into pieces.",
            "Serve with soy sauce."
        ]
    },
    {
        title: "Chocolate Brownies",
        description:
            "Rich and fudgy chocolate brownies with a crackly top.",
        requirements: [
            "1/2 cup butter",
            "1 cup sugar",
            "2 eggs",
            "1/3 cup cocoa powder",
            "1/2 cup flour",
            "1 tsp vanilla extract"
        ],
        procedure: [
            "Preheat oven to 180°C (350°F).",
            "Melt butter and mix with sugar.",
            "Add eggs and vanilla.",
            "Stir in cocoa powder and flour.",
            "Pour into greased baking pan.",
            "Bake for 20–25 minutes and cool before slicing."
        ]
    },
    {
        title: "Tom Yum Soup",
        description:
            "Spicy and sour Thai soup with shrimp, lemongrass, and lime.",
        requirements: [
            "500ml chicken broth",
            "200g shrimp",
            "2 stalks lemongrass",
            "2 kaffir lime leaves",
            "1 chili",
            "1 tbsp fish sauce",
            "1 lime (juice)",
            "Mushrooms"
        ],
        procedure: [
            "Bring broth to a boil.",
            "Add lemongrass and lime leaves.",
            "Add mushrooms and chili.",
            "Add shrimp and cook until pink.",
            "Season with fish sauce and lime juice.",
            "Serve hot."
        ]
    },
];

/* Ecport the module */
module.exports = recipes;