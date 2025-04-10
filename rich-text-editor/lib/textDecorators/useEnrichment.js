import { ListStrategy } from "../strategies/ListStrategy";
import { StyleStrategy } from "../strategies/StyleStrategy";

/**
 * 
 * @param {"list"=} strategy - The name of the strategy to use for enrichment
 * @returns 
 */
export default function useEnrichment(strategy) {
  switch (strategy) {
    case "list":
      return ListStrategy;
    default:
      return StyleStrategy;
  }
}
