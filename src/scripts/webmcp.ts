/**
 * WebMCP (Model Context Protocol for Web) Integration
 * Exposes Sportuś tools and context to AI agents and browser-integrated assistants.
 * Conforms to https://webmachinelearning.github.io/webmcp/ and SEP-1649.
 */

interface WebMCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties?: Record<string, unknown>;
    required?: string[];
  };
  execute: (params?: Record<string, unknown>) => Promise<unknown> | unknown;
}

const tools: WebMCPTool[] = [
  {
    name: "get_sports_classes",
    description: "Pobierz listę programów zajęć sportowych dla dzieci oferowanych przez Sportuś w Gdańsku.",
    inputSchema: {
      type: "object",
      properties: {
        age: {
          type: "number",
          description: "Wiek dziecka w latach (opcjonalnie do filtrowania)"
        }
      }
    },
    execute: async ({ age }: { age?: number } = {}) => {
      return {
        brand: "Sportuś",
        city: "Gdańsk",
        programs: [
          {
            name: "Zajęcia ogólnorozwojowe z elementami gimnastyki",
            targetAges: "3-6 lat",
            description: "Kształtowanie prawidłowej postawy, koordynacji ruchowej oraz zwinności przez zabawę."
          },
          {
            name: "Akademia Małego Sportowca",
            targetAges: "7-12 lat",
            description: "Nauka podstaw gier zespołowych, sprawność motoryczna i współpraca w grupie."
          }
        ],
        filterApplied: age ? `Wiek: ${age}` : "Wszystkie"
      };
    }
  },
  {
    name: "get_schedule",
    description: "Pobierz harmonogram i lokalizacje zajęć Sportuś w Gdańsku.",
    inputSchema: {
      type: "object",
      properties: {
        district: {
          type: "string",
          description: "Dzielnica Gdańska (opcjonalnie)"
        }
      }
    },
    execute: async () => {
      return {
        scheduleUrl: "https://sportus.com.pl/plan-zajec",
        info: "Aktualny grafik zajęć dostępny na stronie /plan-zajec"
      };
    }
  },
  {
    name: "contact_inquiry",
    description: "Informacje kontaktowe i formularz zapisu na zajęcia próbne w Sportuś.",
    inputSchema: {
      type: "object",
      properties: {
        parentName: { type: "string" },
        phone: { type: "string" },
        email: { type: "string" },
        childAge: { type: "number" }
      }
    },
    execute: async (params = {}) => {
      return {
        message: "Aby zapisać dziecko na lekcję próbną, skorzystaj z formularza na stronie głównej lub napisz na kontakt@sportus.com.pl.",
        contactEmail: "kontakt@sportus.com.pl",
        receivedParams: params
      };
    }
  }
];

export function initWebMCP() {
  if (typeof window === "undefined") return;

  const nav = navigator as unknown as {
    modelContext?: {
      provideContext?: (options: { tools?: WebMCPTool[]; signal?: AbortSignal }) => void;
      registerTool?: (tool: WebMCPTool, options?: { signal?: AbortSignal }) => void;
    };
  };

  if (!nav.modelContext) {
    return;
  }

  const controller = new AbortController();

  try {
    if (typeof nav.modelContext.provideContext === "function") {
      nav.modelContext.provideContext({
        tools,
        signal: controller.signal
      });
    }

    if (typeof nav.modelContext.registerTool === "function") {
      for (const tool of tools) {
        nav.modelContext.registerTool(tool, { signal: controller.signal });
      }
    }
  } catch (error) {
    console.debug("WebMCP registration notice:", error);
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWebMCP);
  } else {
    initWebMCP();
  }
}
