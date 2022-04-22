export type Item = {
    restricted: boolean;
    name: string;
    price: number;
    rarity: number;
    notes: string;
};

export type ArmorItem = {
    itemProps: Item;
    key: number;
    defense: number;
    soak: number;
    encumbrance: number;
    hardpoints: number;
}
