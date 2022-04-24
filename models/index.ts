export type Item = {
    restricted: boolean;
    item_type: number;
    name: string;
    price: number;
    rarity: number;
    notes: string;
    unique: boolean;
};

export type ArmorItem = {
    itemProps: Item;
    key: number;
    defense: number;
    soak: number;
    encumbrance: number;
    hardpoints: number;
}
