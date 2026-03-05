export type Societe = 'LUNAS' | 'CHA';

export type ActiviteKey =
  | 'Broderies 69%'
  | 'Applications /Serigraphie 47%'
  | 'Patch / Broderie Mecanique 70%'
  | 'Manipulation textile 83%';

export interface HeaderData {
  client: string;
  societe: Societe;
  collection: string;
  projet: string;
  date: string; // YYYY-MM-DD
}

export interface FraisEngagesData {
  rechercheDevHeures: number;       // D9
  creationDessinHeures: number;     // D10
  programmePrestaCoût: number;      // B13
  programmePrestaQty: number;       // D13
  cadreSerigraphieCoût: number;     // B14
  cadreSerigraphieQty: number;      // D14
  piquageHeures: number;            // D15
  etudeIndustrialisationHeures: number; // D18
  testPrslCoût: number;             // B19
  testPrslQty: number;              // D19
  tempsGradationCoût: number;       // B20 (default 35)
  tempsGradationHeures: number;     // D20
}

export interface CoutsMatieresData {
  coutMatieresGalon: number;        // E26
  aleaPercent: number;              // D28 (default 0.05)
  aleaPercentProdDeloc: number;     // D28 for Prod déloc (default 0.10)
}

export interface FabricationCollectionData {
  tempsCollection: number;           // D34 (rate 30)
  tempsPresse: number;               // D35 (rate 30, no formula)
  coutAtelierManipTextile: number;   // D36 (rate 48, no formula)
  coutAtelierBroderies: number;      // D37 (rate 58)
  sousTraitanceMaroc: number;        // D38 (rate 7)
  sousTraitanceMada: number;         // D39 (rate 7.5)
}

export interface FabricationPresseData {
  coutAtelierPresse: number;         // D33 (rate 48)
}

export interface FabricationProdParisData {
  coutAtelierProd200m: number;       // D33 (rate 48)
}

export interface FabricationProdDelocData {
  sousTraitanceMaroc: number;        // D32 (rate 7)
  sousTraitanceMada: number;         // D33 (rate 7.5)
}

export interface MargesCollectionData {
  pvCollection: number;  // D55, default 2.5
  pvFraisDessins: number; // D56, default 3
  pvFraisTechnique: number; // D57, default 2
}

export interface MargesPresseData {
  pvPresse: number; // D51, default 1.75
}

export interface MargesProdParisData {
  pvProdParis: number; // D52, default 1.3
}

export interface MargesProdDelocData {
  pv200_500: number;    // D54, default 2.5
  pv501_2000: number;   // D55, default 1.9
  pv2001_3500: number;  // D56, default 1.75
  pvAbove3500: number;  // D57, default 1.55
}

export interface CommentairesData {
  collection: string;
  presse: string;
  prodParis: string;
  prodDeloc: string;
}

export interface FormData {
  header: HeaderData;
  fraisEngages: FraisEngagesData;
  coutsMatieres: CoutsMatieresData;
  fabricationCollection: FabricationCollectionData;
  fabricationPresse: FabricationPresseData;
  fabricationProdParis: FabricationProdParisData;
  fabricationProdDeloc: FabricationProdDelocData;
  activite: ActiviteKey;
  margesCollection: MargesCollectionData;
  margesPresse: MargesPresseData;
  margesProdParis: MargesProdParisData;
  margesProdDeloc: MargesProdDelocData;
  commentaires: CommentairesData;
}
