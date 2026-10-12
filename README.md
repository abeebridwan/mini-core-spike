# Demo store for Nexus Core

A public, neutral website fixture for testing workflow discovery, WebMCP generation and real-browser verification in the Nexus desktop app.

The website is in `demo-store/`. It contains **six ordinary read-only workflows** and **no preinstalled WebMCP capabilities or adapter scripts**. Each workflow has a visible form/action and an exported implementation in `demo-store/src/catalog.ts`, so Nexus can discover existing behavior rather than invent a workflow.

## Get the demo website

You need Git and Node.js/npm. Node.js 22.23 was used for the local build verification.

```sh
git clone https://github.com/abeebridwan/mini-core-spike.git
cd mini-core-spike/demo-store
npm ci
git log -1 --oneline
git status
```

After installing dependencies, `git status` should report a clean working tree. The repository root contains the Git history; `demo-store/` is the website folder to select in Nexus.

## Available workflows

| Workflow | Exported function | Example and expected result |
| --- | --- | --- |
| Search products | `searchProducts(query)` | `black shoes` → Black Running Shoes and Black Trail Shoes |
| Filter by color | `filterProductsByColor(color)` | `white` → White Running Shoes |
| Filter by category | `filterProductsByCategory(category)` | `trail` → Black Trail Shoes |
| Find products within a budget | `findProductsWithinBudget(maxPrice)` | `80` → Blue Walking Shoes, $70 |
| Sort by price | `sortProductsByPrice(order)` | `asc` → prices $70, $89, $95, $109 |
| View product details | `getProductDetails(productId)` | `3` → Black Trail Shoes, black, trail, $109 |

These are existing website workflows, not already registered agent tools. Nexus supports selecting up to five workflows in one generated batch.

<a id="testing-mini-core"></a>

## Test with the Nexus desktop app

1. Download and install Nexus: https://github.com/abeebridwan/improvisus-nexus/releases/tag/v0.1.1.
2. Configure your OpenAI/OpenRouter key and available model in **Settings**.
3. Choose **Core → Local project**, then **Browse** to this checkout's `demo-store` folder.
4. Click **Discover workflows** and select one to five discovered workflows.
5. Generate the adapters and review the complete diff and proposed tests.
6. Approve verification. Nexus creates a separate branch, builds/runs the website and invokes the generated tools in Chromium.
7. Inspect the test results and returned Git branch/commit. Passing generation/browser checks are required before Nexus creates its integration commit.

Keep this checkout clean before discovery. If you previously approved generated capabilities, use a fresh checkout for another neutral baseline. Clear resets Nexus's displayed session; it does not remove installed files or Git commits.

Full desktop installation and testing guide: https://gist.github.com/abeebridwan/55367c9eea5226ddcb67394a21a9874c.

## Open the website normally

From `demo-store/`:

```sh
npm run dev
```

Open the local URL Vite prints. The six visible actions work without an AI provider or Nexus. To check the website build and lint:

```sh
npm run build
npm run lint
```

The hosted version is https://prod-main-web-8e9af6-00m6pcgptg8.compute.instacloud-edge.com/. It was verified with six working ordinary workflows and zero native WebMCP tools after the neutral deployment. URL-mode testing can generate and publish an adapter, but the website owner must separately install the delivered script. Agent execution requires registered tools and a separately connected WebMCP-enabled Chrome session; this neutral fixture does not expose tools before an integration is installed.
