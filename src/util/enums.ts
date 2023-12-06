export enum UserRoles {
  Admin = "Admin",
  Vendor = "Vendor",
}

export type AllowedRole = UserRoles.Admin | UserRoles.Vendor;

export enum MenuItems {
  Dashboard = "Dashboard",
  PriceAnalytic = "Price Analytic",
  ManageMarkets = "Manage Markets",
  ManageEmployees = "Manage Employees",
  Prices = "Prices",
  Products = "Products",
  YourProducts = "Your Products",
  EmailConfirmation = "Email confirmation",
  Settings = "Settings",
}

export enum MeasureUnits {
  PIECE = "komad",
  KILOGRAM = "kilogram",
  BAG = "vrecica",
}