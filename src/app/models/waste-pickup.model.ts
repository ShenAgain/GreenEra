export interface WastePickup {
  date: string;
  time: string;
  wasteType: string;
  address: string;
  userId?: string;    // Optional MongoDB reference to user
  communityName?: string;  // Optional community reference
}