import { ListStrategy } from "../strategies/ListStrategy";
import { StyleStrategy } from "../strategies/StyleStrategy";

export default function useEnrichment(strategy) {
  switch (strategy) {
    case "list":
      return ListStrategy;
    default:
      return StyleStrategy;
  }
}
