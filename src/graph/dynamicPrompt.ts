import {
  BASE_AGENT_PROMPT,
  TECH_NAMESPACE_PROMPT,
  POLICY_NAMESPACE_PROMPT,
  KB_NAMESPACE_PROMPT,
  BUSINESS_NAMESPACE_PROMPT,
  LITERATURE_NAMESPACE_PROMPT,
  MEDICAL_NAMESPACE_PROMPT,
  ACADEMIC_NAMESPACE_PROMPT
} from "./systemPrompt";
import { NAMESPACE } from "@/lib/fileupload";


export function dynamicPrompt(ns:NAMESPACE):string{
  const namespace = ns;
  switch (namespace) {
    case "technical":
    case "engineering":
    case "architectural":
      return BASE_AGENT_PROMPT + TECH_NAMESPACE_PROMPT;
    case "compliance":
    case "legal":
    case "internal_policies":
    case "refund_policy":
      return BASE_AGENT_PROMPT + POLICY_NAMESPACE_PROMPT;
    case "product_manual":
      return BASE_AGENT_PROMPT + KB_NAMESPACE_PROMPT;
    case "report":
    case "proposal":
      return BASE_AGENT_PROMPT + BUSINESS_NAMESPACE_PROMPT;
    case "essay":
    case "philosophy":
    case "story":
      return BASE_AGENT_PROMPT + LITERATURE_NAMESPACE_PROMPT;
    case "medical_doc":
      return BASE_AGENT_PROMPT + MEDICAL_NAMESPACE_PROMPT;
    case "academic_paper":
      return BASE_AGENT_PROMPT + ACADEMIC_NAMESPACE_PROMPT;
  }
}