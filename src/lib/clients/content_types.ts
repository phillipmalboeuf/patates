import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeGammeFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    sousTitre?: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.RichText;
    couleur?: EntryFieldTypes.Symbol<"Dark" | "Light" | "Normal">;
    media?: EntryFieldTypes.AssetLink;
    produits?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProduitSkeleton | TypeSeparateurSkeleton | TypeTextSkeleton>>;
}

export type TypeGammeSkeleton = EntrySkeletonType<TypeGammeFields, "gamme">;
export type TypeGamme<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeGammeSkeleton, Modifiers, Locales>;

export function isTypeGamme<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeGamme<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'gamme'
}

export interface TypeHeroFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    media?: EntryFieldTypes.AssetLink;
    sousTitre?: EntryFieldTypes.Symbol;
    corps?: EntryFieldTypes.RichText;
    couleur?: EntryFieldTypes.Symbol<"Dark" | "Light" | "Normal">;
}

export type TypeHeroSkeleton = EntrySkeletonType<TypeHeroFields, "hero">;
export type TypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeHeroSkeleton, Modifiers, Locales>;

export function isTypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeHero<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'hero'
}

export interface TypeLienDeNavigationFields {
    titre?: EntryFieldTypes.Symbol;
    destination?: EntryFieldTypes.Symbol;
    externe?: EntryFieldTypes.Boolean;
}

export type TypeLienDeNavigationSkeleton = EntrySkeletonType<TypeLienDeNavigationFields, "lienDeNavigation">;
export type TypeLienDeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeLienDeNavigationSkeleton, Modifiers, Locales>;

export function isTypeLienDeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeLienDeNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'lienDeNavigation'
}

export interface TypeNavigationFields {
    id?: EntryFieldTypes.Symbol;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;

export function isTypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navigation'
}

export interface TypePageFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    media?: EntryFieldTypes.AssetLink;
    contenu?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeGammeSkeleton | TypeHeroSkeleton | TypeProduitSkeleton | TypeSeparateurSkeleton | TypeTextSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'page'
}

export interface TypeProduitFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    sousTitre?: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.RichText;
    media?: EntryFieldTypes.AssetLink;
    illustration?: EntryFieldTypes.AssetLink;
    gauche?: EntryFieldTypes.Text;
    droite?: EntryFieldTypes.Text;
}

export type TypeProduitSkeleton = EntrySkeletonType<TypeProduitFields, "produit">;
export type TypeProduit<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeProduitSkeleton, Modifiers, Locales>;

export function isTypeProduit<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeProduit<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'produit'
}

export interface TypeSeparateurFields {
    id?: EntryFieldTypes.Symbol;
    media?: EntryFieldTypes.AssetLink;
    slides?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeSeparateurSkeleton = EntrySkeletonType<TypeSeparateurFields, "separateur">;
export type TypeSeparateur<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeSeparateurSkeleton, Modifiers, Locales>;

export function isTypeSeparateur<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeSeparateur<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'separateur'
}

export interface TypeTextFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    sousTitre?: EntryFieldTypes.Symbol;
    badge?: EntryFieldTypes.Symbol;
    corps?: EntryFieldTypes.RichText;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
    media?: EntryFieldTypes.AssetLink;
    fleure?: EntryFieldTypes.Boolean;
    dark?: EntryFieldTypes.Boolean;
    flip?: EntryFieldTypes.Boolean;
    couleur?: EntryFieldTypes.Symbol<"Dark" | "Light" | "Normal">;
}

export type TypeTextSkeleton = EntrySkeletonType<TypeTextFields, "text">;
export type TypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTextSkeleton, Modifiers, Locales>;

export function isTypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeText<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'text'
}
