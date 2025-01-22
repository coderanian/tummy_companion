import { ReactComponent as RollSmall } from "../../assets/images/icons/form/toilet_paper_small.svg"
import { ReactComponent as RollMid } from "../../assets/images/icons/form/toilet_paper_mid.svg"
import { ReactComponent as RollBig } from "../../assets/images/icons/form/toilet_paper_big.svg"

export const INTAKE = {
    food: [
        {value: "dairy", label: "Dairy Products"},
        {value: "gluten", label: "Gluten-containing Foods"},
        {value: "vegetables", label: "Vegetables"},
        {value: "fruits", label: "Fruits"},
        {value: "meat", label: "Meat"},
        {value: "fish", label: "Fish"},
        {value: "legumes", label: "Legumes"},
        {value: "nuts", label: "Nuts and Seeds"},
        {value: "processed", label: "Processed Foods"},
    ],
    drink: [
        {value: "water", label: "Water"},
        {value: "coffee", label: "Coffee"},
        {value: "tea", label: "Tea"},
        {value: "alcohol", label: "Alcoholic Beverages"},
        {value: "soda", label: "Carbonated Drinks"},
        {value: "juice", label: "Fruit Juices"},
        {value: "milk", label: "Milk"},
    ]
}

export const SYMPTOMS = {
    wellbeing: {
        formValues: [
            {icon: "😭", label: "Sad"},
            {icon: "😢", label: "Upset"},
            {icon: "😐", label: "Neutral"},
            {icon: "🙂", label: "Happy"},
            {icon: "😄", label: "Excited"},
        ],
        description: "Emotional stress can often worsen IBS symptoms, such as abdominal pain, bloating, " +
            "or changes in bowel habits. Maintaining emotional balance through stress management, " +
            "relaxation techniques, or mindfulness can play a key role in reducing symptoms and improving " +
            "overall quality of life."
    },
    sleepQuality: {
        formValues: [
            {icon: "😵", label: "Very tired"},
            {icon: "😴", label: "Tired"},
            {icon: "🥱", label: "Slightly tired"},
            {icon: "😐", label: "Neutral"},
            {icon: "😎", label: "Refreshed"},
        ],
        description: "Poor sleep can worsen symptoms like pain, bloating, and irregular bowel movements. " +
            "The gut and brain communicate through the gut-brain axis, and disrupted sleep affects this connection, " +
            "increasing gut sensitivity and stress hormone levels. " +
            "Sleep also helps regulate digestion and reduce inflammation, both crucial for managing IBS."
    },
    sleepDuration: {
        formValues: [
            {icon: "😵", label: "2 or less"},
            {icon: "😵", label: "3"},
            {icon: "😴", label: "4"},
            {icon: "😴", label: "5"},
            {icon: "🥱", label: "6"},
            {icon: "🥱", label: "7"},
            {icon: "😎", label: "8"},
            {icon: "😎", label: "9 or more"},
        ],
        description: "Poor sleep can worsen symptoms like pain, bloating, and irregular bowel movements. " +
            "The gut and brain communicate through the gut-brain axis, and disrupted sleep affects this connection, " +
            "increasing gut sensitivity and stress hormone levels. " +
            "Sleep also helps regulate digestion and reduce inflammation, both crucial for managing IBS."
    },
    stoolConsistency: {
        formValues: [
            {icon: <RollSmall style={{ maxWidth: "30px", maxHeight: "30px" }}/>, label: "Hard"},
            {icon: <RollMid style={{ maxWidth: "40px", maxHeight: "40px" }}/>, label: "Normal"},
            {icon: <RollBig style={{ maxWidth: "40px", maxHeight: "40px" }}/>, label: "Liquid"},
        ],
        description: "tbc."
    },
    stoolQuantity: {
        formValues: [
            {icon: <RollSmall style={{ maxWidth: "30px", maxHeight: "30px" }}/>, label: "Small"},
            {icon: <RollMid style={{ maxWidth: "40px", maxHeight: "40px" }}/>, label: "Regular"},
            {icon: <RollBig style={{ maxWidth: "40px", maxHeight: "40px" }}/>, label: "Large"},
        ],
        description: "tbc."
    },
}
