# Vercel Docs

Reference documentation for Vercel-related configuration and workflows.

---

### Install AI SDK and development dependencies using bun

Source: https://vercel.com/docs/ai-gateway/getting-started

This command installs essential packages for developing with the AI Gateway using bun. It includes the AI SDK (`ai`), `dotenv` for environment variable management, `tsx` for running TypeScript files, the `typescript` compiler, and `@types/node` for Node.js type definitions.

```bash
bun add ai dotenv @types/node tsx typescript
```

--------------------------------

### Install AI SDK and development dependencies using pnpm

Source: https://vercel.com/docs/ai-gateway/getting-started

This command installs essential packages for developing with the AI Gateway using pnpm. It includes the AI SDK (`ai`), `dotenv` for environment variable management, `tsx` for running TypeScript files, the `typescript` compiler, and `@types/node` for Node.js type definitions.

```bash
pnpm add ai dotenv @types/node tsx typescript
```

--------------------------------

### Run Clawd Bot Onboarding Wizard

Source: https://vercel.com/docs/ai-gateway/chat-platforms/clawd-bot

Start the interactive setup wizard for Clawd Bot with daemon installation. This command initiates the configuration process for connecting to Vercel AI Gateway.

```bash
clawdbot onboard --install-daemon
```

--------------------------------

### Install AI SDK and development dependencies using npm

Source: https://vercel.com/docs/ai-gateway/getting-started

This command installs essential packages for developing with the AI Gateway using npm. It includes the AI SDK (`ai`), `dotenv` for environment variable management, `tsx` for running TypeScript files, the `typescript` compiler, and `@types/node` for Node.js type definitions.

```bash
npm install ai dotenv @types/node tsx typescript
```

--------------------------------

### Initialize Vercel Projects from Examples using Vercel CLI

Source: https://vercel.com/docs/cli

Initialize new Vercel projects locally using examples from the Vercel examples repository. You can start a new project in the current directory or specify a project name.

```bash
vercel init
vercel init [project-name]
```

--------------------------------

### Add Integration Resource with vercel integration add

Source: https://vercel.com/docs/cli/integration

Initializes the setup wizard for creating a new integration resource. This command is equivalent to vercel install [integration-name] and will open the browser to start the installation flow if the integration hasn't been installed or terms accepted yet.

```bash
vercel integration add [integration-name]
```

--------------------------------

### GET [INTEGRATION_CALLBACK_URL] (Deploy Button Flow)

Source: https://vercel.com/docs/integrations/create-integration/submit-integration

This section outlines the query parameters your integration's callback URL will receive when an installation is completed via a Vercel Deploy Button. After installation, the user will complete the setup on your side, and you should redirect them to the provided `next` URL.

```APIDOC
## GET [INTEGRATION_CALLBACK_URL]

### Description
This endpoint represents the callback URL of your integration, which receives parameters after a user installs your integration using a Vercel Deploy Button.

### Method
GET

### Endpoint
[INTEGRATION_CALLBACK_URL] (This is a placeholder for your integration's configured callback URL)

### Parameters
#### Path Parameters
(None)

#### Query Parameters
- **code** (string) - Required - The authorization code you received.
- **teamId** (string) - Optional - The ID of the team (only if a team is selected).
- **configurationId** (string) - Required - The ID of the configuration.
- **next** (string) - Required - Encoded URL to redirect to, once the installation process on your side is finished.
- **currentProjectId** (string) - Optional - The ID of the created project.
- **external-id** (string) - Optional - Reference of your choice. See External ID for more details.
- **source** (string) - Required - Source defines where the integration was installed from. Value: `deploy-button`

#### Request Body
(None)

### Request Example
(N/A - Parameters are received in the URL)

### Response
#### Success Response (200)
(Your integration processes the received parameters and typically redirects the user)

#### Response Example
{
  "code": "jMIukZ1DBCKXHje3X14BCkU0",
  "teamId": "team_LLHUOMOoDlqOp8wPE4kFo9pE",
  "configurationId": "icfg_6uKSUQ359QCbPfECTAY9murE",
  "next": "https%3A%2F%2Fvercel.com%2F...",
  "currentProjectId": "QmXGTs7mvAMMC7WW5ebrM33qKG32QK3h4vmQMjmY",
  "external-id": "1284210",
  "source": "deploy-button"
}
```

--------------------------------

### Install AI SDK and development dependencies using yarn

Source: https://vercel.com/docs/ai-gateway/getting-started

This command installs essential packages for developing with the AI Gateway using yarn. It includes the AI SDK (`ai`), `dotenv` for environment variable management, `tsx` for running TypeScript files, the `typescript` compiler, and `@types/node` for Node.js type definitions.

```bash
yarn add ai dotenv @types/node tsx typescript
```

--------------------------------

### GET [INTEGRATION_CALLBACK_URL] (External Flow)

Source: https://vercel.com/docs/integrations/create-integration/submit-integration

This section details the query parameters your integration's callback URL will receive when an installation is initiated externally and completed. The installation process is started by directing the user to `https://vercel.com/integrations/:slug/new`.

```APIDOC
## GET [INTEGRATION_CALLBACK_URL]

### Description
This endpoint represents the callback URL of your integration, which receives parameters after a user installs your integration via an external flow (e.g., initiated from your application).

### Method
GET

### Endpoint
[INTEGRATION_CALLBACK_URL] (This is a placeholder for your integration's configured callback URL)

### Parameters
#### Path Parameters
(None)

#### Query Parameters
- **code** (string) - Required - The authorization code you received.
- **teamId** (string) - Optional - The ID of the team (only if a team is selected).
- **configurationId** (string) - Required - The ID of the configuration.
- **next** (string) - Required - Encoded URL to redirect to, once the installation process on your side is finished.
- **state** (string) - Required - Random string to be passed back upon completion. It is used to protect against CSRF attacks.
- **source** (string) - Required - Source defines where the integration was installed from. Value: `external`

#### Request Body
(None)

### Request Example
(N/A - Parameters are received in the URL)

### Response
#### Success Response (200)
(Your integration processes the received parameters and typically redirects the user)

#### Response Example
{
  "code": "jMIukZ1DBCKXHje3X14BCkU0",
  "teamId": "team_LLHUOMOoDlqOp8wPE4kFo9pE",
  "configurationId": "icfg_6uKSUQ359QCbPfECTAY9murE",
  "next": "https%3A%2F%2Fvercel.com%2F...",
  "state": "xyzABC123",
  "source": "external"
}
```

--------------------------------

### Start Next.js JSS Application Locally

Source: https://vercel.com/docs/integrations/sitecore

These commands illustrate how to install dependencies, build the project, and start the Next.js application in development mode. Users can select the command corresponding to their package manager (pnpm, npm, or bun). Executing these commands will launch the local development server, making the application accessible for testing and further development.

```Terminal
pnpm install && pnpm build && pnpm dev
```

```Terminal
npm install && npm run build && npm run dev
```

```Terminal
bun install && bun run build && bun run dev
```

--------------------------------

### POST deployment.integration.action.start

Source: https://vercel.com/docs/integrations/create-integration/deployment-integration-action

Webhook triggered when a deployment starts an action. This webhook provides installation, action, resource, and deployment IDs needed to process the deployment action.

```APIDOC
## POST deployment.integration.action.start

### Description
Webhook triggered when a deployment starts an action. Use this to initiate processing of deployment actions.

### Webhook Event
deployment.integration.action.start

### Webhook Payload
```json
{
  "installationId": "icfg_1234567",
  "action": "branch",
  "resourceId": "abc-def-1334",
  "deployment": {
    "id": "dpl_568301234"
  }
}
```

### Payload Fields
- **installationId** (string) - The ID of the integration installation
- **action** (string) - The action slug being triggered
- **resourceId** (string) - The ID of the resource associated with the action
- **deployment.id** (string) - The ID of the deployment triggering the action

### Usage
Use the provided IDs to retrieve additional deployment details and process the action accordingly.
```

--------------------------------

### Example Installation Source for Vercel Configuration

Source: https://vercel.com/docs/rest-api/reference/endpoints/integrations/retrieve-an-integration-configuration

This example demonstrates a `source` value, indicating where the Vercel integration configuration was installed from. This `string` field helps analyze user engagement and product metrics for integration installations.

```json
"marketplace"
```

--------------------------------

### Start Next.js Application Locally with Package Managers

Source: https://vercel.com/docs/integrations/contentful

These commands illustrate how to install project dependencies and start a Next.js development server using pnpm, npm, or bun. Running these commands will launch your application locally, typically accessible at `http://localhost:3000`, allowing you to preview your changes.

```pnpm
pnpm install && pnpm run dev
```

```npm
npm install && npm run dev
```

```bun
bun install && bun run dev
```

--------------------------------

### Initialize a new project directory with pnpm

Source: https://vercel.com/docs/ai-gateway/getting-started

This sequence of `bash` commands sets up a new project environment. It creates a directory named 'demo', navigates into it, and then initializes a new pnpm project, which generates a `package.json` file for managing dependencies.

```bash
mkdir demo
cd demo
pnpm init
```

--------------------------------

### Make AI Gateway request using OpenAI SDK in TypeScript

Source: https://vercel.com/docs/ai-gateway/getting-started

This TypeScript example illustrates integrating with the Vercel AI Gateway using the standard OpenAI SDK. It configures the `OpenAI` client with the AI Gateway's base URL and API key, then sends a chat completion request to an AI model, printing the response content.

```typescript
import OpenAI from 'openai';
import 'dotenv/config';

const client = new OpenAI({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

async function main() {
  const response = await client.chat.completions.create({
    model: 'anthropic/claude-sonnet-4.5',
    messages: [
      {
        role: 'user',
        content: 'Invent a new holiday and describe its traditions.',
      },
    ],
  });

  console.log(response.choices[0].message.content);
}

main().catch(console.error);
```

--------------------------------

### Run Catalyst CLI for Project Setup (Bash)

Source: https://vercel.com/docs/integrations/ecommerce/bigcommerce

Executes the Catalyst CLI tool to guide you through the initial project setup, including logging into your BigCommerce store, configuring a storefront channel, and generating the necessary `.env.local` file.

```bash
pnpm create @bigcommerce/catalyst@latest init
```

--------------------------------

### Initialize new Flask project using Vercel CLI

Source: https://vercel.com/docs/frameworks/backend/flask

This command uses the Vercel CLI to initialize a new Flask project, cloning the official Flask example repository into a 'flask' directory. It's the quickest way to get started with a Flask application on Vercel, providing a ready-to-deploy structure.

```bash
vc init flask
```

--------------------------------

### Edge Function Configuration Example

Source: https://vercel.com/docs/build-output-api/primitives

Configuration file for an Edge Function specifying the runtime type, entry point file, and required environment variables. This `.vc-config.json` example demonstrates a minimal Edge Function setup with database API key access.

```json
{
  "runtime": "edge",
  "entrypoint": "index.js",
  "envVarsInUse": ["DATABASE_API_KEY"]
}
```

--------------------------------

### Install Workflow Development Kit (WDK) Package

Source: https://vercel.com/docs/workflow

Install the Workflow package using various package managers (pnpm, yarn, npm, or bun). This is the first step to get started with Vercel Workflow development.

```bash
pnpm i workflow
```

```bash
yarn i workflow
```

```bash
npm i workflow
```

```bash
bun i workflow
```

--------------------------------

### Create SDK Client with Secret in TypeScript

Source: https://vercel.com/docs/integrations/create-integration/submit-integration

Example of initializing an SDK client with a secret placeholder that gets masked in the Vercel dashboard. The `{{YOUR_SECRET}}` placeholder is replaced with a masked value and a 'Show Secrets' button for security. This pattern is used in product quickstart snippets to help integration users connect with installed products.

```typescript
import { createClient } from 'acme-sdk';

const client = createClient('https://your-project.acme.com', '{{YOUR_SECRET}}');
```

--------------------------------

### GET /v1/installations/{installationId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

Retrieve details for a specific installation by its ID.

```APIDOC
## GET /v1/installations/{installationId}

### Description
Get Installation

### Method
GET

### Endpoint
/v1/installations/{installationId}

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
```

--------------------------------

### Get Installation HTTP Request

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/get-installation

HTTP GET request to retrieve an installation by its ID from the Vercel Marketplace API. Requires system authentication using OIDC JWT tokens signed with Vercel's private key. The installationId path parameter is required.

```http
GET /v1/installations/{installationId}
```

--------------------------------

### Prerender Configuration Example

Source: https://vercel.com/docs/build-output-api/primitives

A practical example of a prerender-config.json file showing typical configuration values for a blog endpoint with caching, fallback handling, and query parameter filtering.

```APIDOC
## Example Prerender Configuration File

### Description
This is what an `example.prerender-config.json` file could look like in a real scenario.

### Configuration Example
```json
{
  "expiration": 60,
  "group": 1,
  "bypassToken": "03326da8bea31b919fa3a31c85747ddc",
  "fallback": "example.prerender-fallback.html",
  "allowQuery": ["id"]
}
```

### Configuration Details
- **expiration**: 60 seconds - The cached asset will be re-generated after 60 seconds
- **group**: 1 - This asset belongs to group 1 and will be re-validated with other group 1 assets
- **bypassToken**: Random token for Draft Mode bypass functionality
- **fallback**: Points to a static fallback file served while runtime cache is being generated
- **allowQuery**: Only the "id" query parameter will be cached independently; other query parameters are ignored
```

--------------------------------

### Illustrate Provider-Initiated SSO URL with Example Parameters

Source: https://vercel.com/docs/integrations/marketplace-api

This example provides a concrete instance of a provider-initiated SSO URL, demonstrating how to incorporate specific values for the `URLSlug`, `installationId`, and an additional `resource_id` parameter. This fully constructed URL facilitates a seamless redirection from the provider's platform to Vercel for authentication.

```text
https://vercel.com/sso/integrations/aws-marketplace-integration-demo/icfg_PSFtkFqr5djKRtOkNtOHIfSd?resource_id=123456 
```

--------------------------------

### GET /v1/installations/{installationId}

Source: https://vercel.com/docs/integrations/marketplace-api

Retrieves installation details including notification information. This endpoint allows you to fetch the current state of an integration installation and access any associated notifications.

```APIDOC
## GET /v1/installations/{installationId}

### Description
Retrieves installation details with notification information for a specific integration installation.

### Method
GET

### Endpoint
`https://api.vercel.com/v1/installations/{installationId}`

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The unique identifier of the installation

#### Headers
- **Authorization** (string) - Required - Bearer token for authentication

### Request Example
```
GET https://api.vercel.com/v1/installations/icfg_def456
Headers:
  Authorization: Bearer {token}
```

### Response
#### Success Response (200)
- **id** (string) - Installation identifier
- **notification** (object) - Optional - Notification object containing title and message
  - **title** (string) - Notification title
  - **message** (string) - Notification message
- **installationId** (string) - The installation ID

#### Response Example
```json
{
  "id": "icfg_def456",
  "installationId": "icfg_def456",
  "notification": {
    "title": "Installation Active",
    "message": "Your integration is active and ready to use"
  }
}
```
```

--------------------------------

### POST /v1/responses (OpenResponses API)

Source: https://vercel.com/docs/ai-gateway/getting-started

This endpoint implements the OpenResponses API standard for unified, provider-agnostic AI model interactions, supporting text generation, streaming, and tool calling through the Vercel AI Gateway.

```APIDOC
## POST /v1/responses

### Description
This endpoint implements the OpenResponses API standard for unified, provider-agnostic AI model interactions, supporting text generation, streaming, and tool calling through the Vercel AI Gateway.

### Method
POST

### Endpoint
/v1/responses

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
- **model** (string) - Required - The ID of the model to use (e.g., `anthropic/claude-sonnet-4.5`).
- **input** (array of objects) - Required - A list of input messages.
  - **type** (string) - Required - The type of input (e.g., `message`).
  - **role** (string) - Required - The role of the author of this message (`user`).
  - **content** (string) - Required - The content of the message.

### Request Example
```json
{
  "model": "anthropic/claude-sonnet-4.5",
  "input": [
    {
      "type": "message",
      "role": "user",
      "content": "Invent a new holiday and describe its traditions."
    }
  ]
}
```

### Response
#### Success Response (200)
- **output** (array of objects) - A list of output blocks generated by the model.
  - **content** (array of objects) - A list of content blocks.
    - **text** (string) - The text content of the message.

#### Response Example
```json
{
  "id": "res_xxxxxxxxxxxxxxxxxxxx",
  "object": "response",
  "created": 1700000000,
  "model": "anthropic/claude-sonnet-4.5",
  "output": [
    {
      "type": "message",
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "Introducing 'Luminary Day'..."
        }
      ]
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 20,
    "total_tokens": 35
  }
}
```
```

--------------------------------

### Install Flags SDK with Package Manager

Source: https://vercel.com/docs/feature-flags/flags-explorer/getting-started

Install the flags package using your preferred package manager (pnpm, yarn, npm, or bun). This package provides convenience methods, components, and types for communicating with Flags Explorer.

```bash
pnpm i flags
```

```bash
yarn i flags
```

```bash
npm i flags
```

```bash
bun i flags
```

--------------------------------

### Get Installation with Notification - TypeScript

Source: https://vercel.com/docs/integrations/marketplace-api

Fetches installation details from the Vercel API using the installation ID and extracts notification information if present. Requires Bearer token authentication and handles JSON response parsing. Returns the complete installation object with optional notification title and message.

```typescript
async function getInstallation(installationId: string) {
  const response = await fetch(
    `https://api.vercel.com/v1/installations/${installationId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
 
  const installation = await response.json();
 
  if (installation.notification) {
    console.log(`Notification: ${installation.notification.title}`);
    console.log(`Message: ${installation.notification.message}`);
  }
 
  return installation;
}
```

--------------------------------

### Sandbox.create()

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

Launch a new microVM with chosen runtime, source, and resource settings. Defaults to an empty workspace when no source is provided. Use `source.depth` for cloning large repositories to shorten setup time.

```APIDOC
## Sandbox.create()

### Description
Launch a new microVM with your chosen runtime, source, and resource settings. Defaults to an empty workspace when no source is provided. Pass `source.depth` when cloning large repositories to shorten setup time.

### Method
POST

### Returns
`Promise<Sandbox>`

### Parameters
#### Request Body
- **source** (object) - Optional - Source configuration for the sandbox.
  - **git** (object) - Clone a Git repository.
    - **url** (string) - Required - Repository URL.
    - **username** (string) - Optional - Git username.
    - **password** (string) - Optional - Git password.
    - **depth** (number) - Optional - Clone depth for faster setup.
    - **revision** (string) - Optional - Git revision to checkout.
  - **tarball** (object) - Mount a tarball.
    - **url** (string) - Required - Tarball URL.
  - **snapshot** (object) - Create from a snapshot.
    - **snapshotId** (string) - Required - Snapshot identifier.
- **resources.vcpus** (number) - Optional - Override CPU count (defaults to plan baseline).
- **runtime** (string) - Optional - Runtime image such as "node24", "node22", or "python3.13".
- **ports** (number[]) - Optional - Ports to expose for `sandbox.domain()`.
- **timeout** (number) - Optional - Initial timeout in milliseconds.
- **signal** (AbortSignal) - Optional - Cancel sandbox creation if needed.

### Request Example
```ts
const sandbox = await Sandbox.create({ runtime: 'node24' });
```

### Response
#### Success Response (200)
- **sandbox** (Sandbox) - The newly created sandbox instance.
```

--------------------------------

### Initialize Specific Framework Example - Extended Usage

Source: https://vercel.com/docs/cli/init

Initialize a specific framework example from the Vercel examples repository by providing the framework name as an argument. This skips the framework selection prompt and directly initializes the specified framework.

```bash
vercel init [framework-name]
```

--------------------------------

### Initialize Elysia Project using Vercel CLI

Source: https://vercel.com/docs/frameworks/backend/elysia

Use the Vercel CLI `init` command to quickly set up a new Elysia project. This command clones the official Elysia example repository, providing a ready-to-use starting point for your application. Ensure you have Vercel CLI version 49.0.0 or higher.

```bash
vc init elysia
```

--------------------------------

### GET /v1/installations/{installationId}/plans

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

List all billing plans associated with a specific installation.

```APIDOC
## GET /v1/installations/{installationId}/plans

### Description
List Billing Plans For Installation

### Method
GET

### Endpoint
/v1/installations/{installationId}/plans

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
```

--------------------------------

### Install Vercel Blob Package

Source: https://vercel.com/docs/vercel-blob/client-upload

Install the @vercel/blob package using various package managers (pnpm, yarn, npm, bun). This is the first prerequisite step for integrating Vercel Blob into any frontend framework.

```pnpm
pnpm i @vercel/blob
```

```yarn
yarn i @vercel/blob
```

```npm
npm i @vercel/blob
```

```bun
bun i @vercel/blob
```

--------------------------------

### Install Nitro package for TanStack Start

Source: https://vercel.com/docs/frameworks/full-stack/tanstack-start

This command installs the Nitro package, which is essential for integrating TanStack Start applications with Vercel's deployment features, using various package managers.

```bash
pnpm i nitro
```

```bash
yarn i nitro
```

```bash
npm i nitro
```

```bash
bun i nitro
```

--------------------------------

### POST /v1/chat/completions (OpenAI-Compatible)

Source: https://vercel.com/docs/ai-gateway/getting-started

This endpoint allows interacting with AI models via an OpenAI-compatible API for chat completions, routed through the Vercel AI Gateway. It supports standard OpenAI SDK usage.

```APIDOC
## POST /v1/chat/completions

### Description
This endpoint allows interacting with AI models via an OpenAI-compatible API for chat completions, routed through the Vercel AI Gateway. It supports standard OpenAI SDK usage.

### Method
POST

### Endpoint
/v1/chat/completions

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
- **model** (string) - Required - The ID of the model to use (e.g., `anthropic/claude-sonnet-4.5`).
- **messages** (array of objects) - Required - A list of messages comprising the conversation so far.
  - **role** (string) - Required - The role of the author of this message (`user`, `assistant`, `system`).
  - **content** (string) - Required - The content of the message.

### Request Example
```json
{
  "model": "anthropic/claude-sonnet-4.5",
  "messages": [
    {
      "role": "user",
      "content": "Invent a new holiday and describe its traditions."
    }
  ]
}
```

### Response
#### Success Response (200)
- **choices** (array of objects) - A list of chat completion choices.
  - **message** (object) - The message generated by the model.
    - **content** (string) - The content of the message.

#### Response Example
```json
{
  "id": "chatcmpl-xxxxxxxxxxxxxxxxxxxx",
  "object": "chat.completion",
  "created": 1700000000,
  "model": "anthropic/claude-sonnet-4.5",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Introducing 'Luminary Day'..."
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 15,
    "completion_tokens": 20,
    "total_tokens": 35
  }
}
```
```

--------------------------------

### Clone Next.js JSS Sitecore XM Cloud Starter Repository

Source: https://vercel.com/docs/integrations/sitecore

This section provides commands to clone the Sitecore XM Cloud Next.js starter application. Users can choose their preferred package manager (pnpm, npx, or bunx) to initialize the project from the example repository. This sets up the frontend Next.js application ready for configuration.

```Terminal
pnpm create next-app --example cms-sitecore-xmcloud
```

```Terminal
npx create-next-app --example cms-sitecore-xmcloud
```

```Terminal
bunx create-next-app --example cms-sitecore-xmcloud
```

--------------------------------

### Wildcard Configuration Example - JSON

Source: https://vercel.com/docs/build-output-api/configuration

Demonstrates a practical wildcard configuration mapping multiple domain names to locale values for internationalization. Shows how domains are matched to $wildcard routing variables that can be referenced in routes configuration to serve localized content.

```json
{
  "wildcard": [
    {
      "domain": "example.com",
      "value": "en-US"
    },
    {
      "domain": "example.nl",
      "value": "nl-NL"
    },
    {
      "domain": "example.fr",
      "value": "fr"
    }
  ],
  "routes": [
    { "src": "/blog", "dest": "/blog.$wildcard.html" }
  ]
}
```

--------------------------------

### GET /v1/installations/{installationId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/get-installation

Retrieves details about a specific installation using its installation ID. This endpoint uses OpenID Connect Protocol (OIDC) for system authentication with JWT tokens signed by Vercel's private key.

```APIDOC
## GET /v1/installations/{installationId}

### Description
Get an installation from the Vercel Marketplace API. Requires system authentication using OpenID Connect Protocol (OIDC) with a JWT token signed by Vercel's private key.

### Method
GET

### Endpoint
/v1/installations/{installationId}

### Authentication
**System Authentication (OIDC)**
- Uses OpenID Connect Protocol (OIDC)
- Requires JWT token signed with Vercel's private key
- Token verifiable using Vercel's public JSON Web Key Sets (JWKS)
- JWKS available at: https://marketplace.vercel.com/.well-known/jwks

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation to retrieve

#### Header Parameters
- **X-Vercel-Auth** (string) - Optional - The auth style used in the request (system, user, etc)

### OIDC Token Claims Schema
```json
{
  "iss": "https://marketplace.vercel.com",
  "sub": "account:[0-9a-fA-F]+",
  "aud": "oac_9f4YG9JFjgKkRlxoaaGG0y05",
  "type": "access_token|id_token",
  "installation_id": "icfg_9bceb8ccT32d3U417ezb5c8p",
  "account_id": "string"
}
```

### Request Example
```
GET /v1/installations/icfg_9bceb8ccT32d3U417ezb5c8p HTTP/1.1
Host: api.vercel.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
X-Vercel-Auth: system
```

### Response
#### Success Response (200)
Returns the installation object with details about the requested installation.

#### Response Example
```json
{
  "installation_id": "icfg_9bceb8ccT32d3U417ezb5c8p",
  "account_id": "account_123abc",
  "integration_id": "oac_9f4YG9JFjgKkRlxoaaGG0y05",
  "status": "active"
}
```
```

--------------------------------

### GET /v1/installations/{installationId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api

Retrieves the details of a specific Vercel installation, including its current notification status if one is set.

```APIDOC
## GET /v1/installations/{installationId}

### Description
Retrieves the details of a specific Vercel installation, including its current notification status if one is set.

### Method
GET

### Endpoint
/v1/installations/{installationId}

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the Vercel installation.

### Request Example
```json
{}
```

### Response
#### Success Response (200)
- **id** (string) - The ID of the installation.
- **notification** (object | null) - The current notification object or `null` if none is set.
  - If `notification` is an object:
    - **title** (string) - The title of the notification.
    - **message** (string) - The main message of the notification.
    - **href** (string) - A URL for the notification link.
    - **type** (string) - The type of notification.
- (Other installation fields may also be present)

#### Response Example
```json
{
  "id": "icfg_abc123",
  "notification": {
    "title": "Action Required",
    "message": "Please complete your account setup",
    "href": "https://your-integration.com/setup",
    "type": "warning"
  }
}
```
```

--------------------------------

### Verify Resource Transfer Request via HTTP GET

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/verify-resource-transfer

This HTTP GET endpoint is used by Vercel to verify a resource transfer request. It provides a potential target for the transfer and requests necessary prerequisite setup information. The `installationId` in the URL refers to the target installation, not the source.

```http
GET /v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/verify
```

--------------------------------

### GET /v1/installations/{integrationConfigurationId}/resources

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel

Retrieves all integration resources for a specific installation in the Vercel Marketplace.

```APIDOC
## GET /v1/installations/{integrationConfigurationId}/resources

### Description
Retrieves all integration resources for a specific installation in the Vercel Marketplace.

### Method
GET

### Endpoint
/v1/installations/{integrationConfigurationId}/resources

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required - The ID of the integration configuration.

#### Query Parameters
None

#### Request Body
None

### Request Example
{}

### Response
#### Success Response (200)
None

#### Response Example
{}
```

--------------------------------

### Initialize Vercel Framework Example - Basic Usage

Source: https://vercel.com/docs/cli/init

Basic usage of the vercel init command to initialize a Vercel supported framework example. The command prompts the user with a list of supported frameworks to choose from. No arguments are required.

```bash
vercel init
```

--------------------------------

### Install Vercel Blob Client Library

Source: https://vercel.com/docs/storage/vercel-blob/client-upload

This snippet demonstrates how to install the `@vercel/blob` package, which provides client-side utilities for interacting with Vercel Blob storage. It supports popular package managers like pnpm, yarn, and bun.

```pnpm
pnpm i @vercel/blob
```

```yarn
yarn add @vercel/blob
```

```bun
bun add @vercel/blob
```

--------------------------------

### POST /v1/installations/{installationId}/resources

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

Provision a new resource for a given installation.

```APIDOC
## POST /v1/installations/{installationId}/resources

### Description
Provision Resource

### Method
POST

### Endpoint
/v1/installations/{installationId}/resources

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
```

--------------------------------

### Example JSON Response for Updating Vercel Installation Notification

Source: https://vercel.com/docs/integrations/marketplace-api

This JSON object represents the expected response from the Vercel API after successfully updating an installation's notification. It confirms the `id` of the installation and includes the details of the newly set or updated `notification`.

```json
{
  "id": "icfg_abc123",
  "notification": {
    "title": "Action Required",
    "message": "Please complete your account setup",
    "href": "https://your-integration.com/setup",
    "type": "warning"
  }
}
```

--------------------------------

### Basic Nuxt Image Module Setup

Source: https://vercel.com/docs/image-optimization/quickstart

Initialize the @nuxt/image module in Nuxt configuration. This is the minimal setup required before adding advanced image optimization settings.

```javascript
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
});
```

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
});
```

--------------------------------

### Generate AI responses using OpenAI SDK with Vercel AI Gateway (Python)

Source: https://vercel.com/docs/ai-gateway/getting-started

This snippet demonstrates how to use the OpenAI Python SDK to interact with Vercel's AI Gateway. It initializes an OpenAI client with the AI Gateway's base URL and API key, then creates a chat completion request to generate a holiday description.

```python
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1',
)

response = client.chat.completions.create(
    model='anthropic/claude-sonnet-4.5',
    messages=[
        {
            'role': 'user',
            'content': 'Invent a new holiday and describe its traditions.',
        },
    ],
)

print(response.choices[0].message.content)
```

--------------------------------

### Install Native Integration with vercel install CLI

Source: https://vercel.com/docs/cli/install

Installs a native integration using the vercel install command with the integration provider slug. The slug can be obtained from the Vercel Marketplace URL. For example, using 'gel' as the slug from https://vercel.com/marketplace/gel installs the ACME integration.

```bash
vercel install acme
```

--------------------------------

### Create Vercel Function with other frameworks

Source: https://vercel.com/docs/functions/quickstart

Create a Vercel Function for frameworks other than Next.js using the fetch API. This example shows the standard export format for handling requests in non-Next.js environments.

```typescript
export default {
  async fetch(request: Request) {
    const response = await fetch('https://api.vercel.app/products');
    const products = await response.json();
    return Response.json(products);
  },
};
```

```javascript
export default {
  async fetch(request) {
    const response = await fetch('https://api.vercel.app/products');
    const products = await response.json();
    return Response.json(products);
  },
};
```

--------------------------------

### Initialize Nitro Project with Vercel CLI

Source: https://vercel.com/docs/frameworks/backend/nitro

Use the Vercel CLI `init` command to quickly set up a new Nitro project. This command clones the official Nitro example repository, providing a ready-to-use starting point for your application.

```bash
vc init nitro
```

--------------------------------

### Install or Update Vercel CLI

Source: https://vercel.com/docs/edge-config/integrations/hypertune-edge-config

Install the latest version of Vercel CLI using package managers. Choose from pnpm, yarn, or bun based on your project setup.

```bash
pnpm i -g vercel@latest
```

```bash
yarn global add vercel@latest
```

```bash
bun add -g vercel@latest
```

--------------------------------

### Create Vercel Function with Next.js App Router

Source: https://vercel.com/docs/functions/quickstart

Create a Vercel Function using Next.js App Router that fetches product data from the Vercel API and returns it as JSON. This example demonstrates handling GET requests and external API integration.

```typescript
export async function GET(request: Request) {
  const response = await fetch('https://api.vercel.app/products');
  const products = await response.json();
  return Response.json(products);
}
```

```javascript
export async function GET(request) {
  const response = await fetch('https://api.vercel.app/products');
  const products = await response.json();
  return Response.json(products);
}
```

--------------------------------

### Static File Override Configuration Example - JSON

Source: https://vercel.com/docs/build-output-api/configuration

Shows how to configure static file overrides to serve an HTML file without the .html extension. This example remaps blog.html to be accessible at the /blog path, allowing cleaner URLs for static content.

```json
{
  "overrides": {
    "blog.html": {
      "path": "blog"
    }
  }
}
```

--------------------------------

### GET /v1/installations/{installationId}/resources/{resourceId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

Retrieve details for a specific resource belonging to an installation.

```APIDOC
## GET /v1/installations/{installationId}/resources/{resourceId}

### Description
Get Resource

### Method
GET

### Endpoint
/v1/installations/{installationId}/resources/{resourceId}

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
- **resourceId** (string) - Required - The ID of the resource.
```

--------------------------------

### Install LaunchDarkly Vercel Server SDK across package managers

Source: https://vercel.com/docs/edge-config/integrations/launchdarkly-edge-config

Install the LaunchDarkly Vercel Server SDK using pnpm, npm, or bun. This SDK enables feature flag evaluation in your Vercel middleware.

```bash
pnpm i @launchdarkly/vercel-server-sdk
```

```bash
npm i @launchdarkly/vercel-server-sdk
```

```bash
bun add @launchdarkly/vercel-server-sdk
```

--------------------------------

### Set Vercel Installation Notification with SSO-enabled Link (TypeScript)

Source: https://vercel.com/docs/integrations/marketplace-api

This TypeScript example demonstrates how to create an installation notification where the `href` field is prefixed with `sso:` to enable Single Sign-On. This ensures users are authenticated via Vercel's SSO flow before being redirected to the specified resource on your platform.

```typescript
await updateInstallationNotification('icfg_abc123', {
  title: 'Review your usage',
  message: 'Your monthly usage report is ready',
  href: 'sso:https://your-integration.com/dashboard/usage',
  type: 'info',
});
```

--------------------------------

### Initialize Express Project with Vercel CLI

Source: https://vercel.com/docs/frameworks/backend/express

Use the Vercel CLI `init` command to quickly set up a new Express project, cloning an example repository into a local directory.

```bash
vc init express
```

--------------------------------

### Basic Sandbox Workflow with TypeScript

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

This TypeScript example illustrates the fundamental steps for interacting with the Vercel Sandbox SDK. It shows how to create a new sandbox instance with a specified runtime, execute a command within it, and then retrieve and log the command's exit code and standard output. This demonstrates the core process of running isolated tasks and checking their results.

```typescript
// 1. Create a sandbox
const sandbox = await Sandbox.create({ runtime: 'node24' });

// 2. Run a command - it waits for completion and returns the result
const result = await sandbox.runCommand('node', ['--version']);

// 3. Check the result
console.log(result.exitCode); // 0
console.log(await result.stdout()); // v22.x.x
```

--------------------------------

### Install LaunchDarkly Vercel Server SDK across package managers

Source: https://vercel.com/docs/edge-config/edge-config-integrations/launchdarkly-edge-config

Install the LaunchDarkly Vercel Server SDK using pnpm, yarn, npm, or bun. This SDK enables feature flag integration with Vercel middleware.

```bash
pnpm i @launchdarkly/vercel-server-sdk
```

```bash
yarn i @launchdarkly/vercel-server-sdk
```

```bash
npm i @launchdarkly/vercel-server-sdk
```

```bash
bun i @launchdarkly/vercel-server-sdk
```

--------------------------------

### GET /v1/integrations/configurations

Source: https://vercel.com/docs/rest-api/vercel-api-integrations

Retrieve a list of integration configurations. This endpoint allows read access to integration installations.

```APIDOC
## GET /v1/integrations/configurations\n\n### Description\nRetrieve a list of integration configurations. This endpoint allows read access to integration installations.\n\n### Method\nGET\n\n### Endpoint\n/v1/integrations/configurations\n\n### Parameters\n#### Path Parameters\n(No path parameters specified)\n\n#### Query Parameters\n(No query parameters specified)\n\n#### Request Body\n(No request body specified)\n\n### Request Example\n{}\n\n### Response\n#### Success Response (200)\n(No success response details specified)\n\n#### Response Example\n{}
```

--------------------------------

### PUT /v1/installations/{installationId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

Create or update an installation by its ID.

```APIDOC
## PUT /v1/installations/{installationId}

### Description
Upsert Installation

### Method
PUT

### Endpoint
/v1/installations/{installationId}

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
```

--------------------------------

### Configure cron jobs in vercel.json

Source: https://vercel.com/docs/cron-jobs/quickstart

Configure cron jobs in the vercel.json file by defining a crons array with job objects. Each cron job requires a path (starting with /) and a schedule property containing a cron expression. The example schedules a job to run daily at 5:00 AM UTC using the expression '0 5 * * *'.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "crons": [
    {
      "path": "/api/hello",
      "schedule": "0 5 * * *"
    }
  ]
}
```

--------------------------------

### Run Development Server - Multiple Package Managers

Source: https://vercel.com/docs/sign-in-with-vercel/getting-started

Commands to start the Next.js development server using different package managers. Choose the command matching your project's package manager (pnpm, yarn, npm, or bun).

```bash
pnpm run dev
```

```bash
yarn run dev
```

```bash
npm run dev
```

```bash
bun run dev
```

--------------------------------

### Example 200 OK Response for Vercel Account Information API

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-account-info

This JSON object illustrates a successful response (HTTP 200 OK) from the Vercel Account Information API. It provides details such as the team's name, a URL to the installation in the Vercel Dashboard, and contact information including email and an optional name.

```json
{
  "name": "string",
  "url": "string",
  "contact": {
    "email": "string",
    "name": "string"
  }
}
```

--------------------------------

### Initialize a new FastAPI project using Vercel CLI

Source: https://vercel.com/docs/frameworks/backend/fastapi

This command uses the Vercel CLI `init` command to clone the FastAPI example repository into a new directory. It provides a quick and easy way to set up a new FastAPI project ready for deployment on Vercel.

```bash
vc init fastapi
```

--------------------------------

### GET /api/billing/plans

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/list-billing-plans-for-installation

Retrieves a list of available billing plans for an installation, detailing their properties, costs, and eligibility.

```APIDOC
## GET /api/billing/plans

### Description
Retrieves a list of available billing plans for an installation, detailing their properties, costs, and eligibility.

### Method
GET

### Endpoint
/api/billing/plans

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **plans** (array of objects) - Required - A list of billing plans.
  - **id** (string) - Required - Partner-provided billing plan ID. Example: "pro200".
  - **type** (string) - Required - Type of the plan.
  - **name** (string) - Required - Name of the plan. Example: "Hobby".
  - **scope** (string) - Plan scope. To use `installation` level billing plans, Installation-level Billing Plans must be enabled on your integration.
  - **description** (string) - Required - Example: "Use all you want up to 20G".
  - **paymentMethodRequired** (boolean) - Only used if plan type is `subscription`. Set this field to `false` if this plan is completely free.
  - **preauthorizationAmount** (number) - Only used if plan type is `subscription` and `paymentMethodRequired` is `true`. The amount will be used to test if the user's payment method can handle the charge. Example: 10.53 for $10.53 USD. This amount will not be charged to the user, nor will it be reserved for later completion.
  - **initialCharge** (string) - Only used if plan type is `subscription` and `paymentMethodRequired` is `true`. The amount that the partner will invoice immediately at sign-up. Example: 20.00 for $20.00 USD.
  - **minimumAmount** (string) - Optional, ignored unless plan type is `prepayment`. The minimum amount of credits a user can purchase at a time. The value is a decimal string representation of the USD amount, e.g. "4.39" for $4.39 USD as the minumum amount.
  - **maximumAmount** (string) - Optional, ignored unless plan type is `prepayment`. The maximum amount of credits a user can purchase at a time. The value is a decimal string representation of the USD amount, e.g. "86.82" for $86.82 USD as the maximum amount.
  - **maximumAmountAutoPurchasePerPeriod** (string) - Optional, ignored unless plan type is `prepayment`. The maximum amount of credits the system can auto-purchase in any period (month). The value is a decimal string representation of the USD amount, e.g. "86.82" for $86.82 USD as the maximum amount.
  - **cost** (string) - Plan's cost, if available. Only relevant for fixed-cost plans. Example: "$20.00/month".
  - **details** (array of objects)
    - **label** (string) - Required
    - **value** (string)
  - **highlightedDetails** (array of objects)
    - **label** (string) - Required
    - **value** (string)
  - **quote** (array of objects)
    - **line** (string) - Required
    - **amount** (string) - Required
  - **effectiveDate** (string) - Date/time when the plan becomes effective. Important for billing plan changes.
  - **disabled** (boolean) - If true, the plan is disabled and cannot be selected. Example: `disabled: true` for "Hobby" plan.

#### Response Example
```json
{
  "plans": [
    {
      "id": "pro200",
      "type": "subscription",
      "name": "Pro Plan",
      "scope": "installation",
      "description": "Use all you want up to 20G",
      "paymentMethodRequired": true,
      "preauthorizationAmount": 10.53,
      "initialCharge": "20.00",
      "minimumAmount": null,
      "maximumAmount": null,
      "maximumAmountAutoPurchasePerPeriod": null,
      "cost": "$20.00/month",
      "details": [
        {
          "label": "Bandwidth",
          "value": "20GB"
        }
      ],
      "highlightedDetails": [],
      "quote": [],
      "effectiveDate": "2023-01-01T00:00:00Z",
      "disabled": false
    }
  ]
}
```

#### Error Response (403)
- **error** (object) - Required
  - **code** (string) - Required
  - **message** (string) - Required - System error message.
  - **user** (object)
    - **message** (string) - User-facing error message, if applicable.
    - **url** (string) - URL to a user-facing help article, or a dashboard page for resolution, if applicable.

#### Error Response (403) Example
```json
{
  "error": {
    "code": "forbidden",
    "message": "Authentication not allowed to perform this operation",
    "user": {
      "message": "You do not have permission to access billing plans.",
      "url": "https://vercel.com/docs/integrations/billing-permissions"
    }
  }
}
```

#### Error Response (409)
- **error** (object) - Required
  - **code** (string) - Required
  - **message** (string) - Required - System error message.
  - **user** (object)
    - **message** (string) - User-facing error message, if applicable.
    - **url** (string) - URL to a user-facing help article, or a dashboard page for resolution, if applicable.

#### Error Response (409) Example
```json
{
  "error": {
    "code": "conflict",
    "message": "Operation failed due to resource conflict",
    "user": {
      "message": "A billing plan change is already pending.",
      "url": "https://vercel.com/docs/integrations/billing-status"
    }
  }
}
```
```

--------------------------------

### Retrieve Vercel Installation with Notification Status

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api

This snippet demonstrates how to fetch the details of a Vercel installation, including its current notification status, using the GET /v1/installations/{installationId} endpoint. The asynchronous function retrieves the installation object and then checks if a 'notification' field is present. If a notification exists, its title and message are logged to the console, and the full installation object is returned.

```ts
async function getInstallation(installationId: string) {
  const response = await fetch(
    `https://api.vercel.com/v1/installations/${installationId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  const installation = await response.json();

  if (installation.notification) {
    console.log(`Notification: ${installation.notification.title}`);
    console.log(`Message: ${installation.notification.message}`);
  }

  return installation;
}
```

--------------------------------

### GET /v1/installations/{integrationConfigurationId}/account

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel

Retrieves account information for a specific installation in the Vercel Marketplace.

```APIDOC
## GET /v1/installations/{integrationConfigurationId}/account

### Description
Retrieves account information for a specific installation in the Vercel Marketplace.

### Method
GET

### Endpoint
/v1/installations/{integrationConfigurationId}/account

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required - The ID of the integration configuration.

#### Query Parameters
None

#### Request Body
None

### Request Example
{}

### Response
#### Success Response (200)
None

#### Response Example
{}
```

--------------------------------

### Complete Vercel config.json Configuration Example

Source: https://vercel.com/docs/build-output-api/configuration

A comprehensive example of a Vercel config.json file demonstrating all major configuration sections including routes, images, wildcard domains, overrides, cache, framework, and cron jobs. This serves as a reference for setting up a complete Vercel deployment configuration.

```json
{
  "version": 3,
  "routes": [
    {
      "src": "/redirect",
      "status": 308,
      "headers": { "Location": "https://example.com/" }
    },
    {
      "src": "/blog",
      "dest": "/blog.$wildcard.html"
    }
  ],
  "images": {
    "sizes": [640, 750, 828, 1080, 1200],
    "domains": [],
    "minimumCacheTTL": 60,
    "formats": ["image/avif", "image/webp"],
    "qualities": [25, 50, 75],
    "localPatterns": [{
      "pathname": "^/assets/.*$",
      "search": ""
    }],
    "remotePatterns": [
      {
        "protocol": "https",
        "hostname": "^via\\.placeholder\\.com$",
        "port": "",
        "pathname": "^/1280x640/.*$",
        "search": "?v=1"
      }
    ]
  },
  "wildcard": [
    {
      "domain": "example.com",
      "value": "en-US"
    },
    {
      "domain": "example.nl",
      "value": "nl-NL"
    },
    {
      "domain": "example.fr",
      "value": "fr"
    }
  ],
  "overrides": {
    "blog.html": {
      "path": "blog"
    }
  },
  "cache": [".cache/**", "node_modules/**"],
  "framework": {
    "version": "1.2.3"
  },
  "crons": [
    {
      "path": "/api/cron",
      "schedule": "* * * * *"
    }
  ]
}
```

--------------------------------

### Install AI SDK and OpenAI packages with package managers

Source: https://vercel.com/docs/functions/streaming-functions

Install the required `ai` and `@ai-sdk/openai` packages using various package managers (pnpm, yarn, npm, bun). These packages provide the AI SDK framework and OpenAI model integration needed for streaming text generation.

```bash
pnpm i ai openai
```

```bash
yarn i ai openai
```

```bash
npm i ai openai
```

```bash
bun i ai openai
```

--------------------------------

### GET /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel

Retrieves a specific invoice for an installation in the Vercel Marketplace.

```APIDOC
## GET /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}

### Description
Retrieves a specific invoice for an installation in the Vercel Marketplace.

### Method
GET

### Endpoint
/v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required - The ID of the integration configuration.
- **invoiceId** (string) - Required - The ID of the invoice.

#### Query Parameters
None

#### Request Body
None

### Request Example
{}

### Response
#### Success Response (200)
None

#### Response Example
{}
```

--------------------------------

### Initialize Hono project with Vercel CLI

Source: https://vercel.com/docs/frameworks/backend/hono

Use the Vercel CLI init command to create a new Hono project. This clones the official Hono example repository into a directory called 'hono' and sets up the project for deployment to Vercel.

```bash
vc init hono
```

--------------------------------

### Handle Deployment Start Webhook Payload

Source: https://vercel.com/docs/integrations/create-integration/deployment-integration-action

JSON payload structure received when a deployment starts an action via the deployment.integration.action.start webhook. Contains installation ID, action slug, resource ID, and deployment ID for processing deployment actions.

```json
{
  "installationId": "icfg_1234567",
  "action": "branch",
  "resourceId": "abc-def-1334",
  "deployment": { "id": "dpl_568301234" }
}
```

--------------------------------

### Define a Fastify Entrypoint with TypeScript

Source: https://vercel.com/docs/frameworks/backend/fastify

This code demonstrates a basic Fastify application entrypoint. It initializes a Fastify server, defines a GET route for the root path, and starts listening on port 3000. This file should be named according to Vercel's entrypoint detection rules, such as `src/index.ts`.

```typescript
import Fastify from 'fastify'

const fastify = Fastify({ logger: true })

fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.listen({ port: 3000 })
```

--------------------------------

### NestJS Application Entrypoint Setup

Source: https://vercel.com/docs/frameworks/backend/nestjs

Create a NestJS application entrypoint file that initializes the NestFactory and starts the server on a specified port. This file must be named according to Vercel's detection patterns (src/main.ts, src/app.ts, etc.) for proper deployment. The application listens on the PORT environment variable or defaults to port 3000.

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

--------------------------------

### Clone and Setup LibreChat Repository

Source: https://vercel.com/docs/ai-gateway/chat-platforms/librechat

Clone the LibreChat repository and initialize the environment configuration. This creates the necessary project structure and copies the example environment file for customization.

```bash
git clone https://github.com/danny-avila/LibreChat.git
cd LibreChat
cp .env.example .env
```

--------------------------------

### GET [INTEGRATION_CALLBACK_URL] (Marketplace Flow)

Source: https://vercel.com/docs/integrations/create-integration/submit-integration

This section describes the query parameters your integration's callback URL will receive when an installation is completed via the Vercel Marketplace.

```APIDOC
## GET [INTEGRATION_CALLBACK_URL]

### Description
This endpoint represents the callback URL of your integration, which receives parameters after a user installs your integration from the Vercel Marketplace.

### Method
GET

### Endpoint
[INTEGRATION_CALLBACK_URL] (This is a placeholder for your integration's configured callback URL)

### Parameters
#### Path Parameters
(None)

#### Query Parameters
- **code** (string) - Required - The authorization code you received.
- **teamId** (string) - Optional - The ID of the team (only if a team is selected).
- **configurationId** (string) - Required - The ID of the configuration.
- **next** (string) - Required - Encoded URL to redirect to, once the installation process on your side is finished.
- **source** (string) - Required - Source defines where the integration was installed from. Value: `marketplace`

#### Request Body
(None)

### Request Example
(N/A - Parameters are received in the URL)

### Response
#### Success Response (200)
(Your integration processes the received parameters and typically redirects the user)

#### Response Example
{
  "code": "jMIukZ1DBCKXHje3X14BCkU0",
  "teamId": "team_LLHUOMOoDlqOp8wPE4kFo9pE",
  "configurationId": "icfg_6uKSUQ359QCbPfECTAY9murE",
  "next": "https%3A%2F%2Fvercel.com%2F...",
  "source": "marketplace"
}
```

--------------------------------

### GET /v1/installations/{installationId}/resources/{resourceId}/plans

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

List billing plans associated with a specific resource within an installation.

```APIDOC
## GET /v1/installations/{installationId}/resources/{resourceId}/plans

### Description
List Billing Plans For Resource

### Method
GET

### Endpoint
/v1/installations/{installationId}/resources/{resourceId}/plans

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
- **resourceId** (string) - Required - The ID of the resource.
```

--------------------------------

### POST /v1/installations/{installationId}/resource-transfer-requests

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

Create a request to transfer resources for an installation.

```APIDOC
## POST /v1/installations/{installationId}/resource-transfer-requests

### Description
Create Resources Transfer Request

### Method
POST

### Endpoint
/v1/installations/{installationId}/resource-transfer-requests

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
```

--------------------------------

### GET /v1/installations/{integrationConfigurationId}/member/{memberId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel

Retrieves member information for a specific installation and member in the Vercel Marketplace.

```APIDOC
## GET /v1/installations/{integrationConfigurationId}/member/{memberId}

### Description
Retrieves member information for a specific installation and member in the Vercel Marketplace.

### Method
GET

### Endpoint
/v1/installations/{integrationConfigurationId}/member/{memberId}

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required - The ID of the integration configuration.
- **memberId** (string) - Required - The ID of the member.

#### Query Parameters
None

#### Request Body
None

### Request Example
{}

### Response
#### Success Response (200)
None

#### Response Example
{}
```

--------------------------------

### Examples of connecting to Vercel Sandbox with options

Source: https://vercel.com/docs/vercel-sandbox/cli-reference

These examples showcase different ways to connect to a Vercel sandbox using `sandbox connect`. They demonstrate connecting to a sandbox by ID, specifying a custom working directory with `--workdir`, and setting environment variables with `--env` while also requesting `sudo` privileges. These variations allow for flexible interaction with the sandbox environment.

```bash
# Connect to an existing sandbox
sandbox connect sb_1234567890

# Connect with a specific working directory
sandbox connect --workdir /app sb_1234567890

# Connect with environment variables and sudo
sandbox connect --env DEBUG=true --sudo sb_1234567890
```

--------------------------------

### Example Project Directory Structure

Source: https://vercel.com/docs/functions/runtimes/python

Illustrates a typical project directory layout with an 'api' directory for Python handlers and a 'data' directory for static files. This structure is used as a reference for demonstrating relative path access in subsequent code examples.

```text
├── README.md
├── api
|  ├── user.py
├── data
|  └── file.txt
└── requirements.txt
```

--------------------------------

### Set up Clawd Bot with Vercel AI Gateway

Source: https://vercel.com/docs/ai-gateway/chat-platforms

Initialize Clawd Bot using the onboarding wizard to configure it with Vercel AI Gateway as the provider. This command installs the daemon and prompts for API key configuration during the interactive setup process.

```bash
clawdbot onboard --install-daemon
# Select "Vercel AI Gateway" as your provider and enter your API key
```

--------------------------------

### POST /installations - Create Installation

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/upsert-installation

This endpoint facilitates the creation of a new installation. The documentation primarily focuses on the expected response structures for various HTTP status codes. Request parameters and body are not specified in the source text.

```APIDOC
## POST /installations

### Description
This endpoint facilitates the creation of a new installation. The documentation primarily focuses on the expected response structures for various HTTP status codes. Request parameters and body are not specified in the source text.

### Method
POST

### Endpoint
/installations

### Parameters
#### Path Parameters
(Not specified in source text)

#### Query Parameters
(Not specified in source text)

#### Request Body
(Not specified in source text)

### Request Example
(Not specified in source text)

### Response
#### Success Response (200) - Installation Created Successfully
- **billingPlan** (object) - Partner-provided billing plan details.
  - **id** (string) - Required. Partner-provided billing plan ID. Example: "pro200"
  - **type** (string) - Required.
  - **name** (string) - Required. Name of the plan. Example: "Hobby"
  - **scope** (string) - Plan scope. To use `installation` level billing plans, Installation-level Billing Plans must be enabled on your integration.
  - **description** (string) - Required. Example: "Use all you want up to 20G"
  - **paymentMethodRequired** (boolean) - Only used if plan type is `subscription`. Set this field to `false` if this plan is completely free.
  - **preauthorizationAmount** (number) - Only used if plan type is `subscription` and `paymentMethodRequired` is `true`. The amount will be used to test if the user's payment method can handle the charge. Example: 10.53 for $10.53 USD. This amount will not be charged to the user, nor will it be reserved for later completion.
  - **initialCharge** (string) - Only used if plan type is `subscription` and `paymentMethodRequired` is `true`. The amount that the partner will invoice immediately at sign-up. Example: 20.00 for $20.00 USD.
  - **minimumAmount** (string) - Optional, ignored unless plan type is `prepayment`. The minimum amount of credits a user can purchase at a time. The value is a decimal string representation of the USD amount, e.g. "4.39" for $4.39 USD as the minumum amount.
  - **maximumAmount** (string) - Optional, ignored unless plan type is `prepayment`. The maximum amount of credits a user can purchase at a time. The value is a decimal string representation of the USD amount, e.g. "86.82" for $86.82 USD as the maximum amount.
  - **maximumAmountAutoPurchasePerPeriod** (string) - Optional, ignored unless plan type is `prepayment`. The maximum amount of credits the system can auto-purchase in any period (month). The value is a decimal string representation of the USD amount, e.g. "86.82" for $86.82 USD as the maximum amount.
  - **cost** (string) - Plan's cost, if available. Only relevant for fixed-cost plans. Example: "$20.00/month"
  - **details** (array of objects) -
    - **label** (string) - Required.
    - **value** (string)
  - **highlightedDetails** (array of objects) -
    - **label** (string) - Required.
    - **value** (string)
  - **quote** (array of objects) -
    - **line** (string) - Required.
    - **amount** (string) - Required.
  - **effectiveDate** (string) - Date/time when the plan becomes effective. Important for billing plan changes.
  - **disabled** (boolean) - If true, the plan is disabled and cannot be selected. Example: `"disabled": true` for "Hobby" plan.
- **notification** (object) -
  - **level** (string) - Required.
  - **title** (string) - Required.
  - **message** (string)
  - **href** (string) - Absolute or SSO URL. SSO URLs start with "sso:".

#### Response Example (200)
```json
{
  "billingPlan": {
    "id": "string",
    "type": "string",
    "name": "string",
    "scope": "string",
    "description": "string",
    "paymentMethodRequired": false,
    "preauthorizationAmount": 0,
    "initialCharge": "string",
    "minimumAmount": "string",
    "maximumAmount": "string",
    "maximumAmountAutoPurchasePerPeriod": "string",
    "cost": "string",
    "details": [
      {
        "label": "string",
        "value": "string"
      }
    ],
    "highlightedDetails": [
      {
        "label": "string",
        "value": "string"
      }
    ],
    "quote": [
      {
        "line": "string",
        "amount": "string"
      }
    ],
    "effectiveDate": "string",
    "disabled": false
  },
  "notification": {
    "level": "string",
    "title": "string",
    "message": "string",
    "href": "string"
  }
}
```

#### Success Response (204) - Installation Created Successfully (No Content)
This response indicates that the installation was created successfully, but there is no content to return.

#### Error Response (400) - Input Validation Failed
- **error** (object) - Required. Error details.
  - **code** (string) - Required.
  - **message** (string) - Required. System error message.
  - **user** (object) - User-facing error details.
    - **message** (string) - User-facing error message, if applicable.
    - **url** (string) - URL to a user-facing help article, or a dashboard page for resolution, if applicable.
  - **fields** (array of objects) -
    - **key** (string) - Required.
    - **message** (string)

#### Response Example (400)
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "user": {
      "message": "string",
      "url": "string"
    },
    "fields": [
      {
        "key": "string",
        "message": "string"
      }
    ]
  }
}
```

#### Error Response (403) - Operation Not Allowed
- **error** (object) - Required. Error details.
  - **code** (string) - Required.
  - **message** (string) - Required. System error message.
  - **user** (object) - User-facing error details.
    - **message** (string) - User-facing error message, if applicable.
    - **url** (string) - URL to a user-facing help article, or a dashboard page for resolution, if applicable.

#### Response Example (403)
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "user": {
      "message": "string",
      "url": "string"
    }
  }
}
```

#### Error Response (409) - Conflict
- **error** (object) - Required. Error details.
  - **code** (string) - Required.
  - **message** (string) - Required. System error message.
  - **user** (object) - User-facing error details.
    - **message** (string) - User-facing error message, if applicable.
    - **url** (string) - URL to a user-facing help article, or a dashboard page for resolution, if applicable.

#### Response Example (409)
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "user": {
      "message": "string",
      "url": "string"
    }
  }
}
```
```

--------------------------------

### GET /v1/installations/{installationId}/resources/{resourceId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/get-resource

Retrieves a specific resource by its ID for a given Vercel installation. This endpoint allows fetching details of a resource associated with an integration.

```APIDOC
## GET /v1/installations/{installationId}/resources/{resourceId}

### Description
Retrieves a specific resource by its ID for a given Vercel installation. This endpoint allows fetching details of a resource associated with an integration.

### Method
GET

### Endpoint
/v1/installations/{installationId}/resources/{resourceId}

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the Vercel installation.
- **resourceId** (string) - Required - The ID of the resource to retrieve.

#### Query Parameters
(None)

#### Header Parameters
- **X-Vercel-Auth** (string) - Optional - The auth style used in the request (system, user, etc).

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
(Response structure not detailed in documentation)

#### Response Example
{}
```

--------------------------------

### Example Projects Array in Vercel Configuration JSON

Source: https://vercel.com/docs/rest-api/reference/endpoints/integrations/get-configurations-for-the-authenticated-user-or-team

This snippet shows an example of the `projects` array within a Vercel integration configuration. It demonstrates how project IDs are listed when a configuration is limited to specific projects. If this array is not defined, the configuration has full access to all projects.

```json
["prj_xQxbutw1HpL6HLYPAzt5h75m8NjO"]
```

--------------------------------

### POST /v1/messages (Anthropic-Compatible)

Source: https://vercel.com/docs/ai-gateway/getting-started

This endpoint provides an Anthropic-compatible API for creating messages with AI models, supporting features like streaming and multi-turn conversations, routed through the Vercel AI Gateway.

```APIDOC
## POST /v1/messages

### Description
This endpoint provides an Anthropic-compatible API for creating messages with AI models, supporting features like streaming and multi-turn conversations, routed through the Vercel AI Gateway.

### Method
POST

### Endpoint
/v1/messages

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
- **model** (string) - Required - The ID of the model to use (e.g., `anthropic/claude-sonnet-4.5`).
- **max_tokens** (integer) - Required - The maximum number of tokens to generate.
- **messages** (array of objects) - Required - A list of messages comprising the conversation so far.
  - **role** (string) - Required - The role of the author of this message (`user`, `assistant`).
  - **content** (string) - Required - The content of the message.

### Request Example
```json
{
  "model": "anthropic/claude-sonnet-4.5",
  "max_tokens": 1024,
  "messages": [
    {
      "role": "user",
      "content": "Invent a new holiday and describe its traditions."
    }
  ]
}
```

### Response
#### Success Response (200)
- **content** (array of objects) - A list of content blocks generated by the model.
  - **text** (string) - The text content of the message.

#### Response Example
```json
{
  "id": "msg_xxxxxxxxxxxxxxxxxxxx",
  "type": "message",
  "role": "assistant",
  "model": "anthropic/claude-sonnet-4.5",
  "content": [
    {
      "type": "text",
      "text": "Introducing 'Luminary Day'..."
    }
  ],
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "usage": {
    "input_tokens": 15,
    "output_tokens": 20
  }
}
```
```

--------------------------------

### Install Split and Vercel Edge Config SDKs

Source: https://vercel.com/docs/edge-config/edge-config-integrations/split-edge-config

This snippet provides commands to install necessary SDKs for integrating Split feature flags with Vercel Edge Config. It includes Split's Browser SDK, Vercel integration utilities, and Vercel's Edge Config SDK. Choose the command based on your preferred package manager (pnpm, yarn, npm, or bun).

```bash
pnpm i @splitsoftware/splitio-browserjs @splitsoftware/vercel-integration-utils @vercel/edge-config
```

```bash
yarn i @splitsoftware/splitio-browserjs @splitsoftware/vercel-integration-utils @vercel/edge-config
```

```bash
npm i @splitsoftware/splitio-browserjs @splitsoftware/vercel-integration-utils @vercel/edge-config
```

```bash
bun i @splitsoftware/splitio-browserjs @splitsoftware/vercel-integration-utils @vercel/edge-config
```

--------------------------------

### Initialize a new xmcp project using Vercel CLI

Source: https://vercel.com/docs/frameworks/backend/xmcp

This Vercel CLI command scaffolds a new xmcp project by cloning the official example repository. It creates a new directory named 'xmcp' containing the basic project structure, ready for development.

```bash
vc init xmcp
```

--------------------------------

### Install Vercel CLI for Project Management

Source: https://vercel.com/docs/analytics/quickstart

Install the Vercel Command Line Interface (CLI) using your preferred package manager. The Vercel CLI is essential for deploying and managing your projects directly from your terminal. Choose between pnpm, yarn, npm, or bun for installation.

```bash
pnpm i vercel
```

```bash
yarn i vercel
```

```bash
npm i vercel
```

```bash
bun i vercel
```

--------------------------------

### Start Local Development Server with Vercel CLI

Source: https://vercel.com/docs/edge-config/integrations/split-edge-config

This command initiates a local development server using the Vercel CLI. It's essential for testing your application and API routes, including those that interact with Split.io and Edge Config, in a local environment.

```bash
vercel dev
```

--------------------------------

### Deploy cron job to production with Vercel CLI

Source: https://vercel.com/docs/cron-jobs/quickstart

Deploy the project to production using the Vercel CLI command. The --prod flag ensures deployment to the production environment where cron jobs are active. Preview deployments do not execute cron jobs.

```bash
vercel deploy --prod
```

--------------------------------

### Install and Configure Claude Code with Vercel MCP

Source: https://vercel.com/docs/ai-resources/vercel-mcp

Install Claude Code CLI tool and add Vercel MCP connections for general or project-specific access. Supports multiple named connections for different projects. Authenticate using the /mcp command after starting Claude.

```bash
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Navigate to your project
cd your-awesome-project

# Add Vercel MCP (general access)
claude mcp add --transport http vercel https://mcp.vercel.com

# Add Vercel MCP (project-specific access)
claude mcp add --transport http vercel-awesome-ai https://mcp.vercel.com/my-team/my-awesome-project

# Start coding with Claude
claude

# Authenticate the MCP tools by typing /mcp
/mcp
```

--------------------------------

### POST /v1/installations/{installationId}/billing/provision

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

Provision a new purchase for an installation.

```APIDOC
## POST /v1/installations/{installationId}/billing/provision

### Description
Provision Purchase

### Method
POST

### Endpoint
/v1/installations/{installationId}/billing/provision

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
```

--------------------------------

### Install and Configure Codex CLI with Vercel MCP

Source: https://vercel.com/docs/ai-resources/vercel-mcp

Install OpenAI's Codex CLI local coding agent and add Vercel MCP server. Codex automatically detects OAuth support and opens a browser for authorization during setup.

```bash
# Install Codex
npm i -g @openai/codex

# Add Vercel MCP
codex mcp add vercel --url https://mcp.vercel.com

# Start Codex
codex
```

--------------------------------

### GET /v1/installations/{installationId}/plans

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/list-billing-plans-for-installation

Returns the set of billing plans available to a specific Installation. This endpoint uses System Authentication with OpenID Connect Protocol (OIDC) and requires a valid JWT token signed by Vercel.

```APIDOC
## GET /v1/installations/{installationId}/plans

### Description
Returns the set of billing plans available to a specific Installation. This endpoint requires System Authentication using OpenID Connect Protocol (OIDC) with a JWT token signed by Vercel's private key.

### Method
GET

### Endpoint
```
GET /v1/installations/{installationId}/plans
```

### Authentication
**System Authentication (OIDC)**

This endpoint uses OpenID Connect Protocol (OIDC). Vercel sends a JSON Web Token (JWT) signed with Vercel's private key and verifiable using Vercel's public JSON Web Key Sets (JWKS).

**JWT Token Claims Schema:**
- **iss** (string) - Required - Issuer: "https://marketplace.vercel.com"
- **sub** (string) - Required - Subject: Account or Team ID (matches `/^account:[0-9a-fA-F]+$/`), possibly null
- **aud** (string) - Required - Audience: The integration ID (e.g., "oac_9f4YG9JFjgKkRlxoaaGG0y05")
- **type** (string) - Required - Token type: "access_token" or "id_token"
- **installation_id** (string) - Required - The ID of the installation (e.g., "icfg_9bceb8ccT32d3U417ezb5c8p")
- **account_id** (string) - Required - The account ID

### Parameters

#### Path Parameters
- **installationId** (string) - Required - The ID of the installation for which to list billing plans

#### Header Parameters
- **X-Vercel-Auth** (string) - Optional - The auth style used in the request (system, user, etc)

### Request Example
```
GET /v1/installations/icfg_9bceb8ccT32d3U417ezb5c8p/plans HTTP/1.1
Host: marketplace.vercel.com
Authorization: Bearer <JWT_TOKEN>
X-Vercel-Auth: system
```

### Response

#### Success Response (200)
Returns an array of billing plans available to the specified installation.

#### Response Example
```json
{
  "plans": [
    {
      "id": "plan_123",
      "name": "Basic Plan",
      "description": "Basic billing plan",
      "price": 0
    },
    {
      "id": "plan_456",
      "name": "Pro Plan",
      "description": "Professional billing plan",
      "price": 29
    }
  ]
}
```
```

--------------------------------

### GET /api/hello - Basic Function Handler

Source: https://vercel.com/docs/functions/functions-api-reference

A simple GET function handler that returns a basic text response. This example demonstrates the fundamental structure of a Vercel Function using the Web Handler pattern with a Request parameter.

```APIDOC
## GET /api/hello

### Description
A basic function handler that responds to GET requests and returns a simple text response from Vercel.

### Method
GET

### Endpoint
/api/hello

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
```
GET /api/hello HTTP/1.1
Host: your-domain.vercel.app
```

### Response
#### Success Response (200)
- **body** (string) - Plain text response message

#### Response Example
```
Hello from Vercel!
```

### Implementation (Next.js App Router)
```typescript
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```

### Implementation (Other Frameworks)
```typescript
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```
```

--------------------------------

### Install Split.io and Vercel Edge Config Dependencies

Source: https://vercel.com/docs/edge-config/integrations/split-edge-config

This command installs the necessary npm packages for integrating Split.io with Vercel Edge Config. It includes the Split.io browser SDK, Vercel integration utilities, and the Vercel Edge Config client, typically used in a Bun project.

```bash
bun add @splitsoftware/splitio-browserjs @splitsoftware/vercel-integration-utils @vercel/edge-config
```

--------------------------------

### Update Vercel Installation Notification

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api

This snippet demonstrates how to update an installation's notification field using the Vercel API's PATCH /v1/installations/{installationId} endpoint. It defines the Notification interface, provides an asynchronous function to perform the update, and includes an example of setting a notification with a regular URL. It also shows the expected JSON response format and an example of setting a notification with an SSO-enabled URL.

```ts
interface Notification {
  title: string;
  message: string;
  href?: string;
  type?: 'info' | 'warning' | 'error';
}

async function updateInstallationNotification(
  installationId: string,
  notification: Notification
) {
  const response = await fetch(
    `https://api.vercel.com/v1/installations/${installationId}`,
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notification }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to update notification: ${response.statusText}`);
  }

  return response.json();
}

// Example usage with regular URL:
await updateInstallationNotification('icfg_abc123', {
  title: 'Action Required',
  message: 'Please complete your account setup',
  href: 'https://your-integration.com/setup',
  type: 'warning',
});

// Or with SSO-enabled URL for authenticated access:
// href: 'sso:https://your-integration.com/setup',
```

```json
{
  "id": "icfg_abc123",
  "notification": {
    "title": "Action Required",
    "message": "Please complete your account setup",
    "href": "https://your-integration.com/setup",
    "type": "warning"
  }
}
```

```ts
await updateInstallationNotification('icfg_abc123', {
  title: 'Review your usage',
  message: 'Your monthly usage report is ready',
  href: 'sso:https://your-integration.com/dashboard/usage',
  type: 'info',
});
```

--------------------------------

### Example Output: Git Remote Repositories (Bash)

Source: https://vercel.com/docs/integrations/ecommerce/bigcommerce

Illustrates the expected output when verifying remote repositories, showing fetch and push URLs for both the 'origin' (your fork) and 'upstream' (BigCommerce's official repository).

```bash
origin    git@github.com:<YOUR_GITHUB_USERNAME><YOUR_FORK_NAME>.git (fetch)
origin    git@github.com:<YOUR_GITHUB_USERNAME>/<YOUR_FORK_NAME>.git (push)
upstream  git@github.com:bigcommerce/catalyst.git (fetch)
upstream  git@github.com:bigcommerce/catalyst.git (push)
```

--------------------------------

### Configure AI Gateway API key in .env.local

Source: https://vercel.com/docs/ai-gateway/getting-started

This snippet demonstrates how to securely store your Vercel AI Gateway API key. By creating a `.env.local` file and assigning the key to `AI_GATEWAY_API_KEY`, your application can access it as an environment variable for authentication.

```bash
AI_GATEWAY_API_KEY=your_ai_gateway_api_key
```

--------------------------------

### Install AI SDK Gateway Package using pnpm

Source: https://vercel.com/docs/ai-gateway/models-and-providers

This command installs the `@ai-sdk/gateway` package, which is required to use AI Gateway providers with the AI SDK. It ensures the necessary dependencies are available for integrating AI Gateway functionalities.

```bash
pnpm install @ai-sdk/gateway
```

--------------------------------

### Start Catalyst Development Server (Bash)

Source: https://vercel.com/docs/integrations/ecommerce/bigcommerce

Starts the local development server for your Catalyst project. Once running, your storefront will be accessible in your web browser at `http://localhost:3000`.

```bash
pnpm dev
```

--------------------------------

### Initialize Framework with Custom Directory Name

Source: https://vercel.com/docs/cli/init

Initialize a specific Vercel framework example and rename the local directory in a single command. Accepts both the framework name and the desired directory name as arguments.

```bash
vercel init [framework-name] [new-local-directory-name]
```

--------------------------------

### deployment.integration.action.start Event

Source: https://vercel.com/docs/webhooks/webhooks-api

Occurs when a deployment starts an integration deployment action.

```APIDOC
## deployment.integration.action.start

### Description
Occurs when a deployment starts an integration deployment action.

### Method
POST

### Endpoint
/webhooks/vercel/events

### Parameters
#### Request Body
- **payload.configuration.id** (string) - Required - The ID of the integration installation.
- **payload.installationId** (string) - Required - The ID of the integration installation (same as `configuration.id`).
- **payload.resourceId** (string) - Required - The ID of the integration resource for which the action is started.
- **payload.action** (string) - Required - The action slug, declared by the integration.
- **payload.deployment.id** (string) - Required - The ID of the deployment.

### Request Example
```json
{
  "payload": {
    "configuration": {
      "id": "int_xxxxxxxxxxxxxxxxx"
    },
    "installationId": "int_xxxxxxxxxxxxxxxxx",
    "resourceId": "res_xxxxxxxxxxxxxxxxx",
    "action": "my-integration-action",
    "deployment": {
      "id": "dpl_xxxxxxxxxxxxxxxxx"
    }
  }
}
```

### Response
#### Success Response (200)
- Event successfully received.

#### Response Example
```json
{}
```
```

--------------------------------

### Vercel Installation Billing Plan 200 Response JSON

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/get-installation

Successful HTTP 200 response structure for Vercel installation billing plans. Contains billingPlan object with configuration details including plan type, pricing, payment requirements, and optional details/quotes. Also includes optional notification object for user messaging. Supports subscription, prepayment, and fixed-cost plan types with various optional fields depending on plan type.

```json
{
  "billingPlan": {
    "id": "string",
    "type": "string",
    "name": "string",
    "scope": "string",
    "description": "string",
    "paymentMethodRequired": "boolean",
    "preauthorizationAmount": "number",
    "initialCharge": "string",
    "minimumAmount": "string",
    "maximumAmount": "string",
    "maximumAmountAutoPurchasePerPeriod": "string",
    "cost": "string",
    "details": [
      {
        "label": "string",
        "value": "string"
      }
    ],
    "highlightedDetails": [
      {
        "label": "string",
        "value": "string"
      }
    ],
    "quote": [
      {
        "line": "string",
        "amount": "string"
      }
    ],
    "effectiveDate": "string",
    "disabled": "boolean"
  },
  "notification": {
    "level": "string",
    "title": "string",
    "message": "string",
    "href": "string"
  }
}
```

--------------------------------

### Install Vercel CLI with bun

Source: https://vercel.com/docs/deployments/environments

Install the Vercel Command Line Interface globally using bun package manager as an alternative to npm.

```bash
bun i -g vercel
```

--------------------------------

### Initialize LaunchDarkly with Vercel Edge Config in Middleware

Source: https://vercel.com/docs/edge-config/edge-config-integrations/launchdarkly-edge-config

Sets up LaunchDarkly client with Vercel Edge Config integration and implements middleware to conditionally route requests based on feature flag variations. The middleware initializes the LaunchDarkly client, evaluates a feature flag for the specified context, and redirects to an alternative homepage if the experimental flag is enabled.

```javascript
import { init } from '@launchdarkly/vercel-server-sdk'
import { createClient } from '@vercel/edge-config'

const edgeConfigClient = createClient(process.env.EDGE_CONFIG);
const launchDarklyClient = init("YOUR CLIENT-SIDE ID", edgeConfigClient);

export const config = {
  // Only run the middleware on the dashboard route
  matcher: '/homepage',
};

export default function middleware(request) {
  await launchDarklyClient.initFromServerIfNeeded();
  const launchDarklyContext = { kind: 'org', key: 'my-org-key' };
  const showExperimentalHomepage = await launchDarklyClient.variation(
    'experimental-homepage',
    launchDarklyContext,
    true
  );

  if(showExperimentalHomepage) {
    const url = new URL(request.url);
    url.pathname = '/new-homepage';
    return Response.redirect(url);
  }
}
```

--------------------------------

### GET /v1/integrations/configuration/{id}

Source: https://vercel.com/docs/rest-api/vercel-api-integrations

Retrieve a specific integration configuration by ID. This endpoint allows read access to a single integration installation.

```APIDOC
## GET /v1/integrations/configuration/{id}\n\n### Description\nRetrieve a specific integration configuration by ID. This endpoint allows read access to a single integration installation.\n\n### Method\nGET\n\n### Endpoint\n/v1/integrations/configuration/{id}\n\n### Parameters\n#### Path Parameters\n- **id** (string) - Required - The ID of the integration configuration.\n\n#### Query Parameters\n(No query parameters specified)\n\n#### Request Body\n(No request body specified)\n\n### Request Example\n{}\n\n### Response\n#### Success Response (200)\n(No success response details specified)\n\n#### Response Example\n{}
```

--------------------------------

### Install @vercel/microfrontends Package in Microfrontend Applications

Source: https://vercel.com/docs/microfrontends/quickstart

Install the `@vercel/microfrontends` package in the directory of each microfrontend application. This package provides the necessary utilities for Vercel microfrontends integration.

```bash
pnpm i @vercel/microfrontends
```

```bash
yarn i @vercel/microfrontends
```

```bash
npm i @vercel/microfrontends
```

```bash
bun i @vercel/microfrontends
```

--------------------------------

### Configure Prerender Settings in JSON

Source: https://vercel.com/docs/build-output-api/primitives

Example prerender configuration file (example.prerender-config.json) demonstrating practical usage of configuration properties. Sets a 60-second expiration, assigns group 1 for synchronized re-validation, includes a bypass token for draft mode, specifies a fallback HTML file, and restricts caching to the 'id' query parameter.

```json
{
  "expiration": 60,
  "group": 1,
  "bypassToken": "03326da8bea31b919fa3a31c85747ddc",
  "fallback": "example.prerender-fallback.html",
  "allowQuery": ["id"]
}
```

--------------------------------

### Retrieve Vercel Installation Team Member Information (TypeScript)

Source: https://vercel.com/docs/integrations/marketplace-api

This TypeScript function demonstrates how to fetch details for a specific team member within a Vercel installation using a GET request to the `/v1/installations/{installationId}/member/{memberId}` endpoint. It requires an `installationId` and `memberId` as input and returns `MemberInfo` or throws an error on failure.

```typescript
async function getMemberInfo(
  installationId: string,
  memberId: string
): Promise<MemberInfo> {
  const response = await fetch(
    `https://api.vercel.com/v1/installations/${installationId}/member/${memberId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );
 
  if (!response.ok) {
    throw new Error(`Failed to get member info: ${response.statusText}`);
  }
 
  return response.json();
}
```

--------------------------------

### Example Scopes Array in Vercel Configuration JSON

Source: https://vercel.com/docs/rest-api/reference/endpoints/integrations/get-configurations-for-the-authenticated-user-or-team

This snippet illustrates an example of the `scopes` array in a Vercel integration configuration. It specifies the resources and permissions that the configuration is allowed to access, such as reading project data or managing log drains.

```json
["read:project", "read-write:log-drain"]
```

--------------------------------

### Retrieve Integration Resources via HTTP GET

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resources

This snippet illustrates the HTTP GET method and endpoint path used to retrieve all resources for a specific Vercel integration installation. The `{integrationConfigurationId}` placeholder must be replaced with the actual ID of the integration configuration.

```http
GET /v1/installations/{integrationConfigurationId}/resources
```

--------------------------------

### Sandbox Snapshot Example - Vercel CLI

Source: https://vercel.com/docs/vercel-sandbox/cli-reference

Practical example demonstrating how to create a snapshot of a running sandbox with the stop flag to halt execution during the snapshot process.

```bash
sandbox snapshot sb_1234567890 --stop
```

--------------------------------

### Filter Monitoring Data with Where Clause in Vercel Observability Query

Source: https://vercel.com/docs/observability/monitoring/quickstart

This snippet demonstrates how to use the 'Where' clause in Vercel's Observability Query to filter monitoring data. It filters requests for a specific host ('my-site.com') and request paths starting with '/posts', using the wildcard character '%' to match any sequence of characters.

```Monitoring Query Language
host = 'my-site.com' and like(request_path, '/posts%')
```

--------------------------------

### Complete Example - Blog Caching with Synchronous RuntimeCache

Source: https://vercel.com/docs/functions/functions-api-reference/vercel-sdk-python

Full example demonstrating how to use RuntimeCache to cache blog data from an external API with TTL and tag-based invalidation in a FastAPI application.

```APIDOC
## EXAMPLE Synchronous Blog Caching

### Description
Complete example showing how to cache blog data with TTL and tags, then invalidate using expire_tag.

### Implementation
```python
import requests
from fastapi import FastAPI, Request
from vercel.functions import RuntimeCache

app = FastAPI()
cache = RuntimeCache()

@app.get("/blog")
def get_blog(request: Request):
    key = "blog"
    value = cache.get(key)
    if value is not None:
        return value

    res = requests.get("https://api.vercel.app/blog")
    origin_value = res.json()
    cache.set(key, origin_value, {"ttl": 3600, "tags": ["blog"]})

    return origin_value

@app.get("/expire-blog")
def expire_blog(request: Request):
    cache.expire_tag("blog")
    return {"ok": True}
```

### Usage Flow
1. Client calls GET /blog
2. Check if "blog" key exists in cache
3. If cached, return immediately
4. If not cached, fetch from external API
5. Store in cache with 3600 second TTL and "blog" tag
6. Return blog data
7. Call GET /expire-blog to invalidate all "blog" tagged entries

### Response Example
```python
# GET /blog response
[
  {"id": 1, "title": "Post 1", "content": "..."},
  {"id": 2, "title": "Post 2", "content": "..."}
]

# GET /expire-blog response
{"ok": true}
```
```

--------------------------------

### POST /v1/installations/{integrationConfigurationId}/billing/balance

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/submit-prepayment-balances

Sends the prepayment balances. The partner should do this at least once a day and ideally once per hour. Use the `credentials.access_token` we provided in the Upsert Installation body to authorize this request.

```APIDOC
## POST /v1/installations/{integrationConfigurationId}/billing/balance

### Description
Sends the prepayment balances. The partner should do this at least once a day and ideally once per hour. Use the `credentials.access_token` we provided in the Upsert Installation body to authorize this request.

### Method
POST

### Endpoint
/v1/installations/{integrationConfigurationId}/billing/balance

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required -

#### Query Parameters
(None)

#### Request Body
```json
{
  "timestamp": "string",
  "balances": [
    {
      "resourceId": "string",
      "credit": "string",
      "nameLabel": "string",
      "currencyValueInCents": "number"
    }
  ]
}
```
- **timestamp** (string) - Required - Server time of your integration, used to determine the most recent data for race conditions & updates. Only the latest usage data for a given day, week, and month will be kept.
- **balances** (array of objects) - Required - An array of balance objects.
  - **resourceId** (string) - Optional - Partner's resource ID, exclude if credits are tied to the installation and not an individual resource.
  - **credit** (string) - Optional - A human-readable description of the credits the user currently has, e.g. "2,000 Tokens".
  - **nameLabel** (string) - Optional - The name of the credits, for display purposes, e.g. "Tokens".
  - **currencyValueInCents** (number) - Required - The dollar value of the credit balance, in USD and provided in cents, which is used to trigger automatic purchase thresholds.

### Request Example
```json
{
  "timestamp": "2023-10-27T10:00:00Z",
  "balances": [
    {
      "resourceId": "user-123",
      "credit": "2,000 Tokens",
      "nameLabel": "Tokens",
      "currencyValueInCents": 20000
    }
  ]
}
```

### Response
#### Success Response (201)
- No content

#### Response Example
(No content)

#### Error Response (400)
- **Error** (string) - One of the provided values in the request body is invalid.
- **Error** (string) - One of the provided values in the request query is invalid.

#### Error Response (401)
- **Error** (string) - The request is not authorized.

#### Error Response (403)
- **Error** (string) - You do not have permission to access this resource.

#### Error Response (404)
- **Error** (string) - Success (as per source, though unusual for 404)
```

--------------------------------

### POST /v1/installations/{integrationConfigurationId}/billing/balance

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel

Submits prepayment balances for a specific installation in the Vercel Marketplace.

```APIDOC
## POST /v1/installations/{integrationConfigurationId}/billing/balance

### Description
Submits prepayment balances for a specific installation in the Vercel Marketplace.

### Method
POST

### Endpoint
/v1/installations/{integrationConfigurationId}/billing/balance

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required - The ID of the integration configuration.

#### Query Parameters
None

#### Request Body
None

### Request Example
{}

### Response
#### Success Response (200)
None

#### Response Example
{}
```

--------------------------------

### Building Locally and Deploying with Prebuilt and Archive Options (Bash)

Source: https://vercel.com/docs/cli/deploy

Shows a two-step process: first building the project locally using `vercel build`, then deploying the generated output using `vercel deploy`. The `--prebuilt` flag is used, along with `--archive=tgz` to compress the build output for efficient upload.

```bash
# Build the project locally
vercel build

# Deploy the pre-built project, archiving it as a .tgz file
vercel deploy --prebuilt --archive=tgz
```

--------------------------------

### Install Pre-installed Packages on Vercel Build Image

Source: https://vercel.com/docs/deployments/build-image

This command demonstrates how to install all the packages that are typically pre-installed in the Vercel build image, using the `dnf` package manager. It ensures that a comprehensive set of development tools and libraries are available for your build process.

```terminal
dnf alsa-lib at-spi2-atk atk autoconf automake brotli bsdtar bzip2 bzip2-devel cups-libs expat-devel gcc gcc-c++ git glib2-devel glibc-devel gtk3 gzip ImageMagick-devel iproute java-11-amazon-corretto-headless libXScrnSaver libXcomposite libXcursor libXi libXrandr libXtst libffi-devel libglvnd-glx libicu libjpeg libjpeg-devel libpng libpng-devel libstdc++ libtool libwebp-tools libzstd-devel make nasm ncurses-libs ncurses-compat-libs openssl openssl-devel openssl-libs pango procps perl readline-devel ruby-devel strace sysstat tar unzip which zlib-devel zstd --yes
```

--------------------------------

### System Auth OIDC Token Claims Schema

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/get-installation

JSON schema defining the structure and required claims for OIDC JWT tokens used in system authentication. Includes issuer, subject (account/team), audience (integration ID), token type, installation ID, and account ID fields.

```json
{
  "type": "object",
  "properties": {
    "iss": {
      "type": "string",
      "enum": [
        "https://marketplace.vercel.com"
      ]
    },
    "sub": {
      "type": "string",
      "description": "Denotes the Account (or Team) who is making the change (matches `/^account:[0-9a-fA-F]+$/`), possibly null"
    },
    "aud": {
      "type": "string",
      "description": "The integration ID. Example: \"oac_9f4YG9JFjgKkRlxoaaGG0y05\""
    },
    "type": {
      "type": "string",
      "enum": [
        "access_token",
        "id_token"
      ],
      "description": "The type of the token: id_token or access_token."
    },
    "installation_id": {
      "type": "string",
      "nullable": true,
      "description": "The ID of the installation. Example: \"icfg_9bceb8ccT32d3U417ezb5c8p\""
    },
    "account_id": {
      "type": "string"
    }
  },
  "required": [
    "iss",
    "sub",
    "aud",
    "installation_id",
    "account_id"
  ],
  "additionalProperties": false
}
```

--------------------------------

### Implement Vercel Blob Upload API Route in Next.js Pages Router (TypeScript/JavaScript)

Source: https://vercel.com/docs/vercel-blob/client-upload

This snippet provides examples for setting up a Next.js API route (pages/api/avatar/upload) using the Pages Router to manage file uploads to Vercel Blob storage. It uses handleUpload from @vercel/blob/client to generate client tokens with specified upload policies and execute custom logic upon upload completion. The route returns a JSON response with the upload details or an error.

```typescript
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import type { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const body = request.body as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname,
        /* clientPayload */
      ) => {
        // Generate a client token for the browser to upload the file
        // Make sure to authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          addRandomSuffix: true,
          // callbackUrl: 'https://example.com/api/avatar/upload',
          // optional, `callbackUrl` is automatically computed when hosted on Vercel
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            // you could pass a user id from auth, or a value from clientPayload
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Called by Vercel API on client upload completion
        // Use tools like ngrok if you want this to work locally

        console.log('blob upload completed', blob, tokenPayload);

        try {
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          throw new Error('Could not update user');
        }
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    // The webhook will retry 5 times waiting for a 200
    return response.status(400).json({ error: (error as Error).message });
  }
}
```

```javascript
import { handleUpload } from '@vercel/blob/client';

export default async function handler(request, response) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        // Generate a client token for the browser to upload the file
        // Make sure to authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          addRandomSuffix: true,
          // callbackUrl: 'https://example.com/api/avatar/upload',
          // optional, `callbackUrl` is automatically computed when hosted on Vercel
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            // you could pass a user id from auth, or a value from clientPayload
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Called by Vercel API on client upload completion
        // Use tools like ngrok if you want this to work locally

        console.log('blob upload completed', blob, tokenPayload);

        try {
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          throw new Error('Could not update user');
        }
      },
    });

    return response.status(200).json(jsonResponse);
  } catch (error) {
    // The webhook will retry 5 times waiting for a 200
    return response.status(400).json({ error: error.message });
  }
}
```

--------------------------------

### Execute Turborepo Build Command on Vercel

Source: https://vercel.com/docs/monorepos/turborepo

This snippet demonstrates how to run the `turbo build` command when deploying on Vercel. Vercel automatically provides a global `turbo` installation, inferring the appropriate filter based on the project's root directory, simplifying build commands for monorepos.

```bash
turbo build
```

--------------------------------

### Vercel Get Teams API JSON Response Example

Source: https://vercel.com/docs/rest-api/reference/endpoints/teams/list-all-teams

This JSON object illustrates the structure of the data returned by the Vercel `teams.getTeams` API endpoint. It contains an array of `team` objects, each detailing properties like `id`, `name`, `membership` status, various configuration settings, and pagination metadata. This example provides a comprehensive view of the expected output.

```json
{
  "teams": [
    {
      "creatorId": "R6efeCJQ2HKXywuasPDc0fOWB",
      "updatedAt": 1611796915677,
      "description": "Our mission is to make cloud computing accessible to everyone.",
      "stagingPrefix": "<string>",
      "id": "team_nllPyCtREAqxxdyFKbbMDlxd",
      "slug": "my-team",
      "name": "My Team",
      "avatar": "6eb07268bcfadd309905ffb1579354084c24655c",
      "membership": {
        "confirmed": true,
        "role": "OWNER",
        "createdAt": 123,
        "created": 123,
        "uid": "<string>",
        "entitlements": [
          {
            "entitlement": "<string>"
          }
        ],
        "teamId": "<string>",
        "accessRequestedAt": 123,
        "teamRoles": [
          "OWNER"
        ],
        "teamPermissions": [
          "IntegrationManager"
        ],
        "joinedFrom": {
          "origin": "link",
          "commitId": "<string>",          "repoId": "<string>",
          "repoPath": "<string>",
          "gitUserId": "<string>",
          "gitUserLogin": "<string>",
          "ssoUserId": "<string>",
          "ssoConnectedAt": 123,
          "idpUserId": "<string>",
          "dsyncUserId": "<string>",
          "dsyncConnectedAt": 123
        }
      },
      "createdAt": 1630748523395,
      "connect": {
        "enabled": false
      },
      "emailDomain": "example.com",
      "saml": {
        "enforced": false,
        "connection": {
          "type": "OktaSAML",
          "status": "linked",
          "state": "active",
          "connectedAt": 1611796915677,
          "lastReceivedWebhookEvent": 1611796915677,
          "lastSyncedAt": 1611796915677,
          "syncState": "SETUP"
        },
        "directory": {
          "type": "OktaSAML",
          "state": "active",
          "connectedAt": 1611796915677,
          "lastReceivedWebhookEvent": 1611796915677,
          "lastSyncedAt": 1611796915677,
          "syncState": "SETUP"
        },
        "defaultRedirectUri": "vercel.com",
        "roles": {}
      },
      "inviteCode": "hasihf9e89",
      "defaultRoles": {
        "teamRoles": [
          "OWNER"
        ],
        "teamPermissions": [
          "IntegrationManager"
        ]
      },
      "resourceConfig": {
        "concurrentBuilds": 123,
        "elasticConcurrencyEnabled": false,
        "edgeConfigSize": 123,
        "edgeConfigs": 123,
        "kvDatabases": 123,
        "blobStores": 123,
        "postgresDatabases": 123,
        "buildEntitlements": {
          "enhancedBuilds": false
        },
        "buildMachine": {
          "default": "standard"
        }
      },
      "previewDeploymentSuffix": "example.dev",
      "platform": true,
      "disableHardAutoBlocks": 123,
      "remoteCaching": {
        "enabled": false
      },
      "defaultDeploymentProtection": {
        "passwordProtection": {
          "deploymentType": "<string>"
        },
        "ssoProtection": {
          "deploymentType": "<string>"
        }
      },
      "defaultExpirationSettings": {
        "expirationDays": 123,
        "expirationDaysProduction": 123,
        "expirationDaysCanceled": 123,
        "expirationDaysErrored": 123,
        "deploymentsToKeep": 123
      },
      "enablePreviewFeedback": "default",
      "enableProductionFeedback": "default",
      "sensitiveEnvironmentVariablePolicy": "default",
      "hideIpAddresses": false,
      "hideIpAddressesInLogDrains": false,
      "ipBuckets": [
        {
          "bucket": "<string>",
          "supportUntil": 123
        }
      ],
      "strictDeploymentProtectionSettings": {
        "enabled": false,
        "updatedAt": 123
      },
      "nsnbConfig": {
        "preference": "auto-approval"
      }
    }
  ],
  "pagination": {
    "count": 20,
    "next": 1540095775951,
    "prev": 1540095775951
  }
}
```

--------------------------------

### Get Member API Endpoint Request

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-member

HTTP GET request to retrieve member information from a Vercel integration installation. Requires integrationConfigurationId and memberId path parameters, and uses bearer token authentication. Returns member role and details on success (200 response).

```http
GET /v1/installations/{integrationConfigurationId}/member/{memberId}
```

--------------------------------

### Quick Start with OpenAI and Anthropic Python SDKs

Source: https://vercel.com/docs/ai-gateway/sdks-and-apis/python

These examples demonstrate how to make a basic chat completion request using the OpenAI and Anthropic Python SDKs with the Vercel AI Gateway. They show how to configure the client with an API key and the AI Gateway base URL, then send a simple message and print the response.

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

response = client.chat.completions.create(
    model='anthropic/claude-sonnet-4.5',
    messages=[
        {'role': 'user', 'content': 'Explain quantum computing in one paragraph.'}
    ]
)

print(response.choices[0].message.content)
```

```python
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh'
)

message = client.messages.create(
    model='anthropic/claude-sonnet-4.5',
    max_tokens=1024,
    messages=[
        {'role': 'user', 'content': 'Explain quantum computing in one paragraph.'}
    ]
)

print(message.content[0].text)
```

--------------------------------

### Create Next.js App with Contentful Example Template

Source: https://vercel.com/docs/integrations/contentful

This command initializes a new Next.js project using the `cms-contentful` example template. It sets up a static blog with Preview Mode, integrating Next.js and Contentful, and can be executed using various JavaScript package managers.

```pnpm
pnpm create next-app --example cms-contentful
```

```npm
npx create-next-app --example cms-contentful
```

```bun
bunx create-next-app --example cms-contentful
```

--------------------------------

### deployment.promoted Event

Source: https://vercel.com/docs/webhooks/webhooks-api

Occurs whenever a deployment is promoted. This event gets fired after a production deployment is promoted to start serving production traffic. This can happen automatically after a successful build, or after running the promote command.

```APIDOC
## deployment.promoted

### Description
Occurs whenever a deployment is promoted. This event gets fired after a production deployment is promoted to start serving production traffic. This can happen automatically after a successful build, or after running the promote command.

### Method
POST

### Endpoint
/webhooks/vercel/events

### Parameters
#### Request Body
- **payload.team.id** (string) - Required - The ID of the event's team (possibly null).
- **payload.user.id** (string) - Required - The ID of the event's user.
- **payload.deployment.id** (string) - Required - The ID of the deployment.
- **payload.deployment.meta** (object) - Required - A Map of deployment metadata.
- **payload.deployment.url** (string) - Required - The URL of the deployment.
- **payload.deployment.name** (string) - Required - The project name used in the deployment URL.
- **payload.links.deployment** (string) - Required - The URL on the Vercel Dashboard to inspect the deployment.
- **payload.links.project** (string) - Required - The URL on the Vercel Dashboard to the project.
- **payload.project.id** (string) - Required - The ID of the project.
- **payload.plan** (string) - Required - The plan type of the deployment.
- **payload.regions** (array) - Required - An array of the supported regions for the deployment.

### Request Example
```json
{
  "payload": {
    "team": {
      "id": "team_xxxxxxxxxxxxxxxxx"
    },
    "user": {
      "id": "user_xxxxxxxxxxxxxxxxx"
    },
    "deployment": {
      "id": "dpl_xxxxxxxxxxxxxxxxx",
      "meta": {
        "githubCommitSha": "abcdef1234567890",
        "githubCommitMessage": "feat: new feature"
      },
      "url": "https://my-project-xxxx.vercel.app",
      "name": "my-project"
    },
    "links": {
      "deployment": "https://vercel.com/my-team/my-project/deployment/dpl_xxxxxxxxxxxxxxxxx",
      "project": "https://vercel.com/my-team/my-project"
    },
    "project": {
      "id": "prj_xxxxxxxxxxxxxxxxx"
    },
    "plan": "pro",
    "regions": [
        "sfo1",
        "iad1"
      ]
  }
}
```

### Response
#### Success Response (200)
- Event successfully received.

#### Response Example
```json
{}
```
```

--------------------------------

### Update Vercel Installation Notification (TypeScript)

Source: https://vercel.com/docs/integrations/marketplace-api

This TypeScript function shows how to update or set a notification for a Vercel installation using a PATCH request to the `/v1/installations/{installationId}` endpoint. It defines a `Notification` interface and includes an example of how to use the function with a regular URL, requiring `installationId` and a `Notification` object as inputs.

```typescript
interface Notification {
  title: string;
  message: string;
  href?: string;
  type?: 'info' | 'warning' | 'error';
}
 
async function updateInstallationNotification(
  installationId: string,
  notification: Notification
) {
  const response = await fetch(
    `https://api.vercel.com/v1/installations/${installationId}`,
    {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notification }),
    }
  );
 
  if (!response.ok) {
    throw new Error(`Failed to update notification: ${response.statusText}`);
  }
 
  return response.json();
}
 
// Example usage with regular URL:
await updateInstallationNotification('icfg_abc123', {
  title: 'Action Required',
  message: 'Please complete your account setup',
  href: 'https://your-integration.com/setup',
  type: 'warning',
});
 
// Or with SSO-enabled URL for authenticated access:
// href: 'sso:https://your-integration.com/setup',
```

--------------------------------

### Create and Reuse Sandbox Snapshot in TypeScript

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

Demonstrates how to capture the current state of a running sandbox using snapshot() and later create a new sandbox from that snapshot. The snapshot includes filesystem and installed packages, allowing you to skip lengthy setup steps. Note that snapshots expire after 7 days.

```typescript
const snapshot = await sandbox.snapshot();
console.log(snapshot.snapshotId);

// Later, create a new sandbox from the snapshot
const newSandbox = await Sandbox.create({
  source: { type: 'snapshot', snapshotId: snapshot.snapshotId }
});
```

--------------------------------

### Set up and run FastAPI locally with Vercel CLI

Source: https://vercel.com/docs/frameworks/backend/fastapi

These bash commands set up a Python virtual environment, install dependencies from `requirements.txt`, and then use `vercel dev` to run the FastAPI application locally. This allows for testing the application in a Vercel-like environment before deployment.

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
vercel dev
```

--------------------------------

### Vercel Promotion Status CLI Examples

Source: https://vercel.com/docs/cli/promote

These examples demonstrate various ways to use `vercel promote status`. You can check the status for the currently linked project, a specific project by name, or include a custom timeout for the status check.

```bash
# Check status for the linked project
vercel promote status

# Check status for a specific project
vercel promote status my-project

# Check status with a custom timeout
vercel promote status --timeout 30s
```

--------------------------------

### Example Response for Supported TLDs (JSON)

Source: https://vercel.com/docs/rest-api/reference/endpoints/domains-registrar/get-supported-tlds

This JSON snippet represents an example response from the `getSupportedTlds` API call. It shows a simple array structure where each element is a string representing a supported Top-Level Domain (TLD). This indicates the format of the data returned by the API.

```json
[
  "<string>"
]
```

--------------------------------

### Install Sandbox CLI with Package Managers

Source: https://vercel.com/docs/vercel-sandbox/cli-reference

Install the Sandbox CLI globally using pnpm, yarn, npm, or bun. The CLI can be invoked using the 'sandbox' or 'sbx' commands after installation.

```bash
pnpm i sandbox
```

```bash
yarn i sandbox
```

```bash
npm i sandbox
```

```bash
bun i sandbox
```

--------------------------------

### Install Split Browser SDK and Vercel Integration Utilities

Source: https://vercel.com/docs/edge-config/integrations/split-edge-config

Commands to install the Split Browser SDK, Vercel integration utilities, and the Vercel Edge Config SDK. These packages are essential for using the Split integration within your application code to fetch and evaluate feature flags.

```pnpm
pnpm i @splitsoftware/splitio-browserjs @splitsoftware/vercel-integration-utils @vercel/edge-config
```

```yarn
yarn add @splitsoftware/splitio-browserjs @splitsoftware/vercel-integration-utils @vercel/edge-config
```

```npm
npm i @splitsoftware/splitio-browserjs @splitsoftware/vercel-integration-utils @vercel/edge-config
```

--------------------------------

### Example Vercel marketplace.invoice.paid Webhook Payload JSON

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api

This JSON object provides an example of the `marketplace.invoice.paid` webhook payload structure. It contains the event ID, type, and a `payload` object with `invoice` details including ID, installation ID, amount, currency, and the `paidAt` timestamp. This payload structure is used to confirm successful invoice payments.

```json
{
  "id": "evt_def456",
  "type": "marketplace.invoice.paid",
  "payload": {
    "invoice": {
      "id": "inv_xyz789",
      "installationId": "icfg_def456",
      "amount": 29.99,
      "currency": "USD",
      "paidAt": "2025-01-15T11:00:00Z"
    }
  }
}
```

--------------------------------

### Example Creation Timestamp for Vercel Configuration

Source: https://vercel.com/docs/rest-api/reference/endpoints/integrations/retrieve-an-integration-configuration

This example provides a sample Unix timestamp (in milliseconds) representing when the Vercel integration configuration was created. This `number` field is required and indicates the exact creation time.

```json
1558531915505
```

--------------------------------

### Install Clawd Bot - Quick Install Windows PowerShell

Source: https://vercel.com/docs/ai-gateway/chat-platforms/clawd-bot

Quick installation script for Clawd Bot on Windows systems using PowerShell. Downloads and executes the installation script from clawd.bot.

```powershell
iwr -useb https://clawd.bot/install.ps1 | iex
```

--------------------------------

### GET /v1/installations/{integrationConfigurationId}/resources

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-integration-resources

Retrieves all resources associated with a given integration installation. This endpoint returns comprehensive resource information including partner IDs, internal IDs, status, product information, and billing details for each resource.

```APIDOC
## GET /v1/installations/{integrationConfigurationId}/resources

### Description
Get all resources for a given installation ID. Returns a list of resources with their metadata, configuration, and status information.

### Method
GET

### Endpoint
```
/v1/installations/{integrationConfigurationId}/resources
```

### Authentication
- **Type**: Bearer Token
- **Required**: Yes

### Path Parameters
- **integrationConfigurationId** (string) - Required - The unique identifier for the integration configuration

### Request Example
```
GET /v1/installations/config-123/resources HTTP/1.1
Authorization: Bearer YOUR_TOKEN
```

### Response

#### Success Response (200)
- **resources** (array) - Required - Array of resource objects
  - **partnerId** (string) - Required - The ID provided by the partner for the given resource
  - **internalId** (string) - Required - The ID assigned by Vercel for the given resource
  - **name** (string) - Required - The name of the resource as recorded in Vercel
  - **status** (string) - Optional - The current status of the resource
  - **productId** (string) - Required - The ID of the product the resource is derived from
  - **protocolSettings** (object) - Optional - Protocol configuration settings
    - **experimentation** (object) - Experimentation settings
      - **edgeConfigSyncingEnabled** (boolean) - Whether edge config syncing is enabled
      - **edgeConfigId** (string) - The edge config identifier
      - **edgeConfigTokenId** (string) - The edge config token identifier
  - **notification** (object) - Optional - Notification details
    - **level** (string) - Required - Notification level
    - **title** (string) - Required - Notification title
    - **message** (string) - Optional - Notification message
    - **href** (string) - Optional - Notification link
  - **billingPlanId** (string) - Optional - The ID of the billing plan the resource is subscribed to
  - **metadata** (object) - Optional - Configured metadata for the resource as defined by product's Metadata Schema

#### Response Example (200)
```json
{
  "resources": [
    {
      "partnerId": "partner-123",
      "internalId": "res-456",
      "name": "My Resource",
      "status": "active",
      "productId": "prod-789",
      "protocolSettings": {
        "experimentation": {
          "edgeConfigSyncingEnabled": true,
          "edgeConfigId": "edge-config-123",
          "edgeConfigTokenId": "token-456"
        }
      },
      "notification": {
        "level": "info",
        "title": "Resource Active",
        "message": "Your resource is now active",
        "href": "https://example.com"
      },
      "billingPlanId": "plan-123",
      "metadata": {}
    }
  ]
}
```

#### Error Responses

**400 Bad Request**
- One of the provided values in the request query is invalid

**401 Unauthorized**
- The request is not authorized. Verify your bearer token is valid.

**403 Forbidden**
- You do not have permission to access this resource.

**404 Not Found**
- The specified integration configuration was not found.
```

--------------------------------

### Install @vercel/remote-nx plugin for Nx remote caching

Source: https://vercel.com/docs/monorepos/nx

These commands demonstrate how to install the `@vercel/remote-nx` plugin using various package managers (pnpm, yarn, npm, bun). This plugin is a prerequisite for enabling and utilizing remote caching capabilities for Nx projects deployed on Vercel.

```bash
pnpm i @vercel/remote-nx
```

```bash
yarn i @vercel/remote-nx
```

```bash
npm i @vercel/remote-nx
```

```bash
bun i @vercel/remote-nx
```

--------------------------------

### GET /v1/installations/{integrationConfigurationId}/account

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-account-info

Fetches the best account or user's contact information for a Vercel integration installation. This endpoint retrieves team details, dashboard URL, and contact information associated with the specified integration configuration.

```APIDOC
## GET /v1/installations/{integrationConfigurationId}/account

### Description
Fetches the best account or user's contact information for a Vercel integration installation.

### Method
GET

### Endpoint
/v1/installations/{integrationConfigurationId}/account

### Authentication
- **Type**: Bearer Token
- **Required**: Yes

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required - The unique identifier for the integration configuration

### Request Example
```
GET /v1/installations/abc123/account HTTP/1.1
Authorization: Bearer YOUR_BEARER_TOKEN
Content-Type: application/json
```

### Response
#### Success Response (200)
- **name** (string) - The name of the team the installation is tied to
- **url** (string) - Required - A URL linking to the installation in the Vercel Dashboard
- **contact** (object) - Required - Contact information object
  - **email** (string) - Required - Email address
  - **name** (string) - Contact person's name

#### Response Example
```json
{
  "name": "My Team",
  "url": "https://vercel.com/dashboard/team/my-team",
  "contact": {
    "email": "contact@example.com",
    "name": "John Doe"
  }
}
```

#### Error Responses
- **400** - One of the provided values in the request query is invalid
- **401** - The request is not authorized
- **403** - You do not have permission to access this resource
- **404** - Resource not found
```

--------------------------------

### Initialize a new project directory

Source: https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langfuse

This command sequence creates a new directory named `langfuse-ai-gateway`, navigates into it, and initializes a new project using `pnpm dlx init -y`. This sets up the basic project structure for development.

```bash
mkdir langfuse-ai-gateway
cd langfuse-ai-gateway
pnpm dlx init -y
```

--------------------------------

### Submit Billing Data Request Body Example (JSON)

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/submit-billing-data

Provides a JSON schema example for the request body when submitting billing and usage data. It details required fields like `timestamp`, `eod`, `period` (with `start` and `end`), `billing` data, and an array of `usage` metrics, each with specific properties.

```json
{
  "timestamp": "string",
  "eod": "string",
  "period": {
    "start": "string",
    "end": "string"
  },
  "billing": "value",
  "usage": [
    "resourceId": "string",
    "name": "string",
    "type": "string",
    "units": "string",
    "dayValue": "number",
    "periodValue": "number",
    "planValue": "number"
  ]
}
```

--------------------------------

### Install AI Agent Skills using npx

Source: https://vercel.com/docs/ai-resources

This command installs a specific AI agent skill from the Skills.sh ecosystem. Skills are procedural knowledge packages that enhance AI coding assistants with specialized expertise. Replace `<owner/repo>` with the desired skill's owner and repository name.

```bash
npx skills add <owner/repo>
```

--------------------------------

### Create new Vercel Project with automatic framework detection using Vercel CLI

Source: https://vercel.com/docs/cli/project-linking

This command illustrates the process of creating a new Vercel Project from a local directory using the `vercel` CLI. It guides the user through setting up a new project, including scope selection, project naming, and directory specification. The CLI automatically detects the project's framework (e.g., Next.js) and suggests default build, output, and development commands, which can be overridden.

```bash
vercel
? Set up and deploy "~/web/my-new-project"? [Y/n] y
? Which scope do you want to deploy to? My Awesome Team
? Link to existing project? [y/N] n
? What’s your project’s name? my-new-project
? In which directory is your code located? my-new-project/
Auto-detected project settings (Next.js):
- Build Command: `next build` or `build` from `package.json`
- Output Directory: Next.js default
- Development Command: next dev --port $PORT
? Want to override the settings? [y/N]
```

--------------------------------

### Providing Single Page Context to AI Assistants

Source: https://vercel.com/docs/ai-resources/markdown-access

This example illustrates how to structure a prompt for an AI assistant by including the markdown content of a single Vercel documentation page. This method is useful for getting specific help on a particular feature or topic.

```text
Here is the Vercel Functions documentation:

[paste markdown content]

Based on this, how do I set up a function with a 60 second timeout?
```

--------------------------------

### Start Rolling Release for a Deployment with Options

Source: https://vercel.com/docs/cli/rolling-release

Initiates a rolling release for a specified deployment using its ID or URL. This snippet includes examples of targeting deployments by ID, URL, and using the `--yes` flag to skip confirmation prompts, demonstrating various ways to begin a rollout.

```bash
vercel rolling-release start --dpl=dpl_abc
```

```bash
vercel rr start --dpl=dpl_123abc456def
```

```bash
vercel rr start --dpl=https://my-project-abc123.vercel.app
```

```bash
vercel rr start --dpl=dpl_123 --yes
```

```bash
vercel rolling-release start --dpl=https://example.vercel.app
```

--------------------------------

### Example Vercel marketplace.invoice.created Webhook Payload JSON

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api

This JSON object illustrates the structure of the `marketplace.invoice.created` webhook payload. It includes the event ID, type, and a `payload` object containing `invoice` details such as ID, installation ID, amount, currency, and creation timestamp. This example helps in understanding the data received when an invoice is created.

```json
{
  "id": "evt_abc123",
  "type": "marketplace.invoice.created",
  "payload": {
    "invoice": {
      "id": "inv_xyz789",
      "installationId": "icfg_def456",
      "amount": 29.99,
      "currency": "USD",
      "createdAt": "2025-01-15T10:00:00Z"
    }
  }
}
```

--------------------------------

### Install Vercel Sandbox SDK using Package Managers

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

This snippet demonstrates how to install the Vercel Sandbox SDK using various popular package managers. Choose your preferred package manager (pnpm, yarn, npm, or bun) to add the `@vercel/sandbox` dependency to your project. This installation is a prerequisite for utilizing any of the SDK's functionalities.

```bash
pnpm i @vercel/sandbox
```

```bash
yarn i @vercel/sandbox
```

```bash
npm i @vercel/sandbox
```

```bash
bun i @vercel/sandbox
```

--------------------------------

### Install Clawd Bot - Quick Install macOS/Linux

Source: https://vercel.com/docs/ai-gateway/chat-platforms/clawd-bot

Quick installation script for Clawd Bot on macOS and Linux systems using curl. Downloads and executes the installation script from clawd.bot.

```bash
curl -fsSL https://clawd.bot/install.sh | bash
```

--------------------------------

### Configure Conformance allowlist file ownership with Code Owners

Source: https://vercel.com/docs/conformance/getting-started

This configuration snippet, intended for a `.vercel.approvers` file at the repository root, defines ownership for Conformance allowlist files. It mandates that any changes to files matching `**/*.allowlist.json` require a review from the designated `@org/team`, leveraging Vercel's Code Owners functionality for controlled access and modifications.

```text
**/*.allowlist.json @org/team:required
```

--------------------------------

### Get Command Start Timestamp in TypeScript

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

The `startedAt` property returns the Unix timestamp (in milliseconds) indicating when the command began its execution. This timestamp can be used to calculate the command's execution duration or to schedule subsequent tasks based on its start time. It provides a precise record of the command's initiation.

```ts
const duration = Date.now() - result.startedAt;
console.log(`Command took ${duration}ms`);
```

--------------------------------

### POST /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/post-v1-installations-resources-experimentation-items

Creates one or multiple experimentation items for a specified resource within an integration configuration. This endpoint requires bearer token authentication and appropriate permissions to access the target resource.

```APIDOC
## POST /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items

### Description
Create one or multiple experimentation items within an integration configuration resource.

### Method
POST

### Endpoint
/v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items

### Authentication
- **bearerToken** - Required - Default authentication mechanism

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required - The unique identifier for the integration configuration
- **resourceId** (string) - Required - The unique identifier for the resource

### Request Body
**Content-Type**: application/json

- **items** (array) - Required - Array of experimentation items to create
  - **id** (string) - Required - Unique identifier for the item
  - **slug** (string) - Required - URL-friendly slug for the item
  - **origin** (string) - Required - Origin source of the item
  - **category** (string) - Optional - Category classification for the item
  - **name** (string) - Optional - Display name for the item
  - **description** (string) - Optional - Detailed description of the item
  - **isArchived** (boolean) - Optional - Archive status of the item
  - **createdAt** (number) - Optional - Unix timestamp of creation
  - **updatedAt** (number) - Optional - Unix timestamp of last update

### Request Example
{
  "items": [
    {
      "id": "exp-001",
      "slug": "feature-test",
      "origin": "internal",
      "category": "feature",
      "name": "Feature Experiment",
      "description": "Testing new feature rollout",
      "isArchived": false,
      "createdAt": 1672531200,
      "updatedAt": 1672531200
    }
  ]
}

### Response
#### Success Response (204)
- No content returned
- The items were successfully created

#### Error Response (400)
- One of the provided values in the request body is invalid
- One of the provided values in the request query is invalid

#### Error Response (401)
- The request is not authorized
- Missing or invalid bearer token

#### Error Response (403)
- You do not have permission to access this resource
- Insufficient permissions for the specified integration configuration or resource

#### Error Response (404)
- The specified resource or integration configuration was not found
```

--------------------------------

### Install LangChain, OpenAI, and utility dependencies

Source: https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langchain

These commands install core LangChain packages (`langchain`, `@langchain/core`, `@langchain/openai`), along with `dotenv` for environment variable loading and `@types/node` for TypeScript type definitions, using various package managers.

```bash
pnpm i langchain @langchain/core @langchain/openai dotenv @types/node
```

```bash
yarn i langchain @langchain/core @langchain/openai dotenv @types/node
```

```bash
npm i langchain @langchain/core @langchain/openai dotenv @types/node
```

```bash
bun i langchain @langchain/core @langchain/openai dotenv @types/node
```

--------------------------------

### Example Response for Vercel Get Project Domains API (JSON)

Source: https://vercel.com/docs/rest-api/reference/endpoints/projects/retrieve-project-domains-by-project-by-id-or-name

This JSON snippet provides an example of the successful response from the `getProjectDomains` API call. It contains an array of `domains`, each detailing properties like `name`, `apexName`, `projectId`, `verification` status, and associated metadata. The response also includes a `pagination` object for handling large result sets.

```json
{
  "domains": [
    {
      "name": "<string>",
      "apexName": "<string>",
      "projectId": "<string>",
      "verified": false,
      "redirect": "<string>",
      "redirectStatusCode": 301,
      "gitBranch": "<string>",
      "customEnvironmentId": "<string>",
      "updatedAt": 123,
      "createdAt": 123,
      "verification": [
        {
          "type": "<string>",
          "domain": "<string>",
          "value": "<string>",
          "reason": "<string>"
        }
      ]
    }
  ],
  "pagination": {
    "count": 123,
    "next": 123,
    "prev": 123
  }
}
```

--------------------------------

### Install Vercel CLI with pnpm

Source: https://vercel.com/docs/deployments/environments

Install the Vercel Command Line Interface globally using pnpm package manager as an alternative to npm.

```bash
pnpm i -g vercel
```

--------------------------------

### GET /v1/installations/{installationId}/member/{memberId}

Source: https://vercel.com/docs/integrations/marketplace-api

Retrieve details about a specific team member who has access to an installation. This endpoint is useful for access control, audit logs, or displaying member information in your integration.

```APIDOC
## GET /v1/installations/{installationId}/member/{memberId}

### Description
Get details about a specific team member who has access to an installation.

### Method
GET

### Endpoint
/v1/installations/{installationId}/member/{memberId}

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
- **memberId** (string) - Required - The ID of the member.

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **id** (string) - The unique ID of the member.
- **name** (string) - The name of the member.
- **email** (string) - The email address of the member.
- **role** (string) - The role of the member within the installation (e.g., `ADMIN`, `USER`).
- **avatar** (string) - A URL to the member's avatar image.
- **createdAt** (string) - The ISO 8601 timestamp when the member was created.

#### Response Example
{
  "id": "member_abc123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "ADMIN",
  "avatar": "https://example.com/avatar.jpg",
  "createdAt": "2025-01-15T10:00:00Z"
}
```

--------------------------------

### Implement SPA Fallback with Vercel `routes` and `rewrites`

Source: https://vercel.com/docs/project-configuration/vercel-json

This example illustrates how to configure a Single Page Application (SPA) fallback, serving `index.html` for any path that doesn't match an existing file. With legacy `routes`, you explicitly use `"handle": "filesystem"` to prioritize file system checks. The modern `rewrites` configuration handles filesystem checks by default, simplifying the setup.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

--------------------------------

### Create Custom Vercel Environment using Vercel SDK (JavaScript)

Source: https://vercel.com/docs/deployments/local-env

This JavaScript code demonstrates how to programmatically create a custom environment using the `@vercel/sdk`. It initializes the SDK with a bearer token and calls the `environment.createCustomEnvironment` method, providing the project identifier, environment slug, and description.

```javascript
import { Vercel } from '@vercel/sdk';
 
const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});
 
async function run() {
  const result = await vercel.environment.createCustomEnvironment({
    idOrName: '<project-id-or-name>',
    requestBody: {
      slug: '<environment_name_slug>',
      description: '<environment_description>',
    },
  });
  // Handle the result
  console.log(result);
}
 
run();
```

--------------------------------

### Setup Vercel Analytics script - HTML

Source: https://vercel.com/docs/analytics/custom-events

Initialize the Vercel Analytics tracking script in vanilla HTML. Add the window.va function definition before the Vercel Insights script tag to enable event tracking in HTML-based projects.

```html
<script>
  window.va =
    window.va ||
    function () {
      (window.vaq = window.vaq || []).push(arguments);
    };
</script>
{/* Place it above this script tag when already added */}
<script defer src="/_vercel/insights/script.js"></script>
```

--------------------------------

### Generate AI responses using Anthropic SDK with Vercel AI Gateway

Source: https://vercel.com/docs/ai-gateway/getting-started

This snippet illustrates how to use the Anthropic SDK (Python and TypeScript) to connect to Vercel's AI Gateway. It configures the Anthropic client with the gateway's base URL and API key, then sends a message creation request to generate a holiday description.

```typescript
import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

const client = new Anthropic({
  apiKey: process.env.AI_GATEWAY_API_KEY,
  baseURL: 'https://ai-gateway.vercel.sh',
});

async function main() {
  const message = await client.messages.create({
    model: 'anthropic/claude-sonnet-4.5',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: 'Invent a new holiday and describe its traditions.',
      },
    ],
  });

  console.log(message.content[0].text);
}

main().catch(console.error);
```

```python
import os
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh',
)

message = client.messages.create(
    model='anthropic/claude-sonnet-4.5',
    max_tokens=1024,
    messages=[
        {
            'role': 'user',
            'content': 'Invent a new holiday and describe its traditions.',
        },
    ],
)

print(message.content[0].text)
```

--------------------------------

### GET /v1/integrations/configurations

Source: https://vercel.com/docs/rest-api/reference/endpoints/integrations/get-configurations-for-the-authenticated-user-or-team

Retrieves all integration configurations for the authenticated user or team. Supports filtering by view type (account or project), installation type, and integration ID or slug. When the project view is used, authorization flow configurations are excluded from results.

```APIDOC
## GET /v1/integrations/configurations

### Description
Allows to retrieve all configurations for an authenticated integration. When the `project` view is used, configurations generated for the authorization flow will be filtered out of the results.

### Method
GET

### Endpoint
/v1/integrations/configurations

### Parameters

#### Header Parameters
- **Authorization** (string) - Required - Default authentication mechanism using bearer token

#### Query Parameters
- **view** (enum<string>) - Required - Filter configurations by view type. Available options: `account`, `project`
- **installationType** (enum<string>) - Optional - Filter by installation type. Available options: `marketplace`, `external`, `provisioning`
- **integrationIdOrSlug** (string) - Optional - ID or slug of the integration to filter configurations
- **teamId** (string) - Optional - The Team identifier to perform the request on behalf of. Example: `team_1a2b3c4d5e6f7g8h9i0j1k2l`
- **slug** (string) - Optional - The Team slug to perform the request on behalf of. Example: `my-team-url-slug`

### Request Example
```typescript
import { Vercel } from "@vercel/sdk";

const vercel = new Vercel({
  bearerToken: "<YOUR_BEARER_TOKEN_HERE>"
});

async function run() {
  const result = await vercel.integrations.getConfigurations({
    view: "account",
    teamId: "team_1a2b3c4d5e6f7g8h9i0j1k2l",
    slug: "my-team-url-slug"
  });

  console.log(result);
}

run();
```

### Response

#### Success Response (200)
- **completedAt** (number) - Timestamp when the configuration was completed
- **createdAt** (number) - Timestamp when the configuration was created
- **id** (string) - Unique identifier for the integration configuration
- **integrationId** (string) - ID of the integration
- **ownerId** (string) - ID of the configuration owner
- **status** (string) - Current status of the configuration (e.g., "error")
- **externalId** (string) - External identifier for the configuration
- **projects** (array<string>) - Array of project IDs associated with this configuration
- **source** (string) - Source of the integration (e.g., "marketplace")
- **slug** (string) - Slug identifier for the integration (e.g., "slack")
- **teamId** (string) - ID of the team this configuration belongs to
- **type** (string) - Type of configuration (e.g., "integration-configuration")
- **updatedAt** (number) - Timestamp when the configuration was last updated
- **userId** (string) - ID of the user who owns the configuration
- **scopes** (array<string>) - Array of permission scopes granted to the integration
- **disabledAt** (number) - Timestamp when the configuration was disabled
- **deletedAt** (number) - Timestamp when the configuration was deleted
- **deleteRequestedAt** (number) - Timestamp when deletion was requested
- **disabledReason** (string) - Reason why the configuration was disabled (e.g., "disabled-by-owner")
- **installationType** (string) - Type of installation (e.g., "marketplace")

#### Response Example
```json
[
  {
    "completedAt": 1558531915505,
    "createdAt": 1558531915505,
    "id": "icfg_3bwCLgxL8qt5kjRLcv2Dit7F",
    "integrationId": "oac_xzpVzcUOgcB1nrVlirtKhbWV",
    "ownerId": "kr1PsOIzqEL5Xg6M4VZcZosf",
    "status": "error",
    "externalId": "<string>",
    "projects": [
      "prj_xQxbutw1HpL6HLYPAzt5h75m8NjO"
    ],
    "source": "marketplace",
    "slug": "slack",
    "teamId": "team_nLlpyC6RE1qxydlFKbrxDlud",
    "type": "integration-configuration",
    "updatedAt": 1558531915505,
    "userId": "kr1PsOIzqEL5Xg6M4VZcZosf",
    "scopes": [
      "read:project",
      "read-write:log-drain"
    ],
    "disabledAt": 1558531915505,
    "deletedAt": 1558531915505,
    "deleteRequestedAt": 1558531915505,
    "disabledReason": "disabled-by-owner",
    "installationType": "marketplace"
  }
]
```
```

--------------------------------

### Define ASGI Application with Sanic in Python

Source: https://vercel.com/docs/functions/runtimes/python

Illustrates how to define an Asynchronous Server Gateway Interface (ASGI) application using the Sanic framework. This example sets up a basic web server with routes for the root path and any sub-path, returning a JSON response. It demonstrates the 'app' variable convention for ASGI applications.

```python
from sanic import Sanic
from sanic.response import json
app = Sanic()


@app.route('/')
@app.route('/<path:path>')
async def index(request, path=""):
    return json({'hello': path})
```

--------------------------------

### GET /v1/installations/{installationId}/member/{memberId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api

Retrieve detailed information about a specific team member associated with an installation. Use this endpoint for access control, audit logs, or displaying member details in your integration.

```APIDOC
## GET /v1/installations/{installationId}/member/{memberId}

### Description
Retrieve information about a specific team member who has access to an installation. This endpoint provides member details including name, email, role, and avatar for access control and audit purposes.

### Method
GET

### Endpoint
```
https://api.vercel.com/v1/installations/{installationId}/member/{memberId}
```

### Path Parameters
- **installationId** (string) - Required - The installation ID
- **memberId** (string) - Required - The member ID

### Headers
- **Authorization** (string) - Required - Bearer token for authentication

### Request Example
```typescript
async function getMemberInfo(
  installationId: string,
  memberId: string
): Promise<MemberInfo> {
  const response = await fetch(
    `https://api.vercel.com/v1/installations/${installationId}/member/${memberId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to get member info: ${response.statusText}`);
  }

  return response.json();
}
```

### Response
#### Success Response (200)
- **id** (string) - The unique member identifier
- **name** (string) - The member's full name
- **email** (string) - The member's email address
- **role** (string) - The member's role (ADMIN or USER)
- **avatar** (string) - URL to the member's avatar image
- **createdAt** (string) - ISO 8601 timestamp of when the member was created

#### Response Example
```json
{
  "id": "member_abc123",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "ADMIN",
  "avatar": "https://example.com/avatar.jpg",
  "createdAt": "2025-01-15T10:00:00Z"
}
```

### Member Roles
- **ADMIN** - Full access to the installation and its resources
- **USER** - Limited access, can use resources but cannot modify settings
```

--------------------------------

### Vercel Installation Billing Plan 403 Error Response JSON

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/get-installation

HTTP 403 error response structure returned when authentication is not allowed to perform the operation. Contains error object with required code and message fields, plus optional user object with user-facing message and help URL for resolution.

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "user": {
      "message": "string",
      "url": "string"
    }
  }
}
```

--------------------------------

### Install additional packages in build image with dnf

Source: https://vercel.com/docs/builds/build-image

Install a package into the build container by name using dnf. The -y flag automatically answers yes to prompts. Configure this command in the Install Command setting or via the 'installCommand' property in vercel.json.

```bash
dnf install -y my-package-here
```

--------------------------------

### Install OpenTelemetry and Vercel OTel packages

Source: https://vercel.com/docs/tracing/instrumentation

Install the necessary OpenTelemetry API and Vercel OTel packages using various package managers to enable tracing in your application.

```bash
pnpm i @opentelemetry/api @vercel/otel
```

```bash
yarn i @opentelemetry/api @vercel/otel
```

```bash
npm i @opentelemetry/api @vercel/otel
```

```bash
bun i @opentelemetry/api @vercel/otel
```

--------------------------------

### Install Vercel CLI with npm

Source: https://vercel.com/docs/deployments/environments

Install the Vercel Command Line Interface globally using npm package manager. This is the first step for setting up local development with Vercel.

```bash
npm i -g vercel
```

--------------------------------

### Create Koa Application Entrypoint with Router

Source: https://vercel.com/docs/frameworks/backend/koa

Basic Koa server setup with routing using @koa/router. This serves as the entrypoint file that Vercel detects and deploys. The file should be named src/index.ts, src/app.ts, or similar according to Vercel's entrypoint detection rules. The server listens on port 3000 and responds to GET requests at the root path.

```typescript
import Koa from 'koa'
import { Router } from '@koa/router'

const app = new Koa()
const router = new Router()

router.get('/', (ctx) => {
  ctx.body = { message: 'Hello from Koa!' }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
```

--------------------------------

### POST /v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/accept

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/accept-resource-transfer

Finish the transfer process, expects any work required to move the resources from one installation to another on the provider's side is or will be completed successfully. Upon a successful response, the resource in Vercel will be moved to the target installation as well, maintaining its project connection. While the transfer is being completed, no other request to complete the same transfer can be processed. After the transfer has been completed, it cannot be completed again, nor can it be verified. Important: The installation ID in the URL is the target installation ID, not the source one.

```APIDOC
## POST /v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/accept

### Description
Finish the transfer process, expects any work required to move the resources from one installation to another on the provider's side is or will be completed successfully. Upon a successful response, the resource in Vercel will be moved to the target installation as well, maintaining its project connection. While the transfer is being completed, no other request to complete the same transfer can be processed. After the transfer has been completed, it cannot be completed again, nor can it be verified. Important: The installation ID in the URL is the target installation ID, not the source one.

### Method
POST

### Endpoint
/v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/accept

### Parameters
#### Path Parameters
- **installationId** (string) - Required -
- **providerClaimId** (string) - Required -

### Response
#### Success Response (204)
Transfer completed successfully.

#### Error Response (403, 404, 409, 422)
- **error** (object) - required - Error details
  - **code** (string) - required
  - **message** (string) - required - System error message
  - **user** (object) - optional
    - **message** (string) - User-facing error message, if applicable
    - **url** (string) - URL to a user-facing help article, or a dashboard page for resolution, if applicable

#### Response Example
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "user": {
      "message": "string",
      "url": "string"
    }
  }
}
```
```

--------------------------------

### PUT /v1/installations/{integrationConfigurationId}/resources/{resourceId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel

Imports a resource for a specific installation in the Vercel Marketplace.

```APIDOC
## PUT /v1/installations/{integrationConfigurationId}/resources/{resourceId}

### Description
Imports a resource for a specific installation in the Vercel Marketplace.

### Method
PUT

### Endpoint
/v1/installations/{integrationConfigurationId}/resources/{resourceId}

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required - The ID of the integration configuration.
- **resourceId** (string) - Required - The ID of the resource.

#### Query Parameters
None

#### Request Body
None

### Request Example
{}

### Response
#### Success Response (200)
None

#### Response Example
{}
```

--------------------------------

### Remove postinstall script from package.json

Source: https://vercel.com/docs/conformance/rules/NO_POSTINSTALL_SCRIPT

Example of a package.json file containing a postinstall script that should be removed. The postinstall script executes automatically when dependencies are installed or updated, causing performance degradation. Removing this script from the scripts section resolves the conformance issue.

```json
{
  "scripts": {
    "postinstall": "sleep 360"
  }
}
```

--------------------------------

### Install Azure CosmosDB packages with package managers

Source: https://vercel.com/docs/oidc/azure

Install the required Azure identity, Cosmos, and Vercel functions packages using various package managers (pnpm, yarn, npm, bun). These packages enable authentication with Azure and database operations.

```pnpm
pnpm i @azure/identity @azure/cosmos @vercel/functions
```

```yarn
yarn i @azure/identity @azure/cosmos @vercel/functions
```

```npm
npm i @azure/identity @azure/cosmos @vercel/functions
```

```bun
bun i @azure/identity @azure/cosmos @vercel/functions
```

--------------------------------

### Install project dependencies for application execution

Source: https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langfuse

These commands are used to install project dependencies, ensuring all required packages are available before running the application. While these commands install dependencies, the actual execution of the TypeScript file would typically involve a runtime like Node.js after compilation or using a tool like `ts-node`.

```bash
pnpm i
```

```bash
yarn i
```

```bash
npm i
```

```bash
bun i
```

--------------------------------

### Example Turborepo configuration with Next.js cache enabled (JSON)

Source: https://vercel.com/docs/conformance/rules/NEXTJS_NO_TURBO_CACHE

This `turbo.json` configuration demonstrates how the `.next/cache` folder might be inadvertently included in the Turborepo build output, leading to an oversized cache. This setup will be flagged by the `NEXTJS_NO_TURBO_CACHE` rule.

```json
{
  "extends": ["//"],
  "pipeline": {
    "build": {
      "outputs": [".next/**"]
    }
  }
}
```

--------------------------------

### Install AI SDK Package

Source: https://vercel.com/docs/ai-gateway/models-and-providers/provider-options

Install the required AI SDK package using pnpm package manager. This is a prerequisite for configuring provider options in your application.

```bash
pnpm install ai
```

--------------------------------

### GET /new/clone (Skippable Integrations)

Source: https://vercel.com/docs/integrations/deploy-button/integrations

This endpoint allows you to pre-configure a Vercel Deploy Button URL to offer a list of integrations from which the user can choose one or skip them entirely, instead of being forced to add all of them.

```APIDOC
## GET /new/clone (Skippable Integrations)

### Description
This endpoint allows you to pre-configure a Vercel Deploy Button URL to offer a list of integrations from which the user can choose one or skip them entirely, instead of being forced to add all of them.

### Method
GET

### Endpoint
/new/clone

### Parameters
#### Path Parameters
_None_

#### Query Parameters
- **repository-url** (string) - Required - The URL of the repository to clone (e.g., `https://github.com/vercel/next.js/tree/canary/examples/hello-world`).
- **integration-ids** (string) - Required - A comma-separated list of Integration IDs that are offered as skippable options. At least one integration ID must be provided if `skippable-integrations` is present.
- **skippable-integrations** (number) - Optional - If present (e.g., `1`), marks the provided `integration-ids` as optional, allowing the user to select one or skip them.

#### Request Body
_None_

### Request Example
```
https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world&integration-ids=oac_1mkAfc68cuDV4suZRlgkn3Re&skippable-integrations=1
```

### Response
#### Success Response (200 - Redirect)
This endpoint initiates a redirect to the Vercel dashboard to set up a new project, offering the specified skippable integrations. There is no direct API response body.

#### Response Example
_No direct API response body. User is redirected to Vercel UI._
```
```
```

--------------------------------

### Install Vercel CLI with yarn

Source: https://vercel.com/docs/deployments/environments

Install the Vercel Command Line Interface globally using yarn package manager as an alternative to npm.

```bash
yarn global add vercel
```

--------------------------------

### Retrieve all Edge Config values in non-Next.js frameworks

Source: https://vercel.com/docs/edge-config/edge-config-sdk

The getAll method can be used outside of Next.js frameworks by using the standard Response.json API. This example shows how to fetch all Edge Config items and return them as JSON in a generic framework setup.

```TypeScript
import { getAll } from '@vercel/edge-config';

export async function GET() {
  const configItems = await getAll();

  return Response.json({
    label: `These are all the values in my Edge Config.`,
    value: configItems,
  });
}
```

```JavaScript
import { getAll } from '@vercel/edge-config';

export async function GET() {
  const configItems = await getAll();

  return Response.json({
    label: `These are all the values in my Edge Config.`,
    value: configItems,
  });
}
```

--------------------------------

### Define Route Parameters with Modern Vercel Rewrites (JSON)

Source: https://vercel.com/docs/project-configuration/vercel-json

This example demonstrates the modern approach to defining route parameters using Vercel's `rewrites` property. It achieves the same outcome as the legacy `routes` example, matching `/product/:id` and rewriting to `/api/product`, with named parameters automatically passed as query strings.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [{ "source": "/product/:id", "destination": "/api/product" }]
}
```

--------------------------------

### Run Microfrontends Local Development Proxy for Specific App

Source: https://vercel.com/docs/microfrontends/local-development

This command starts the Vercel Microfrontends local development proxy, specifically routing requests for a named application to its local instance. It's crucial for polyrepo setups where individual microfrontends are developed in separate repositories. The `your-app-name` argument must match the application name defined in your `microfrontends.json` configuration.

```bash
microfrontends proxy --local-apps your-app-name
```

--------------------------------

### Start Blackbox AI CLI

Source: https://vercel.com/docs/ai-gateway/coding-agents/blackbox

This command launches the Blackbox AI CLI, allowing users to begin interacting with its AI-powered features. After successful configuration, all requests made through the CLI will be routed via the Vercel AI Gateway.

```bash
blackbox
```

--------------------------------

### Basic File and Pattern Matching in .vercel.approvers

Source: https://vercel.com/docs/code-owners/code-approvers

Demonstrates basic glob pattern matching for single files and file types in the current directory. Matches specific files like package.json and all JavaScript files, assigning them to designated owners for approval.

```shell
# Matches the single `package.json` file in the current directory only.
package.json @package-owner

# Matches all javascript files in the current directory only.
*.js @js-owner
```

--------------------------------

### Install GCP and Vertex AI packages with package managers

Source: https://vercel.com/docs/oidc/gcp

Install required dependencies for GCP authentication and Vertex AI integration with Vercel Functions. Supports pnpm, yarn, npm, and bun package managers. These packages enable OIDC authentication and AI text generation capabilities.

```bash
pnpm i google-auth-library @ai-sdk/google-vertex ai @vercel/functions
```

```bash
yarn i google-auth-library @ai-sdk/google-vertex ai @vercel/functions
```

```bash
npm i google-auth-library @ai-sdk/google-vertex ai @vercel/functions
```

```bash
bun i google-auth-library @ai-sdk/google-vertex ai @vercel/functions
```

--------------------------------

### Push application code to Git for Vercel deployment (Shell)

Source: https://vercel.com/docs/integrations/cms/sitecore

This snippet demonstrates the standard Git commands to initialize a repository, stage changes, commit them, link to a remote repository, and push the code. This is a crucial first step before importing your project into Vercel, ensuring your application's source code is version-controlled and accessible.

```shell
git init
git add .
git commit -m "Initial commit"
git remote add origin [repository url]
git push -u origin main
```

--------------------------------

### Look Up AI Gateway Generation Details in TypeScript

Source: https://vercel.com/docs/ai-gateway/capabilities/usage

This TypeScript example shows how to retrieve detailed information about a specific AI Gateway generation by its ID. It performs a GET request to the `/generation` endpoint, authenticating with an API key, and logs the generation details.

```typescript
const generationId = 'gen_01ARZ3NDEKTSV4RRFFQ69G5FAV';

const response = await fetch(
  `https://ai-gateway.vercel.sh/v1/generation?id=${generationId}`,
  {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
      'Content-Type': 'application/json',
    },
  },
);

const generation = await response.json();
console.log(generation);
```

--------------------------------

### Retrieve AI Gateway Credit Balance

Source: https://vercel.com/docs/ai-gateway/capabilities/usage

These examples demonstrate how to check your AI Gateway credit balance and usage information. They make a GET request to the `/credits` endpoint, requiring an API key for authentication, and then print the JSON response.

```typescript
const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const response = await fetch('https://ai-gateway.vercel.sh/v1/credits', {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
});

const credits = await response.json();
console.log(credits);
```

```python
import os
import requests

api_key = os.getenv("AI_GATEWAY_API_KEY") or os.getenv("VERCEL_OIDC_TOKEN")

response = requests.get(
    "https://ai-gateway.vercel.sh/v1/credits",
    headers={
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    },
)

credits = response.json()
print(credits)
```

--------------------------------

### Create Project Directory - Bash

Source: https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm

Initialize a new project directory for the LiteLLM and Vercel AI Gateway integration. This creates the project folder and navigates into it for subsequent setup steps.

```bash
mkdir litellm-ai-gateway
cd litellm-ai-gateway
```

--------------------------------

### Create Vercel Function for cron job - TypeScript/JavaScript

Source: https://vercel.com/docs/cron-jobs/quickstart

Create a simple GET function that serves as the cron job handler. This function will be executed by the cron job at scheduled intervals. The function receives a Request object and returns a Response. Supports both TypeScript and JavaScript implementations for Next.js and other frameworks.

```typescript
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```

```javascript
export function GET(request) {
  return new Response('Hello from Vercel!');
}
```

--------------------------------

### Install Vercel SDK with npm/pnpm/yarn

Source: https://vercel.com/docs/rest-api/reference/sdk

Install the @vercel/sdk package using package managers. Supports pnpm, npm, and yarn. This is the first step to integrate the Vercel SDK into your project.

```bash
pnpm i @vercel/sdk
```

```bash
npm i @vercel/sdk
```

```bash
yarn add @vercel/sdk
```

--------------------------------

### Get Vercel Deployment URL for RedwoodJS (Bash)

Source: https://vercel.com/docs/environment-variables/framework-environment-variables

This environment variable provides the domain name of the generated Vercel deployment URL (e.g., '*.vercel.app'). It does not include the 'https://' protocol scheme and is available at both build and runtime. The example shows a deployment URL 'my-site.vercel.app'.

```bash
REDWOOD_ENV_VERCEL_URL=my-site.vercel.app
```

--------------------------------

### Get Help Information for Vercel CLI Commands

Source: https://vercel.com/docs/cli

Access help documentation for the Vercel CLI. You can get general information about all available commands or specific details for a particular command.

```bash
vercel help
vercel help [command]
```

--------------------------------

### Retrieve Vercel Blob Folders with `list()` Method

Source: https://vercel.com/docs/storage/vercel-blob/using-blob-sdk

This example illustrates how to use the `list()` method with the `mode: 'folded'` option to retrieve folder structures from a Vercel Blob store. It shows how to get root-level folders and then list contents within a specific folder using the `prefix` parameter.

```TypeScript
const {
  folders: [firstFolder],
  blobs: rootBlobs,
} = await list({ mode: 'folded' });
 
const { folders, blobs } = await list({ mode: 'folded', prefix: firstFolder });
```

--------------------------------

### Install curl on different operating systems

Source: https://vercel.com/docs/cli/curl

Install the curl command-line tool as a prerequisite for using vercel curl. Provides installation commands for macOS, Ubuntu/Debian, and Windows.

```bash
# macOS (using Homebrew)
brew install curl

# Ubuntu/Debian
sudo apt-get install curl

# Windows (using Chocolatey)
choco install curl
```

--------------------------------

### RuntimeCache - Complete Usage Example

Source: https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package

A complete example demonstrating how to use the RuntimeCache API to fetch data from an external API, cache it with TTL and tags, and handle cache hits and misses.

```APIDOC
## RuntimeCache Complete Example

### Description
Complete example showing cache retrieval, external API fetch, and cache storage with TTL and tags.

### Code Example
```ts
import { getCache } from '@vercel/functions';

export default {
  async fetch(request) {
    const cache = getCache();

    // Attempt to get value from cache
    const value = await cache.get('somekey');

    if (value) {
      return new Response(JSON.stringify(value));
    }

    // Cache miss: fetch from external API
    const res = await fetch('https://api.vercel.app/blog');
    const originValue = await res.json();

    // Store in cache with 1 hour TTL and tags
    await cache.set('somekey', originValue, {
      ttl: 3600,
      tags: ['example-tag']
    });

    return new Response(JSON.stringify(originValue));
  }
};
```

### Tag-Based Invalidation Example
```ts
'use server';

import { getCache } from '@vercel/functions';

export default async function action() {
  await getCache().expireTag('blog');
}
```
```

--------------------------------

### Construct Provider-Initiated SSO URL

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api

Build a URL to initiate the SSO process from the integration provider's side. The URL includes the integration's URLSlug, installation ID, and optional query parameters. This enables seamless authentication for users accessing Vercel Marketplace integrations from the provider's platform.

```text
https://vercel.com/sso/integrations/{URLSlug}/{installationId}?{query}
```

```text
https://vercel.com/sso/integrations/aws-marketplace-integration-demo/icfg_PSFtkFqr5djKRtOkNtOHIfSd?resource_id=123456
```

--------------------------------

### Initialize Statsig with Edge Config in Vercel Middleware (Generic)

Source: https://vercel.com/docs/edge-config/edge-config-integrations/statsig-edge-config

Example of setting up a Statsig experiment within a generic Vercel Middleware file. It uses `EdgeConfigDataAdapter` to connect Statsig to an Edge Config, initializing Statsig with a server API key and retrieving an experiment based on a user ID. Requires `EDGE_CONFIG` and `EDGE_CONFIG_ITEM_KEY` environment variables.

```typescript
import type { VercelRequest } from '@vercel/node';
import Statsig from 'statsig-node';
import { createClient } from '@vercel/edge-config';
import { EdgeConfigDataAdapter } from 'statsig-node-vercel';

export const config = {
  matcher: '/'
};

const edgeConfigClient = createClient(process.env.EDGE_CONFIG!);
const dataAdapter = new EdgeConfigDataAdapter({
  edgeConfigClient: edgeConfigClient,
  edgeConfigItemKey: process.env.EDGE_CONFIG_ITEM_KEY!
});

export async function middleware(request: VercelRequest) {
  await Statsig.initialize('statsig-server-api-key-here', { dataAdapter });

  const experiment = await Statsig.getExperiment(
    { userID: 'exampleId' },
    'statsig_example_experiment'
  );
}
```

--------------------------------

### API Versioning

Source: https://vercel.com/docs/rest-api/reference

Learn about Vercel API versioning strategy. Each endpoint has its own version specified in the base URL. Versions are not global, and new response fields may be added without version bumps.

```APIDOC
## API Versioning

### Description
All Vercel API endpoints are designated with specific versions. Versions are per-endpoint (not global) and the response shape may change over time with new fields added without version bumps.

### Versioning Strategy
- Versions are specified in the endpoint URL path after the base URL
- Each endpoint can have its own version number
- New response fields may be added without incrementing the version
- Old endpoint versions are supported as long as possible
- Deprecations are announced in the changelog

### Endpoint URL Format
```
https://api.vercel.com/[VERSION]/[ENDPOINT]
```

### Example
```
https://api.vercel.com/v6/deployments
```
This example uses version 6 of the deployments endpoint.

### Important Notes
- Response shape is not guaranteed to remain fixed over time
- Only read keys from responses that your application needs
- Do not proxy entire responses to third-parties without validation
- Check the changelog for updates and deprecation notices
- Ensure your application handles new response fields gracefully
```

--------------------------------

### sandbox --help

Source: https://vercel.com/docs/vercel-sandbox/cli-reference

Get help information for all available sandbox commands and subcommands, listing their purpose and aliases.

```APIDOC
## COMMAND sandbox --help

### Description
Get help information for all available sandbox commands and subcommands, listing their purpose and aliases.

### Method
COMMAND

### Endpoint
sandbox <subcommand> --help

### Parameters
#### Path Parameters
- **subcommand** (string) - Optional - The specific subcommand to get help for.

#### Query Parameters
- **--help** (-h) (boolean) - Optional - Display help information for the main command or a subcommand.

#### Request Body
(None)

### Request Example
```bash
sandbox --help
sandbox list --help
```

### Response
#### Success Response (200)
- **output** (string) - Description of available commands and their usage.

#### Response Example
```text
Interfacing with Vercel Sandbox

Available subcommands:
- list: List all sandboxes for the specified account and project. [alias: ls]
- create: Create a sandbox in the specified account and project.
...
For more help, try running sandbox <subcommand> --help
```
```

--------------------------------

### Initialize a new project directory for LangChain integration

Source: https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langchain

This sequence of bash commands sets up a new project directory named `langchain-ai-gateway`, navigates into it, and initializes a new Node.js project using `pnpm dlx init -y`.

```bash
mkdir langchain-ai-gateway
cd langchain-ai-gateway
pnpm dlx init -y
```

--------------------------------

### Configure Image Optimization Settings in JSON

Source: https://vercel.com/docs/build-output-api/configuration

Demonstrates a complete image optimization configuration specifying allowed image dimensions (sizes), caching lifetime (minimumCacheTTL), supported output formats, quality levels, and both local and remote URL patterns for image sources. This example restricts optimization to specific domains and paths.

```json
{
  "images": {
    "sizes": [640, 750, 828, 1080, 1200],
    "domains": [],
    "minimumCacheTTL": 60,
    "formats": ["image/avif", "image/webp"],
    "qualities": [25, 50, 75],
    "localPatterns": [{
      "pathname": "^/assets/.*$",
      "search": ""
    }],
    "remotePatterns": [{
      "protocol": "https",
      "hostname": "^via\\.placeholder\\.com$",
      "port": "",
      "pathname": "^/1280x640/.*$",
      "search": "?v=1"
    }]
  }
}
```

--------------------------------

### Start OpenCode in Terminal

Source: https://vercel.com/docs/ai-gateway/coding-agents/opencode

Launch the OpenCode terminal-based AI coding assistant by running the opencode command. This initializes the interactive environment where you can configure and use OpenCode with various AI models.

```bash
opencode
```

--------------------------------

### Override Development Command in Vercel with vercel.json

Source: https://vercel.com/docs/project-configuration/vercel-json

This example shows how to use the `devCommand` property in `vercel.json` to override the default Development Command set in Project Settings. This is useful for projects requiring a custom command to start the development server.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "devCommand": "next dev"
}
```

--------------------------------

### Configure Rolling Release with Automatic Advancement

Source: https://vercel.com/docs/cli/rolling-release

Configures a Vercel project's rolling release settings for automatic advancement between stages. This example sets up a release to start at 10% traffic, automatically advance after 5 minutes, and then proceed to 100%.

```bash
vercel rolling-release configure --cfg='{"enabled":true, "advancementType":"automatic", "stages":[{"targetPercentage":10,"duration":5},{"targetPercentage":100}]}'
```

--------------------------------

### Manage Redirects with Vercel CLI

Source: https://vercel.com/docs/redirects/bulk-redirects/getting-started

Use the Vercel CLI (version 49.1.3 or later) to list, add, upload, remove, and promote redirects without requiring a redeployment. Supports bulk CSV uploads and staging/production promotion workflows.

```bash
# List all redirects
vercel redirects ls

# List all redirects versions
vercel redirects ls-versions

# Add a redirect
vercel redirects add /old-path /new-path --permanent

# Bulk upload CSV files
vercel redirects upload my-redirects.csv

# Remove a redirect
vercel redirects rm /old-path

# Promote staging redirects
vercel redirects promote 596558a5-24cd-4b94-b91a-d1f4171b7c3f
```

--------------------------------

### PUT /v1/installations/{installationId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/upsert-installation

Create or update an installation.

```APIDOC
## PUT /v1/installations/{installationId}

### Description
Create or update an installation.

### Method
PUT

### Endpoint
/v1/installations/{installationId}

### Parameters
#### Path Parameters
- **installationId** (string) - Required -

#### Header Parameters
- **X-Vercel-Auth** (string) - Optional - The auth style used in the request (system, user, etc)
- **Idempotency-Key** (string) - Optional - A unique key to identify a request across multiple retries

#### Request Body
- **scopes** (array of string) - Required -
- **acceptedPolicies** (object) - Required - Policies accepted by the customer.
  - Example: `{"toc": "2024-02-28T10:00:00Z"}`
- **credentials** (object) - Required -
  - **access_token** (string) - Required - Access token authorizes marketplace and integration APIs.
  - **token_type** (string) - Required - The type of token (default: `Bearer`).
- **account** (object) - Required -
  - **name** (string) - Optional -
  - **url** (string) - Required -
  - **contact** (object) - Optional -
    - **email** (string) - Required -
    - **name** (string) - Optional -

### Request Example
```json
{
  "scopes": [
    "integration_scope_1",
    "integration_scope_2"
  ],
  "acceptedPolicies": {
    "toc": "2024-02-28T10:00:00Z"
  },
  "credentials": {
    "access_token": "your_access_token_here",
    "token_type": "Bearer"
  },
  "account": {
    "name": "My Vercel Account",
    "url": "https://vercel.com/my-account-id",
    "contact": {
      "email": "contact@example.com",
      "name": "John Doe"
    }
  }
}
```

### Response
#### Success Response (200)
No specific fields described.

#### Response Example
No example provided.
```

--------------------------------

### Execute TypeScript AI Gateway script with pnpm tsx

Source: https://vercel.com/docs/ai-gateway/getting-started

This `bash` command executes the `index.ts` TypeScript file, which contains the AI Gateway interaction logic. It leverages `pnpm tsx` to run the TypeScript code directly without prior compilation, demonstrating how to quickly test your AI model requests.

```bash
pnpm tsx index.ts
```

--------------------------------

### Initiate Resource Transfer Request via HTTP POST

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/create-resource-transfer

This HTTP POST request prepares to transfer resources from a specified installation to a new one. The target installation is determined in subsequent verification steps. It requires an `installationId` in the path.

```http
POST /v1/installations/{installationId}/resource-transfer-requests
```

--------------------------------

### Get Vercel Git Commit Author Login for Vue.js (Bash)

Source: https://vercel.com/docs/environment-variables/framework-environment-variables

This environment variable provides the username (login) of the author of the Git commit that initiated the Vercel project deployment. It is accessible during both build and runtime. The example shows a username 'johndoe'.

```bash
VUE_APP_VERCEL_GIT_COMMIT_AUTHOR_LOGIN=johndoe
```

--------------------------------

### POST /api/avatar/upload

Source: https://vercel.com/docs/vercel-blob/client-upload

Handles file upload requests by generating client tokens and processing upload completion callbacks. This endpoint manages the entire upload lifecycle including authentication, token generation, and post-upload operations.

```APIDOC
## POST /api/avatar/upload

### Description
Handles file upload requests for avatar images. Generates secure client tokens for browser uploads and processes upload completion callbacks from Vercel API.

### Method
POST

### Endpoint
/api/avatar/upload

### Parameters
#### Request Body
- **body** (HandleUploadBody) - Required - The upload request body containing upload metadata and configuration

### Request Processing

#### onBeforeGenerateToken
Callback executed before generating the client token. Used to authenticate users and configure upload restrictions.

**Parameters:**
- **pathname** (string) - Required - The file path for the upload
- **clientPayload** (object) - Optional - Custom payload from the client

**Returns:**
- **allowedContentTypes** (string[]) - Required - Array of permitted MIME types (e.g., 'image/jpeg', 'image/png', 'image/webp')
- **addRandomSuffix** (boolean) - Optional - Automatically append random suffix to filename
- **callbackUrl** (string) - Optional - URL for upload completion callback (auto-computed on Vercel)
- **tokenPayload** (string) - Optional - JSON stringified data sent to server on upload completion

#### onUploadCompleted
Callback executed by Vercel API after successful file upload completion.

**Parameters:**
- **blob** (object) - Required - Upload blob object containing file metadata and URL
- **tokenPayload** (string) - Optional - The token payload passed during token generation

### Request Example
```json
{
  "allowedContentTypes": ["image/jpeg", "image/png", "image/webp"],
  "addRandomSuffix": true,
  "tokenPayload": "{\"userId\": \"user123\"}"
}
```

### Response
#### Success Response (200)
- **jsonResponse** (object) - Upload response containing client token and upload configuration

#### Response Example
```json
{
  "token": "client_token_string",
  "uploadUrl": "https://blob.vercelusercontent.com/upload"
}
```

#### Error Response (400)
- **error** (string) - Error message describing the failure
- **status** (number) - HTTP status code 400

#### Error Example
```json
{
  "error": "Could not update user"
}
```

### Error Handling
- Returns 400 status on errors
- Webhook will retry up to 5 times waiting for status 200
- Errors thrown in onUploadCompleted should be caught and handled appropriately

### Security Notes
- Always authenticate and authorize users before generating tokens
- Validate clientPayload to prevent unauthorized uploads
- Use allowedContentTypes to restrict file types
- Implement proper error handling in onUploadCompleted callback

### Implementation Notes
- Use ngrok for local testing with Vercel webhooks
- callbackUrl is automatically computed when hosted on Vercel
- tokenPayload can contain user IDs or custom data for post-upload processing
- Supports both TypeScript and JavaScript implementations
```

--------------------------------

### Pre-install message handler for missing credentials

Source: https://vercel.com/docs/private-registry

Node.js script that detects the active package manager and provides appropriate login instructions when users attempt to install packages without authentication. Supports pnpm, yarn, npm, and bun with context-aware error messaging.

```javascript
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execPromise = promisify(exec);

// Detect which package manager is being used
const userAgent = process.env.npm_config_user_agent || '';
const isYarn = userAgent.includes('yarn');
const isPnpm = userAgent.includes('pnpm');
const isBun = userAgent.includes('bun');

let checkCommand;
let loginCommand;

if (isPnpm) {
  checkCommand =
    'pnpm whoami --registry=https://vercel-private-registry.vercel.sh/registry';
  loginCommand = 'pnpm login --scope=@vercel-private';
} else if (isYarn) {
  checkCommand = 'yarn npm whoami --scope=vercel-private';
  loginCommand = 'npm login --scope=@vercel-private';
} else {
  // npm or bun
  checkCommand =
    'npm whoami --registry=https://vercel-private-registry.vercel.sh/registry';
  loginCommand = 'npm login --scope=@vercel-private';
}

try {
```

--------------------------------

### Store Product Integration Parameter

Source: https://vercel.com/docs/deploy-button/source

Configure default store product integrations by passing a JSON object converted to a string. Allows you to specify integration slug, product slug, type, and protocol for store product setup.

```APIDOC
## Deploy Button - Store Product Integration Parameter

### Description
Defines default store product integrations for the Vercel project creation flow. Requires a JSON object converted to a URL-encoded string.

### Parameter
- **stores** (string) - Optional - A default JSON object converted to a string

### JSON Object Structure
```json
{
  "type": "integration",
  "integrationSlug": "my-integration-slug",
  "productSlug": "my-product-slug",
  "protocol": "storage"
}
```

### Encoding Example
```javascript
const jsonParam = encodeURIComponent(
  JSON.stringify([
    {
      type: 'integration',
      integrationSlug: 'my-integration-slug',
      productSlug: 'my-product-slug',
      protocol: 'storage'
    }
  ])
);
```

### Request Example
```
https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fvercel%2Ftree%2Fmain%2Fexamples%2Fnextjs&project-name=my-awesome-project&repository-name=my-awesome-project&stores=%5B%7B%22type%22%3A%22integration%22%2C%22integrationSlug%22%3A%22aws-marketplace-integration-demo%22%2C%22productSlug%22%3A%22vector%22%7D%5D
```

### Notes
- Parameter accepts an array of integration objects
- Must be properly URL-encoded
- Supports multiple integrations in a single parameter
- Common protocol values: 'storage'
```

--------------------------------

### Example JSON Response for Get Domain API

Source: https://vercel.com/docs/rest-api/reference/endpoints/domains/get-information-for-a-single-domain

This JSON object represents a successful response (HTTP 200) from the Vercel API when retrieving domain information for a specific domain. It includes various attributes such as domain name, verification status, nameservers, creator details, timestamps (boughtAt, createdAt, expiresAt), and registrar information.

```json
{
  "domain": {
    "suffix": false,
    "verified": true,
    "nameservers": [
      "ns1.nameserver.net",
      "ns2.nameserver.net"
    ],
    "intendedNameservers": [
      "ns1.vercel-dns.com",
      "ns2.vercel-dns.com"
    ],
    "creator": {
      "id": "ZspSRT4ljIEEmMHgoDwKWDei",
      "username": "vercel_user",
      "email": "demo@example.com"
    },
    "name": "example.com",
    "teamId": "<string>",
    "boughtAt": 1613602938882,
    "createdAt": 1613602938882,
    "expiresAt": 1613602938882,
    "id": "EmTbe5CEJyTk2yVAHBUWy4A3sRusca3GCwRjTC1bpeVnt1",
    "serviceType": "zeit.world",
    "userId": "<string>",
    "customNameservers": [
      "ns1.nameserver.net",
      "ns2.nameserver.net"
    ],
    "registrar": "new",
    "renew": true,
    "transferredAt": 1613602938882,
    "transferStartedAt": 1613602938882
  }
}
```

--------------------------------

### Basic Usage of vercel open Command

Source: https://vercel.com/docs/cli/open

Demonstrates the fundamental way to use the `vercel open` command to launch the Vercel Dashboard for the current project in your default browser. This command requires the current directory to be linked to a Vercel project.

```bash
vercel open
```

--------------------------------

### Command.exitCode

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

Property that holds the process exit status once the command finishes. For detached commands, this value starts as null and gets populated after awaiting command.wait(). Check for null to determine if the command is still running.

```APIDOC
## Command.exitCode

### Description
The exitCode property holds the process exit status once the command finishes. For detached commands, this value starts as null and gets populated after you await command.wait().

### Property Type
`number | null`

### Usage Example
```ts
if (command.exitCode !== null) {
  console.log(`Command exited with code: ${command.exitCode}`);
}
```

### Returns
`number | null` - The exit code of the process, or null if the command is still running.
```

--------------------------------

### Image Optimization URL Format Examples

Source: https://vercel.com/docs/image-optimization

Examples of dynamically generated Image Optimization URLs for different frameworks. The src prop is replaced with an optimized image URL containing query parameters for width (w) and quality (q). These URLs are automatically generated when using the Image component in supported frameworks deployed on Vercel.

```url
/_next/image?url={link/to/src/image}&w=3840&q=75
```

```url
/_vercel/image?url={link/to/src/image}&w=3840&q=75
```

--------------------------------

### Install Blackbox AI CLI on macOS/Linux and Windows

Source: https://vercel.com/docs/ai-gateway/coding-agents/blackbox

These commands install the Blackbox AI CLI on different operating systems. The macOS/Linux command uses `curl` to download and execute an installation script, while the Windows command uses `Invoke-WebRequest` in PowerShell to download and run its respective script.

```bash
curl -fsSL https://blackbox.ai/install.sh | bash
```

```powershell
Invoke-WebRequest -Uri "https://blackbox.ai/install.ps1" -OutFile "install.ps1"; .\install.ps1
```

--------------------------------

### Get Sandbox Creation Timestamp in TypeScript

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

This TypeScript example illustrates how to retrieve the exact date and time when a sandbox instance was created using the `createdAt` accessor. The returned `Date` object can be used to track the age of the sandbox or calculate its running duration. This is useful for monitoring and resource management within your application.

```typescript
console.log(sandbox.createdAt);
```

--------------------------------

### Sample Response for GET /credits

Source: https://vercel.com/docs/ai-gateway/capabilities/usage

This JSON object illustrates the typical response structure when querying the AI Gateway `/credits` endpoint, showing the remaining credit balance and the total amount of credits used.

```json
{
  "balance": "95.50",
  "total_used": "4.50"
}
```

--------------------------------

### Create Flags Discovery Endpoint for Next.js App Router

Source: https://vercel.com/docs/feature-flags/flags-explorer/getting-started

Set up a route handler at app/.well-known/vercel/flags/route using the App Router. The createFlagsDiscoveryEndpoint helper simplifies endpoint creation by automatically handling authentication and returning provider data.

```typescript
import { getProviderData, createFlagsDiscoveryEndpoint } from 'flags/next';
import * as flags from '../../../../flags';

export const GET = createFlagsDiscoveryEndpoint(() => getProviderData(flags));
```

```javascript
import { getProviderData, createFlagsDiscoveryEndpoint } from 'flags/next';
import * as flags from '../../../../flags';

export const GET = createFlagsDiscoveryEndpoint(() => getProviderData(flags));
```

--------------------------------

### CONFIGURE /config/installCommand

Source: https://vercel.com/docs/project-configuration/vercel-ts

Overrides the default install command for a deployment, allowing specification of a custom package manager or skipping the installation step entirely.

```APIDOC
## CONFIGURE /config/installCommand

### Description
This property overrides the Install Command in Project Settings for a given deployment. It's useful for trying out a new package manager or explicitly skipping the install step by providing an empty string.

### Method
CONFIGURE

### Endpoint
/config/installCommand

### Parameters
#### Request Body
- **installCommand** (string | null) - Required - The command to execute for installing project dependencies. An empty string will cause the Install Command to be skipped.

### Request Example
```json
{
  "installCommand": "npm install"
}
```

### Response
#### Success Response (200)
- **message** (string) - Indicates successful configuration.

#### Response Example
```json
{
  "message": "Install command updated successfully."
}
```
```

--------------------------------

### List Models API Response Format

Source: https://vercel.com/docs/ai-gateway/openai-compat

Example response from the GET /models endpoint showing the OpenAI API format. The response contains a list of model objects with IDs, object types, creation timestamps, and ownership information for each available model.

```json
{
  "object": "list",
  "data": [
    {
      "id": "anthropic/claude-sonnet-4.5",
      "object": "model",
      "created": 1677610602,
      "owned_by": "anthropic"
    },
    {
      "id": "openai/gpt-5.2",
      "object": "model",
      "created": 1677610602,
      "owned_by": "openai"
    }
  ]
}
```

--------------------------------

### Generate AI responses using OpenResponses API with Vercel AI Gateway

Source: https://vercel.com/docs/ai-gateway/getting-started

This snippet demonstrates direct HTTP requests to the OpenResponses API endpoint provided by Vercel's AI Gateway. It shows how to make a POST request with the necessary headers (Content-Type, Authorization) and a JSON body to generate an AI response.

```typescript
import 'dotenv/config';

async function main() {
  const response = await fetch('https://ai-gateway.vercel.sh/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.AI_GATEWAY_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4.5',
      input: [
        {
          type: 'message',
          role: 'user',
          content: 'Invent a new holiday and describe its traditions.',
        },
      ],
    }),
  });

  const result = await response.json();
  console.log(result.output[0].content[0].text);
}

main().catch(console.error);
```

```python
import os
import requests
from dotenv import load_dotenv

load_dotenv()

response = requests.post(
    'https://ai-gateway.vercel.sh/v1/responses',
    headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {os.getenv("AI_GATEWAY_API_KEY")}',
    },
    json={
        'model': 'anthropic/claude-sonnet-4.5',
        'input': [
            {
                'type': 'message',
                'role': 'user',
                'content': 'Invent a new holiday and describe its traditions.',
            },
        ],
    },
)

result = response.json()
print(result['output'][0]['content'][0]['text'])
```

--------------------------------

### Check Command Exit Code in TypeScript

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

Shows how to access the exitCode property of a Command instance to determine if a process has finished executing. For detached commands, exitCode starts as null and gets populated after awaiting command.wait().

```typescript
if (command.exitCode !== null) {
  console.log(`Command exited with code: ${command.exitCode}`);
}
```

--------------------------------

### Discover and List AI Models with Pricing using AI SDK Gateway (TypeScript)

Source: https://vercel.com/docs/ai-gateway/models-and-providers

This code illustrates how to programmatically retrieve and display detailed information about available AI models configured for the `gateway` provider using the AI SDK's `getAvailableModels` function. It iterates through the models, logging their ID, name, description, and various pricing details, including tiered pricing. It also shows a basic `generateText` call using one of the discovered models.

```typescript
import { gateway } from '@ai-sdk/gateway';
import { generateText } from 'ai';

const availableModels = await gateway.getAvailableModels();

availableModels.models.forEach((model) => {
  console.log(`${model.id}: ${model.name}`);
  if (model.description) {
    console.log(`  Description: ${model.description}`);
  }
  if (model.pricing) {
    console.log(`  Input: $${model.pricing.input}/token`);
    console.log(`  Output: $${model.pricing.output}/token`);

    // Some models have tiered pricing based on context size
    if (model.pricing.inputTiers) {
      console.log('  Input tiers:');
      model.pricing.inputTiers.forEach((tier) => {
        const range =
          tier.max !== undefined ? `${tier.min}-${tier.max}` : `${tier.min}+`;
        console.log(`    ${range} tokens: $${tier.cost}/token`);
      });
    }

    if (model.pricing.cachedInputTokens) {
      console.log(
        `  Cached input (read): $${model.pricing.cachedInputTokens}/token`,
      );
    }
    if (model.pricing.cacheCreationInputTokens) {
      console.log(
        `  Cache creation (write): $${model.pricing.cacheCreationInputTokens}/token`,
      );
    }
  }
});

const { text } = await generateText({
  model: availableModels.models[0].id, // e.g., 'openai/gpt-5.2'
  prompt: 'Hello world',
});
```

--------------------------------

### Configure bulkRedirectsPath in vercel.json

Source: https://vercel.com/docs/redirects/bulk-redirects/getting-started

Add the bulkRedirectsPath property to your vercel.json configuration file to specify the location of your redirect file or folder containing multiple redirect files (up to 100 files supported).

```json
{
  "bulkRedirectsPath": "redirects.csv"
}
```

--------------------------------

### Provision Resource: HTTP POST Endpoint

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/provision-resource

This snippet shows the HTTP POST endpoint for provisioning a resource. It targets a specific installation ID and is the entry point for initiating resource creation.

```http
POST /v1/installations/{installationId}/resources
```

--------------------------------

### Implement Tag-based Caching for Products in Next.js App Router

Source: https://vercel.com/docs/runtime-cache

This example shows how to fetch and cache product data within a Next.js App Router route. It uses the `GET` export to handle requests and applies `cacheTag` and `cacheLife` to associate the data with a 'products' tag and set a 1-hour expiry, enabling efficient revalidation.

```typescript
import { cacheLife, cacheTag } from 'next/cache';

export async function GET() {
  const data = await getProducts();
  return Response.json(data);
}

async function getProducts() {
  'use cache: remote'
  cacheTag('products')
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/products');
  return response.json();
}
```

```javascript
import { cacheLife, cacheTag } from 'next/cache';

export async function GET() {
  const data = await getProducts();
  return Response.json(data);
}

async function getProducts() {
  'use cache: remote'
  cacheTag('products')
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/products');
  return response.json();
}
```

--------------------------------

### Installation Management Endpoints

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

Endpoints for managing marketplace integration installations. Partners must implement these endpoints to handle installation lifecycle events including creation, updates, and deletion of integration installations.

```APIDOC
## Installation Management

### GET Installation

#### Description
Retrieve details of a specific marketplace integration installation.

#### Method
GET

#### Endpoint
`/installations/{installation_id}`

#### Parameters

##### Path Parameters
- **installation_id** (string) - Required - The ID of the installation to retrieve

#### Authentication
Requires valid OIDC JWT token in Authorization header

#### Response
- **installation_id** (string) - The installation identifier
- **account_id** (string) - The associated account identifier
- **status** (string) - Installation status

---

### POST Upsert Installation

#### Description
Create or update a marketplace integration installation. This endpoint handles both new installations and updates to existing installations.

#### Method
POST

#### Endpoint
`/installations`

#### Request Body
- **installation_id** (string) - Required - The installation identifier
- **account_id** (string) - Required - The associated account identifier
- **configuration** (object) - Optional - Installation configuration details

#### Authentication
Requires valid OIDC JWT token in Authorization header

#### Response
- **installation_id** (string) - The created or updated installation identifier
- **status** (string) - Installation status

---

### PUT Update Installation

#### Description
Update an existing marketplace integration installation with new configuration or status information.

#### Method
PUT

#### Endpoint
`/installations/{installation_id}`

#### Parameters

##### Path Parameters
- **installation_id** (string) - Required - The ID of the installation to update

#### Request Body
- **configuration** (object) - Optional - Updated installation configuration
- **status** (string) - Optional - Updated installation status

#### Authentication
Requires valid OIDC JWT token in Authorization header

#### Response
- **installation_id** (string) - The updated installation identifier
- **status** (string) - Updated installation status

---

### DELETE Installation

#### Description
Delete or uninstall a marketplace integration installation. This removes the integration from the account.

#### Method
DELETE

#### Endpoint
`/installations/{installation_id}`

#### Parameters

##### Path Parameters
- **installation_id** (string) - Required - The ID of the installation to delete

#### Authentication
Requires valid OIDC JWT token in Authorization header

#### Response
- **status** (string) - Deletion status confirmation
```

--------------------------------

### Implement Streaming Chat Completions with Provider Options (TypeScript, Python)

Source: https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-compat/advanced

This example illustrates how to use provider options with streaming chat completion requests. It configures the AI Gateway to try providers in a specific `order` (e.g., 'vertex', 'anthropic') when making a streaming request. The client initializes with the AI Gateway, sends a streaming chat completion request, and then iterates over the chunks to print the content as it arrives.

```typescript
import OpenAI from 'openai';

const apiKey = process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN;

const openai = new OpenAI({
  apiKey,
  baseURL: 'https://ai-gateway.vercel.sh/v1',
});

// @ts-expect-error
const stream = await openai.chat.completions.create({
  model: 'anthropic/claude-sonnet-4.5',
  messages: [
    {
      role: 'user',
      content:
        'Tell me the history of the San Francisco Mission-style burrito in two paragraphs.',
    },
  ],
  stream: true,
  providerOptions: {
    gateway: {
      order: ['vertex', 'anthropic'],
    },
  },
});

for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content;
  if (content) {
    process.stdout.write(content);
  }
}
```

```python
import os
from openai import OpenAI

api_key = os.getenv('AI_GATEWAY_API_KEY') or os.getenv('VERCEL_OIDC_TOKEN')

client = OpenAI(
    api_key=api_key,
    base_url='https://ai-gateway.vercel.sh/v1'
)

stream = client.chat.completions.create(
    model='anthropic/claude-sonnet-4.5',
    messages=[
        {
            'role': 'user',
            'content': 'Tell me the history of the San Francisco Mission-style burrito in two paragraphs.'
        }
    ],
    stream=True,
    extra_body={
        'providerOptions': {
            'gateway': {
                'order': ['vertex', 'anthropic']
            }
        }
    }
)

for chunk in stream:
    content = chunk.choices[0].delta.content
    if content:
        print(content, end='', flush=True)
```

--------------------------------

### Configure ISR with routeRules in Nuxt

Source: https://vercel.com/docs/incremental-static-regeneration/quickstart

Enable Incremental Static Regeneration in Nuxt by adding a routeRules option to the Nuxt config. The isr property specifies the cache revalidation interval in seconds for specified routes.

```typescript
export default defineNuxtConfig({
  routeRules: {
    // This route will be revalidated
    // every 10 seconds in the background
    '/blog-posts': { isr: 10 },
  },
});
```

```javascript
export default defineNuxtConfig({
  routeRules: {
    // This route will be revalidated
    // every 10 seconds in the background
    '/blog-posts': { isr: 10 },
  },
});
```

--------------------------------

### Get system environment variables with get_env

Source: https://vercel.com/docs/functions/functions-api-reference/vercel-sdk-python

Retrieve system environment variables exposed by Vercel using the get_env() method. This example demonstrates accessing the VERCEL_REGION variable to determine the deployment region.

```python
from vercel.functions import get_env

print(get_env().VERCEL_REGION)
```

--------------------------------

### Create Client Upload Page with JavaScript (Next.js App Router)

Source: https://vercel.com/docs/vercel-blob/client-upload

Implement a client-side file upload component for Next.js App Router using JavaScript. Files are uploaded directly from the browser to Vercel Blob with secure token exchange. Includes file type validation for images.

```javascript
'use client';

import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';

export default function AvatarUploadPage() {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);
  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const file = inputFileRef.current.files[0];

          const newBlob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/avatar/upload',
          });

          setBlob(newBlob);
        }}
      >
        <input
          name="file"
          ref={inputFileRef}
          type="file"
          accept="image/jpeg, image/png, image/webp"
          required
        />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
```

--------------------------------

### Get Vercel Git Commit Reference for Vue.js (Bash)

Source: https://vercel.com/docs/environment-variables/framework-environment-variables

This environment variable stores the Git branch name (reference) of the commit that initiated the Vercel deployment. It is available at both build and runtime. The example shows a branch named 'improve-about-page'.

```bash
VUE_APP_VERCEL_GIT_COMMIT_REF=improve-about-page
```

--------------------------------

### Retrieve Paginated API Results with Node.js

Source: https://vercel.com/docs/rest-api/reference

Demonstrates fetching all projects from Vercel API using Node.js with axios. Implements pagination loop that continues requesting data using the 'until' query parameter with timestamps from the pagination object until no more pages exist. Results are saved to a JSON file.

```javascript
const axios = require('axios');
const fs = require('fs');
const vercelToken = 'yourtokenvalue';
const apiEndPt = 'https://api.vercel.com/v9/projects';

let config = {
  method: 'get',
  url: apiEndPt,
  headers: {
    Authorization: 'Bearer ' + vercelToken,
  },
};
let results = [];

(function loop() {
  axios(config)
    .then(function (response) {
      results.push(...response.data.projects);
      if (response.data.pagination.next !== null) {
        config.url = `${apiEndPt}?until=${response.data.pagination.next}`;
        loop();
      } else {
        fs.writeFileSync('projects.json', JSON.stringify(results));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
})();
```

--------------------------------

### Create CSV Redirect File

Source: https://vercel.com/docs/redirects/bulk-redirects/getting-started

Define bulk redirects in CSV format with source, destination, and permanent status columns. This file can be created manually or generated at build time and must be placed in the location specified by bulkRedirectsPath before the build completes.

```csv
source,destination,permanent
/old-blog,/blog,true
/old-about,/about,false
/legacy-contact,https://example.com/contact,true
```

--------------------------------

### Get Member Successful Response JSON

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-member

JSON response structure returned on successful member information retrieval (HTTP 200). Contains member ID, role (ADMIN or USER), global user ID, and email address. The ADMIN role is assigned to users who can install integrations, while USER role is for Vercel users with Billing or Viewer permissions.

```json
{
  "id": "string",
  "role": "string",
  "globalUserId": "string",
  "userEmail": "string"
}
```

--------------------------------

### Deploy a Vercel Project from Source using Vercel CLI

Source: https://vercel.com/docs/cli/deploying-from-cli

Learn to deploy a Vercel project from its root directory or a specified path using the `vercel` or `vercel deploy` commands. This section also demonstrates how to capture the deployment URL output to a file.

```bash
vercel
```

```bash
vercel [path-to-project]
```

```bash
vercel > deployment-url.txt
```

--------------------------------

### Handle Client Upload Route with Token Generation - JavaScript

Source: https://vercel.com/docs/vercel-blob/client-upload

Next.js API route handler in JavaScript that manages client uploads by generating authentication tokens and handling upload completion callbacks. Validates file types, generates tokens with optional random suffixes, and processes post-upload logic such as database updates.

```javascript
import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        // Generate a client token for the browser to upload the file
        // Make sure to authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          addRandomSuffix: true,
          // callbackUrl: 'https://example.com/api/avatar/upload',
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
```

--------------------------------

### Example `marketplace.invoice.refunded` Webhook Payload JSON

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api

This JSON object illustrates the structure of the `marketplace.invoice.refunded` webhook payload. It contains information such as the event ID, type, and an `invoice` object detailing the invoice ID, installation ID, original amount, currency, the specific `refundAmount`, and the `refundedAt` timestamp.

```json
{
  "id": "evt_jkl012",
  "type": "marketplace.invoice.refunded",
  "payload": {
    "invoice": {
      "id": "inv_xyz789",
      "installationId": "icfg_def456",
      "amount": 29.99,
      "currency": "USD",
      "refundAmount": 29.99,
      "refundedAt": "2025-01-21T10:00:00Z"
    }
  }
}
```

--------------------------------

### Conditional Rewrite Based on Header Value in Vercel

Source: https://vercel.com/docs/project-configuration/vercel-ts

Rewrite requests conditionally based on HTTP headers. This example rewrites paths not starting with /uk/ to /uk/:path when the x-vercel-ip-country header equals GB, enabling geo-based routing.

```typescript
import { routes, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  rewrites: [
    routes.rewrite('/:path((?!uk/).*)', '/uk/:path*', {
      has: [
        {
          type: 'header',
          key: 'x-vercel-ip-country',
          value: 'GB',
        },
      ],
    }),
  ],
};
```

--------------------------------

### POST /v1/installations/{installationId}/resources/{resourceId}/repl

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

Perform a REPL operation on a specific resource.

```APIDOC
## POST /v1/installations/{installationId}/resources/{resourceId}/repl

### Description
Resource REPL

### Method
POST

### Endpoint
/v1/installations/{installationId}/resources/{resourceId}/repl

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
- **resourceId** (string) - Required - The ID of the resource.
```

--------------------------------

### Example `put()` response with random suffix enabled

Source: https://vercel.com/docs/storage/vercel-blob/using-blob-sdk

Provides a concrete example of the JSON response when a blob is uploaded using `put()` with `addRandomSuffix: true`. It shows how the `pathname` and `filename` in `contentDisposition` include a unique random string to ensure uniqueness.

```json
{
  "pathname": "profilesv1/user-12345-NoOVGDVcqSPc7VYCUAGnTzLTG2qEM2.txt",
  "contentType": "text/plain",
  "contentDisposition": "attachment; filename=\"user-12345-NoOVGDVcqSPc7VYCUAGnTzLTG2qEM2.txt\"",
  "url": "https://ce0rcu23vrrdzqap.public.blob.vercel-storage.com/profilesv1/user-12345-NoOVGDVcqSPc7VYCUAGnTzLTG2qEM2.txt",
  "downloadUrl": "https://ce0rcu23vrrdzqap.public.blob.vercel-storage.com/profilesv1/user-12345-NoOVGDVcqSPc7VYCUAGnTzLTG2qEM2.txt?download=1"
}
```

--------------------------------

### DELETE /installations

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/delete-installation

Deletes an installation and optionally its associated resources. Requires proper authentication and returns different status codes based on the operation outcome. Supports cascade deletion of installation resources and requires a reason for the deletion.

```APIDOC
## DELETE /installations

### Description
Deletes an installation and optionally cascades the deletion to associated resources. This operation requires authentication and proper authorization.

### Method
DELETE

### Endpoint
/installations

### Request Body
- **cascadeResourceDeletion** (boolean) - Optional - Whether to delete the installation's resources along with the installation
- **reason** (string) - Optional - The reason for deleting the installation

### Request Example
```json
{
  "cascadeResourceDeletion": true,
  "reason": "No longer needed"
}
```

### Response

#### Success Response (200)
Installation deleted successfully
- **Content-Type**: application/json
- **Body**: "value"

#### Success Response (204)
Installation deleted successfully with no content returned
- **Content-Type**: application/json

#### Error Response (403)
Operation failed because the authentication is not allowed to perform this operation
- **Content-Type**: application/json
- **error** (object) - Required - Error details
  - **code** (string) - Required - Error code
  - **message** (string) - Required - System error message
  - **user** (object) - Optional - User-facing error information
    - **message** (string) - Optional - User-facing error message
    - **url** (string) - Optional - URL to help article or dashboard page

#### Error Response (409)
Operation failed because of a conflict with the current state of the resource
- **Content-Type**: application/json
- **error** (object) - Required - Error details
  - **code** (string) - Required - Error code
  - **message** (string) - Required - System error message
  - **user** (object) - Optional - User-facing error information
    - **message** (string) - Optional - User-facing error message
    - **url** (string) - Optional - URL to help article or dashboard page

### Error Response Example (403)
```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication token does not have permission to delete installations",
    "user": {
      "message": "You do not have permission to perform this action",
      "url": "https://dashboard.example.com/settings/permissions"
    }
  }
}
```

### Error Response Example (409)
```json
{
  "error": {
    "code": "CONFLICT",
    "message": "Installation has active deployments and cannot be deleted",
    "user": {
      "message": "Please stop all active deployments before deleting this installation",
      "url": "https://dashboard.example.com/installations/active-deployments"
    }
  }
}
```
```

--------------------------------

### Repository URL Deploy Button URL

Source: https://vercel.com/docs/deploy-button/source

Construct a Vercel Deploy Button URL with the repository-url parameter to specify a Git repository that users will clone during project creation. This example points to the Next.js hello-world example repository.

```bash
https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world
```

--------------------------------

### Stream text from AI Gateway using AI SDK in TypeScript

Source: https://vercel.com/docs/ai-gateway/getting-started

This TypeScript code showcases how to make an AI model request using the Vercel AI SDK. It utilizes `streamText` to interact with a specified model (e.g., `openai/gpt-5.2`), streaming the generated text to standard output and logging usage statistics upon completion.

```typescript
import { streamText } from 'ai';
import 'dotenv/config';

async function main() {
  const result = streamText({
    model: 'openai/gpt-5.2',
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  console.log();
  console.log('Token usage:', await result.usage);
  console.log('Finish reason:', await result.finishReason);
}

main().catch(console.error);
```

--------------------------------

### PUT /v1/bulk-redirects

Source: https://vercel.com/docs/redirects/bulk-redirects/getting-started

Update or create bulk redirects for a Vercel project. This endpoint allows you to programmatically manage redirects, making it ideal for automating redirect updates from webhook events or CMS systems.

```APIDOC
## PUT /v1/bulk-redirects

### Description
Update or create bulk redirects for a Vercel project. This endpoint enables programmatic redirect management, useful for automating redirect updates from webhook events and CMS integrations.

### Method
PUT

### Endpoint
https://api.vercel.com/v1/bulk-redirects

### Parameters
#### Query Parameters
None

#### Request Headers
- **Authorization** (string) - Required - Bearer token for authentication (format: "Bearer $VERCEL_TOKEN")
- **Content-Type** (string) - Required - Must be "application/json"

#### Request Body
- **teamId** (string) - Required - The ID of the team
- **projectId** (string) - Required - The ID of the project
- **redirects** (array) - Required - Array of redirect objects
  - **source** (string) - Required - The source path to redirect from
  - **destination** (string) - Required - The destination path to redirect to
  - **permanent** (boolean) - Required - Whether the redirect is permanent (301) or temporary (302)

### Request Example
```bash
curl -X PUT "https://api.vercel.com/v1/bulk-redirects" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "teamId": "team_123",
    "projectId": "project_123",
    "redirects": [
      {
        "source": "/old-path",
        "destination": "/new-path",
        "permanent": true
      }
    ]
  }'
```

### Response
#### Success Response (200)
- **redirects** (array) - Array of created or updated redirect objects
  - **source** (string) - The source path
  - **destination** (string) - The destination path
  - **permanent** (boolean) - Whether the redirect is permanent

#### Response Example
```json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```
```

--------------------------------

### Installation Notifications

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api

Manage installation notifications that appear in the Vercel dashboard to alert users about important information or actions needed for their installation. Notifications can be set when creating or updating installations.

```APIDOC
## Installation Notifications

### Description
Installation notifications are alerts that appear in the Vercel dashboard to inform users about important information or required actions for their installation. These notifications can be configured when creating or updating an installation.

### Purpose
Notifications help you communicate with users about:
- Important updates or changes to the integration
- Required actions or configurations
- Status changes or alerts
- Security or compliance information

### Configuration
Notifications can be set during:
- Installation creation
- Installation updates

### Usage
Include notification details in your installation creation or update requests to display alerts in the Vercel dashboard for the installation owner and team members.
```

--------------------------------

### GET /v1/products/{productSlug}/plans

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/list-billing-plans-for-product

Vercel sends a request to the partner to return quotes for different billing plans for a specific Product. Note: You can have this request triggered by Vercel before the integration is installed when the Product is created for the first time. In this case, OIDC will be incomplete and will not contain an account ID.

```APIDOC
## GET /v1/products/{productSlug}/plans

### Description
Vercel sends a request to the partner to return quotes for different billing plans for a specific Product. Note: You can have this request triggered by Vercel before the integration is installed when the Product is created for the first time. In this case, OIDC will be incomplete and will not contain an account ID.

### Method
GET

### Endpoint
/v1/products/{productSlug}/plans

### Parameters
#### Path Parameters
- **productSlug** (string) - Required - No description provided.

#### Query Parameters
- **metadata** (string) - Optional - No description provided.

### Response
#### Success Response (200)
- No specific fields described.
```

--------------------------------

### POST /v1/installations/{integrationConfigurationId}/events

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/create-event

Partner notifies Vercel of any changes made to an Installation or a Resource. Vercel uses list-resources and other read APIs to get the new state. Supports resource.updated events when resource state changes and installation.updated events when billing plans change.

```APIDOC
## POST /v1/installations/{integrationConfigurationId}/events

### Description
Partner notifies Vercel of any changes made to an Installation or a Resource. Vercel is expected to use `list-resources` and other read APIs to get the new state.

### Method
POST

### Endpoint
/v1/installations/{integrationConfigurationId}/events

### Authentication
- **bearerToken** - Default authentication mechanism

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required - The unique identifier for the integration configuration

### Request Body
- **event** (string) - Required - The type of event being dispatched (e.g., resource.updated, installation.updated)

### Request Example
{
  "event": "resource.updated"
}

### Response
#### Success Response (201)
Success - Event has been created and processed

#### Success Response (404)
Success - Resource not found but request processed

#### Error Response (400)
One of the provided values in the request body is invalid or one of the provided values in the request query is invalid.

#### Error Response (401)
The request is not authorized.

#### Error Response (403)
You do not have permission to access this resource.

### Use Cases
- User renames a database in the partner's application - dispatch `resource.updated` event to notify Vercel to update the resource
- Resource has been suspended due to lack of use - dispatch `resource.updated` event to notify Vercel to update the resource's status
- Installation's billing plan is changed via the provider instead of Vercel - dispatch `installation.updated` event
```

--------------------------------

### Configure ISR with config object in SvelteKit

Source: https://vercel.com/docs/incremental-static-regeneration/quickstart

Enable Incremental Static Regeneration in SvelteKit by exporting a config object with an isr property from a server route. The expiration property defines the cache revalidation interval in seconds.

```typescript
export const config = {
  isr: {
    expiration: 10,
  },
};
```

```javascript
export const config = {
  isr: {
    expiration: 10,
  },
};
```

--------------------------------

### Define a Minimal Vercel Integration Metadata Schema (JSON)

Source: https://vercel.com/docs/integrations/create-integration/marketplace-product

This JSON schema provides a basic configuration for a Vercel product integration, allowing only the product name to be displayed. It defines an object type with no additional properties or required fields, serving as a starting point for custom metadata collection from the customer during product installation.

```json
{
  "type": "object",
  "properties": {},
  "additionalProperties": false,
  "required": []
}
```

--------------------------------

### Define Feature Flags with Flags SDK for Next.js

Source: https://vercel.com/docs/feature-flags/flags-explorer/getting-started

Create a flags configuration file that defines feature flags using the Flags SDK. Each flag specifies a key, description, and a decide function that determines the flag's value. This file is imported by the Flags Discovery Endpoint.

```typescript
import { flag } from 'flags/next';

export const exampleFlag = flag({
  key: 'example-flag',
  description: 'An example feature flag',
  decide() {
    return false;
  },
});
```

```javascript
import { flag } from 'flags/next';

export const exampleFlag = flag({
  key: 'example-flag',
  description: 'An example feature flag',
  decide() {
    return false;
  },
});
```

--------------------------------

### Create Flags Discovery Endpoint for Next.js Pages Router

Source: https://vercel.com/docs/feature-flags/flags-explorer/getting-started

Set up an API route at pages/api/vercel/flags that handles authenticated requests from Flags Explorer. The endpoint verifies authorization, retrieves provider data from your flags configuration, and returns feature flag definitions with SDK version headers.

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyAccess, version } from 'flags';
import { getProviderData } from 'flags/next';
import * as flags from '../../../flags';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const access = await verifyAccess(request.headers['authorization']);
  if (!access) return response.status(401).json(null);

  const apiData = getProviderData(flags);

  response.setHeader('x-flags-sdk-version', version);
  return response.json(apiData);
}
```

```javascript
import { verifyAccess, version } from 'flags';
import { getProviderData } from 'flags/next';
import * as flags from '../../../flags';

export default async function handler(request, response) {
  const access = await verifyAccess(request.headers['authorization']);
  if (!access) return response.status(401).json(null);

  const apiData = getProviderData(flags);

  response.setHeader('x-flags-sdk-version', version);
  return response.json(apiData);
}
```

--------------------------------

### Handle Client Upload Route with Token Generation - TypeScript

Source: https://vercel.com/docs/vercel-blob/client-upload

Next.js API route handler that manages client uploads by generating authentication tokens and handling upload completion callbacks. Validates file types, generates tokens with optional random suffixes, and processes post-upload logic such as database updates.

```typescript
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname,
        /* clientPayload */
      ) => {
        // Generate a client token for the browser to upload the file
        // Make sure to authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          addRandomSuffix: true,
          // callbackUrl: 'https://example.com/api/avatar/upload',
          // optional, `callbackUrl` is automatically computed when hosted on Vercel
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            // you could pass a user id from auth, or a value from clientPayload
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Called by Vercel API on client upload completion
        // Use tools like ngrok if you want this to work locally

        console.log('blob upload completed', blob, tokenPayload);

        try {
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          throw new Error('Could not update user');
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
```

--------------------------------

### Issue SSL Certificate using Vercel CLI

Source: https://vercel.com/docs/domains/pre-generating-ssl-certs

This command uses the Vercel CLI to issue an SSL certificate for `*.example.com` and `example.com`. It is executed after the challenge records have been successfully propagated and verified, completing the certificate issuance process.

```bash
vercel certs issue "*.example.com" example.com
```

--------------------------------

### Vercel JSON Log Format Example

Source: https://vercel.com/docs/drains/reference/logs

This snippet demonstrates the standard JSON array format Vercel uses for sending logs. It includes examples of a build log and a lambda log, showcasing the structure and common fields like ID, deployment ID, source, host, timestamp, level, and message, along with specific details for each log type.

```json
{ "id": "1573817187330377061717300000", "deploymentId": "dpl_233NRGRjVZX1caZrXWtz5g1TAksD", "source": "build", "host": "my-app-abc123.vercel.app", "timestamp": 1573817187330, "projectId": "gdufoJxB6b9b1fEqr1jUtFkyavUU", "level": "info", "message": "Build completed successfully", "buildId": "bld_cotnkcr76", "type": "stdout", "projectName": "my-app" }
{ "id": "1573817250283254651097202070", "deploymentId": "dpl_233NRGRjVZX1caZrXWtz5g1TAksD", "source": "lambda", "host": "my-app-abc123.vercel.app", "timestamp": 1573817250283, "projectId": "gdufoJxB6b9b1fEqr1jUtFkyavUU", "level": "info", "message": "API request processed", "entrypoint": "api/index.js", "requestId": "643af4e3-975a-4cc7-9e7a-1eda11539d90", "statusCode": 200, "path": "/api/users", "executionRegion": "sfo1", "environment": "production", "traceId": "1b02cd14bb8642fd092bc23f54c7ffcd", "spanId": "f24e8631bd11faa7", "trace.id": "1b02cd14bb8642fd092bc23f54c7ffcd", "span.id": "f24e8631bd11faa7", "proxy": { "timestamp": 1573817250172, "method": "GET", "host": "my-app.vercel.app", "path": "/api/users?page=1", "userAgent": ["Mozilla/5.0..."], "referer": "https://my-app.vercel.app", "region": "sfo1", "statusCode": 200, "clientIp": "120.75.16.101", "scheme": "https", "vercelCache": "MISS" } }
```

--------------------------------

### Install AI SDK with Package Manager

Source: https://vercel.com/docs/ai/openai

Install the Vercel AI SDK using your preferred package manager (pnpm, yarn, npm, or bun). The AI SDK provides seamless integration with OpenAI models and supports multiple frameworks including Next.js, Nuxt, SvelteKit, and Node.js.

```bash
pnpm i ai
```

```bash
yarn i ai
```

```bash
npm i ai
```

```bash
bun i ai
```

--------------------------------

### Install Vercel CLI with npm, bun, yarn, and pnpm

Source: https://vercel.com/docs/custom-environments

Install the Vercel Command Line Interface globally using multiple package managers. The CLI is required to pull environment variables and manage deployments from your local machine.

```npm
npm i -g vercel
```

```bun
bun i -g vercel
```

```yarn
yarn global add vercel
```

```pnpm
pnpm i -g vercel
```

--------------------------------

### POST /v1/installations/{integrationConfigurationId}/events

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel

Creates a new event for a specific installation in the Vercel Marketplace.

```APIDOC
## POST /v1/installations/{integrationConfigurationId}/events

### Description
Creates a new event for a specific installation in the Vercel Marketplace.

### Method
POST

### Endpoint
/v1/installations/{integrationConfigurationId}/events

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required - The ID of the integration configuration.

#### Query Parameters
None

#### Request Body
None

### Request Example
{}

### Response
#### Success Response (200)
None

#### Response Example
{}
```

--------------------------------

### GET /deployments/{idOrUrl}

Source: https://vercel.com/docs/ai-resources/vercel-mcp/tools

Get detailed information for a specific deployment including build status, regions, and metadata.

```APIDOC
## GET /deployments/{idOrUrl}

### Description
Get detailed information for a specific deployment including build status, regions, and metadata.

### Method
GET

### Endpoint
/deployments/{idOrUrl}

### Parameters
#### Path Parameters
- **idOrUrl** (string) - Required - The unique identifier or hostname of the deployment

#### Query Parameters
- **teamId** (string) - Required - The team ID to get the deployment for. Alternatively the team slug can be used. Team IDs start with 'team_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`.

### Request Example
{}

### Response
#### Success Response (200)
- **id** (string) - The deployment's unique identifier.
- **url** (string) - The deployment's URL.
- **state** (string) - The current state of the deployment (e.g., 'READY', 'BUILDING', 'ERROR').
- **regions** (array of string) - The regions where the deployment is active.
- **metadata** (object) - Additional metadata associated with the deployment.

#### Response Example
{
  "id": "dpl_xxxxxxxxxxxxxxxxx",
  "url": "my-project.vercel.app",
  "state": "READY",
  "regions": ["sfo1"],
  "metadata": {
    "project": "my-project"
  }
}
```

--------------------------------

### Trigger On-Demand Revalidation with SvelteKit or Nuxt

Source: https://vercel.com/docs/incremental-static-regeneration/quickstart

This method allows purging the cache for an ISR route in SvelteKit or Nuxt by sending an API request with a specific header. It requires setting a `BYPASS_TOKEN` environment variable and configuring it in the route's options or framework-specific configuration files.

```bash
x-prerender-revalidate: bypass_token_here
```

--------------------------------

### POST /v1/installations/{installationId}/resource-transfer-requests

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/create-resource-transfer

Prepares to transfer resources from the current installation to a new one. The target installation to transfer resources to will not be known until the verify & accept steps.

```APIDOC
## POST /v1/installations/{installationId}/resource-transfer-requests

### Description
Prepares to transfer resources from the current installation to a new one. The target installation to transfer resources to will not be known until the verify & accept steps. This endpoint requires System Authentication using OIDC.

### Method
POST

### Endpoint
/v1/installations/{installationId}/resource-transfer-requests

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.

#### Header Parameters
- **X-Vercel-Auth** (string) - Optional - The auth style used in the request (system, user, etc)
- **Idempotency-Key** (string) - Optional - A unique key to identify a request across multiple retries

#### Request Body
- **resourceIds** (array of string) - Required - A list of resource IDs to be transferred.
- **expiresAt** (number) - Required - The timestamp in milliseconds when the transfer claim expires. After this time, the transfer cannot be claimed.

### Request Example
```json
{
  "resourceIds": [
    "res_xxxxxxxxxxxxxxxxxxxx",
    "res_yyyyyyyyyyyyyyyyyyyy"
  ],
  "expiresAt": 1678886400000
}
```

### Response
#### Success Response (200) - Claim created successfully
- **providerClaimId** (string) - The provider-specific claim ID for the resource transfer.

#### Response Example (200)
```json
{
  "providerClaimId": "claim_xxxxxxxxxxxxxxxxxxxx"
}
```

#### Error Response (400) - Input has failed validation
- **error** (object) - Required - Error details.
  - **code** (string) - Required - A machine-readable error code.
  - **message** (string) - Required - System error message.
  - **user** (object) - Optional - User-facing error details.
    - **message** (string) - User-facing error message, if applicable.
    - **url** (string) - URL to a user-facing help article, or a dashboard page for resolution, if applicable.
  - **fields** (array of object) - Optional - Specific fields that failed validation.
    - **key** (string) - Required - The field name.
    - **message** (string) - The validation error message for the field.

#### Response Example (400)
```json
{
  "error": {
    "code": "invalid_input",
    "message": "Validation failed for request body.",
    "user": {
      "message": "Please ensure all required fields are provided and correctly formatted.",
      "url": "https://vercel.com/docs/integrations/errors#400"
    },
    "fields": [
      {
        "key": "resourceIds",
        "message": "resourceIds must be a non-empty array of strings"
      }
    ]
  }
}
```

#### Error Response (403) - Operation failed because the authentication is not allowed to perform this operation
- **error** (object) - Required - Error details.
  - **code** (string) - Required - A machine-readable error code.
  - **message** (string) - Required - System error message.
  - **user** (object) - Optional - User-facing error details.
    - **message** (string) - User-facing error message, if applicable.
    - **url** (string) - URL to a user-facing help article, or a dashboard page for resolution, if applicable.

#### Response Example (403)
```json
{
  "error": {
    "code": "forbidden",
    "message": "The provided authentication token does not have the necessary permissions.",
    "user": {
      "message": "You do not have permission to initiate a resource transfer for this installation.",
      "url": "https://vercel.com/docs/integrations/errors#403"
    }
  }
}
```

#### Error Response (409) - Operation failed because of a conflict with the current state of the resource
- **error** (object) - Required - Error details.
  - **code** (string) - Required - A machine-readable error code.
  - **message** (string) - Required - System error message.
  - **user** (object) - Optional - User-facing error details.
    - **message** (string) - User-facing error message, if applicable.
    - **url** (string) - URL to a user-facing help article, or a dashboard page for resolution, if applicable.

#### Response Example (409)
```json
{
  "error": {
    "code": "conflict",
    "message": "A resource transfer request is already pending or in progress for some of the specified resources.",
    "user": {
      "message": "A transfer for these resources is already active. Please check your transfers or try again later.",
      "url": "https://vercel.com/docs/integrations/errors#409"
    }
  }
}
```
```

--------------------------------

### Create Client Upload Page with TypeScript (Next.js Pages Router)

Source: https://vercel.com/docs/vercel-blob/client-upload

Implement a client-side file upload component for Next.js Pages Router using TypeScript. Files are uploaded directly from the browser to Vercel Blob with secure token exchange via server endpoint. Includes type safety with PutBlobResult.

```typescript
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }

          const file = inputFileRef.current.files[0];
```

--------------------------------

### Create Client Upload Page with TypeScript (Next.js App Router)

Source: https://vercel.com/docs/vercel-blob/client-upload

Implement a client-side file upload component for Next.js App Router using TypeScript. Files are uploaded directly from the browser to Vercel Blob with secure token exchange via the server endpoint. Includes form submission, file selection, and blob URL display.

```typescript
'use client';

import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error('No file selected');
          }

          const file = inputFileRef.current.files[0];

          const newBlob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/avatar/upload',
          });

          setBlob(newBlob);
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
```

--------------------------------

### Configure ISR with revalidate in Next.js App Router

Source: https://vercel.com/docs/incremental-static-regeneration/quickstart

Enable Incremental Static Regeneration in Next.js App Router by exporting a revalidate route segment config. This property specifies the cache revalidation interval in seconds for the page or layout.

```typescript
export const revalidate = 10; // seconds
```

```javascript
export const revalidate = 10; // seconds
```

--------------------------------

### Deploying Prebuilt Output with Vercel CLI `--prebuilt` Option

Source: https://vercel.com/docs/cli/deploy

Demonstrates the direct use of the `--prebuilt` option with the `vercel` command. This flag instructs Vercel to deploy the contents of the `.vercel/output` directory, assuming a prior build step has been completed.

```bash
vercel --prebuilt
```

--------------------------------

### Retrieve Vercel Teams using TypeScript SDK

Source: https://vercel.com/docs/rest-api/reference/endpoints/teams/list-all-teams

This TypeScript example demonstrates how to use the `@vercel/sdk` to fetch a list of teams. It initializes the Vercel client with a bearer token and calls the `teams.getTeams` method, optionally providing `limit`, `since`, and `until` parameters to filter the results. The fetched team data is then logged to the console.

```typescript
import { Vercel } from "@vercel/sdk";

const vercel = new Vercel({
  bearerToken: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await vercel.teams.getTeams({
    limit: 20,
    since: 1540095775951,
    until: 1540095775951,
  });

  console.log(result);
}

run();
```

--------------------------------

### Build Vercel Projects Locally and Deploy Prebuilt Output using Vercel CLI

Source: https://vercel.com/docs/cli/deploying-from-cli

Discover how to build a Vercel project locally to generate `.vercel/output` in the Build Output API format for inspection or debugging. Subsequently, deploy these prebuilt outputs to Vercel using the `vercel deploy --prebuilt` command.

```bash
vercel build
```

```bash
vercel deploy --prebuilt
```

--------------------------------

### Force Replace Existing Directory with vercel init

Source: https://vercel.com/docs/cli/init

Use the --force or -f flag to forcibly replace an existing local directory when initializing a framework example. This option allows overwriting without confirmation prompts.

```bash
vercel init --force
```

```bash
vercel init gatsby my-project-directory --force
```

--------------------------------

### Example Integration Slug for Vercel Configuration

Source: https://vercel.com/docs/rest-api/reference/endpoints/integrations/retrieve-an-integration-configuration

This example demonstrates a `slug` value, which identifies the integration for which the configuration was created. This `string` is required and provides a human-readable identifier for the integration.

```json
"slack"
```

--------------------------------

### Install Astro Vercel Adapter

Source: https://vercel.com/docs/frameworks/frontend/astro

This snippet demonstrates how to install the `@astrojs/vercel` adapter using various package managers. This adapter is essential for deploying server-rendered Astro apps or static sites that utilize Vercel-specific features. It can be added via `astro add` for default settings or installed manually for more control.

```bash
pnpm i @astrojs/vercel
```

```bash
yarn i @astrojs/vercel
```

```bash
npm i @astrojs/vercel
```

```bash
bun i @astrojs/vercel
```

--------------------------------

### Conditional Rewrite Based on Country Header

Source: https://vercel.com/docs/rewrites

Route requests conditionally based on HTTP headers. This example uses the x-vercel-ip-country header to route UK visitors (country code GB) to a UK-specific section while excluding paths that already start with 'uk/'.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/:path((?!uk/).*)",
      "has": [
        { "type": "header", "key": "x-vercel-ip-country", "value": "GB" }
      ],
      "destination": "/uk/:path*"
    }
  ]
}
```

--------------------------------

### Install SvelteKit Vercel Adapter

Source: https://vercel.com/docs/frameworks/sveltekit

This snippet provides commands to install the `@sveltejs/adapter-vercel` package, which optimizes SvelteKit applications for deployment on Vercel. It ensures version stability, speeds up CI processes, and allows for default deployment option configuration.

```pnpm
pnpm i @sveltejs/adapter-vercel
```

```npm
npm i @sveltejs/adapter-vercel
```

```bun
bun add @sveltejs/adapter-vercel
```

--------------------------------

### Integration Configuration Response Schema - JSON

Source: https://vercel.com/docs/rest-api/reference/endpoints/integrations/get-configurations-for-the-authenticated-user-or-team

Example response structure from getConfigurations API call showing a single integration configuration object with metadata, status, scopes, and lifecycle timestamps. Response is an array of configuration objects.

```json
[
  {
    "completedAt": 1558531915505,
    "createdAt": 1558531915505,
    "id": "icfg_3bwCLgxL8qt5kjRLcv2Dit7F",
    "integrationId": "oac_xzpVzcUOgcB1nrVlirtKhbWV",
    "ownerId": "kr1PsOIzqEL5Xg6M4VZcZosf",
    "status": "error",
    "externalId": "<string>",
    "projects": [
      "prj_xQxbutw1HpL6HLYPAzt5h75m8NjO"
    ],
    "source": "marketplace",
    "slug": "slack",
    "teamId": "team_nLlpyC6RE1qxydlFKbrxDlud",
    "type": "integration-configuration",
    "updatedAt": 1558531915505,
    "userId": "kr1PsOIzqEL5Xg6M4VZcZosf",
    "scopes": [
      "read:project",
      "read-write:log-drain"
    ],
    "disabledAt": 1558531915505,
    "deletedAt": 1558531915505,
    "deleteRequestedAt": 1558531915505,
    "disabledReason": "disabled-by-owner",
    "installationType": "marketplace"
  }
]
```

--------------------------------

### GET /new/clone (Required Integrations)

Source: https://vercel.com/docs/integrations/deploy-button/integrations

This endpoint allows you to pre-configure a Vercel Deploy Button URL to require specific integrations to be added before a project can be imported.

```APIDOC
## GET /new/clone (Required Integrations)

### Description
This endpoint allows you to pre-configure a Vercel Deploy Button URL to require specific integrations to be added before a project can be imported.

### Method
GET

### Endpoint
/new/clone

### Parameters
#### Path Parameters
_None_

#### Query Parameters
- **repository-url** (string) - Required - The URL of the repository to clone (e.g., `https://github.com/vercel/next.js/tree/canary/examples/hello-world`).
- **integration-ids** (string) - Required - A comma-separated list of required Integration IDs (e.g., `oac_4mkAfc68cuDV4suZRlgkn3R9,oac_JI9dt8xHo7UXmVV6mZTygMNZ`). Up to 3 integrations can be specified.

#### Request Body
_None_

### Request Example
```
https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world&integration-ids=oac_1mkAfc68cuDV4suZRlgkn3Re
```

### Response
#### Success Response (200 - Redirect)
This endpoint initiates a redirect to the Vercel dashboard to set up a new project, pre-configured with the specified required integrations. There is no direct API response body.

#### Response Example
_No direct API response body. User is redirected to Vercel UI._
```
```
```

--------------------------------

### Example JSON response for a copied Vercel Blob

Source: https://vercel.com/docs/storage/vercel-blob/using-blob-sdk

This is an example of the JSON object returned after a successful `copy()` operation, showing typical values for pathname, content type, content disposition, URL, and download URL.

```JSON
{
  "pathname": "profilesv1/user-12345-copy.txt",
  "contentType": "text/plain",
  "contentDisposition": "attachment; filename=\"user-12345-copy.txt\"",
  "url": "https://ce0rcu23vrrdzqap.public.blob.vercel-storage.com/profilesv1/user-12345-copy.txt",
  "downloadUrl": "https://ce0rcu23vrrdzqap.public.blob.vercel-storage.com/profilesv1/user-12345-copy.txt?download=1"
}
```

--------------------------------

### Install Edge Config SDK with Package Managers

Source: https://vercel.com/docs/edge-config/edge-config-integrations/devcycle-edge-config

Install the Vercel Edge Config SDK as a project dependency using pnpm, yarn, npm, or bun. Required for managing Edge Config in Vercel projects.

```bash
pnpm i @vercel/edge-config
```

```bash
yarn i @vercel/edge-config
```

```bash
npm i @vercel/edge-config
```

```bash
bun i @vercel/edge-config
```

--------------------------------

### Install @vercel/toolbar package with package managers

Source: https://vercel.com/docs/vercel-toolbar/in-production-and-localhost/add-to-localhost

Install the @vercel/toolbar package using pnpm, yarn, npm, or bun. This is the first step to enable the toolbar in your local environment.

```bash
pnpm i @vercel/toolbar
```

```bash
yarn i @vercel/toolbar
```

```bash
npm i @vercel/toolbar
```

```bash
bun i @vercel/toolbar
```

--------------------------------

### Install Native Integrations with Vercel CLI

Source: https://vercel.com/docs/cli

Install native integrations for your Vercel projects. This command allows you to add specific integrations, optionally associating them with a product.

```bash
vercel install [integration-name]
```

--------------------------------

### Example JSON Response for Vercel Integration Configuration

Source: https://vercel.com/docs/rest-api/reference/endpoints/integrations/retrieve-an-integration-configuration

This JSON object illustrates the structure of a successful response when retrieving an integration configuration from the Vercel API. It contains comprehensive details about the configuration, including project selection, notification settings, transfer request information, timestamps, IDs, associated scopes, and installation specifics.

```json
{
  "projectSelection": "all",
  "notification": {
    "level": "error",
    "title": "<string>",
    "message": "<string>",
    "href": "<string>"
  },
  "transferRequest": {
    "kind": "transfer-to-marketplace",
    "requestId": "<string>",
    "transferId": "<string>",
    "requester": {
      "name": "<string>",
      "email": "<string>"
    },
    "createdAt": 123,
    "expiresAt": 123,
    "metadata": {},
    "billingPlan": {
      "id": "<string>",
      "type": "prepayment",
      "name": "<string>",
      "description": "<string>",
      "scope": "installation",
      "paymentMethodRequired": false,
      "preauthorizationAmount": 123
    },
    "discardedAt": 123,
    "discardedBy": "<string>",
    "approvedAt": 123,
    "approvedBy": "<string>",
    "authorizationId": "<string>"
  },
  "type": "integration-configuration",
  "createdAt": 1558531915505,
  "id": "icfg_3bwCLgxL8qt5kjRLcv2Dit7F",
  "slug": "slack",
  "updatedAt": 1558531915505,
  "userId": "kr1PsOIzqEL5Xg6M4VZcZosf",
  "scopes": [
    "read:project",
    "read-write:log-drain"
  ],
  "integrationId": "oac_xzpVzcUOgcB1nrVlirtKhbWV",
  "ownerId": "kr1PsOIzqEL5Xg6M4VZcZosf",
  "projects": [
    "prj_xQxbutw1HpL6HLYPAzt5h75m8NjO"
  ],
  "status": "error",
  "deletedAt": 1558531915505,
  "teamId": "team_nLlpyC6RE1qxydlFKbrxDlud",
  "source": "marketplace",
  "canConfigureOpenTelemetry": false,
  "completedAt": 1558531915505,
  "externalId": "<string>",
  "disabledAt": 1558531915505,
  "deleteRequestedAt": 1558531915505,
  "disabledReason": "disabled-by-owner",
  "installationType": "marketplace"
}
```

--------------------------------

### Get Vercel Blob Metadata in Next.js App Router

Source: https://vercel.com/docs/storage/vercel-blob/using-blob-sdk

This example demonstrates how to create a Next.js API route (`/app` directory) to retrieve metadata for a specific Vercel Blob object. It uses the `@vercel/blob` library's `head` function, taking a blob URL as a query parameter and returning its details as JSON.

```TypeScript
import { head } from '@vercel/blob;
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const blobUrl = searchParams.get('url');
  const blobDetails = await head(blobUrl);
 
  return Response.json(blobDetails);
}
```

--------------------------------

### GET /v9/projects/{idOrName}/domains/{domain}

Source: https://vercel.com/docs/rest-api/reference/endpoints/projects/get-a-project-domain

Retrieves detailed information about a specific domain associated with a Vercel project. This endpoint returns domain configuration, verification status, and any DNS verification challenges required to complete domain setup.

```APIDOC
## GET /v9/projects/{idOrName}/domains/{domain}

### Description
Retrieve detailed information about a specific domain associated with a Vercel project, including verification status, DNS records, and redirect configurations.

### Method
GET

### Endpoint
/v9/projects/{idOrName}/domains/{domain}

### Authentication
- **Authorization** (string, header, required) - Bearer token for API authentication

### Parameters

#### Path Parameters
- **idOrName** (string) - Required - The unique project identifier or the project name
- **domain** (string) - Required - The project domain name (e.g., "www.example.com")

#### Query Parameters
- **teamId** (string) - Optional - The Team identifier to perform the request on behalf of (e.g., "team_1a2b3c4d5e6f7g8h9i0j1k2l")
- **slug** (string) - Optional - The Team slug to perform the request on behalf of (e.g., "my-team-url-slug")

### Request Example
```typescript
import { Vercel } from "@vercel/sdk";

const vercel = new Vercel({
  bearerToken: "<YOUR_BEARER_TOKEN_HERE>"
});

async function run() {
  const result = await vercel.projects.getProjectDomain({
    idOrName: "<value>",
    domain: "www.example.com",
    teamId: "team_1a2b3c4d5e6f7g8h9i0j1k2l",
    slug: "my-team-url-slug"
  });

  console.log(result);
}

run();
```

### Response

#### Success Response (200 - application/json)
- **name** (string) - Required - The domain name
- **apexName** (string) - Required - The apex domain name
- **projectId** (string) - Required - The project identifier
- **verified** (boolean) - Required - True if the domain is verified for use with the project. If false, it will not be used as an alias until the verification challenge is completed
- **redirect** (string | null) - Optional - Redirect target URL if configured
- **redirectStatusCode** (number | null) - Optional - HTTP status code for redirect (301, 302, 307, or 308)
- **gitBranch** (string | null) - Optional - Git branch associated with the domain
- **customEnvironmentId** (string | null) - Optional - Custom environment identifier
- **updatedAt** (number) - Required - Timestamp of last update
- **createdAt** (number) - Required - Timestamp of domain creation
- **verification** (object[]) - Required - List of verification challenges. One must be completed to verify the domain. For TXT verification, check the verification.domain for a TXT record matching verification.value
  - **type** (string) - Verification challenge type (e.g., "TXT")
  - **domain** (string) - Domain to verify
  - **value** (string) - Verification value or record content
  - **reason** (string) - Reason for verification requirement

#### Response Example
```json
{
  "name": "www.example.com",
  "apexName": "example.com",
  "projectId": "prj_1a2b3c4d5e6f7g8h9i0j1k2l",
  "verified": false,
  "redirect": null,
  "redirectStatusCode": 301,
  "gitBranch": "main",
  "customEnvironmentId": null,
  "updatedAt": 1234567890,
  "createdAt": 1234567890,
  "verification": [
    {
      "type": "TXT",
      "domain": "_vercel.example.com",
      "value": "vercel-challenge-abc123",
      "reason": "Domain verification required"
    }
  ]
}
```
```

--------------------------------

### POST /v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/accept

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

Accept a resource transfer request using a provider claim ID.

```APIDOC
## POST /v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/accept

### Description
Accept Resources Transfer Request

### Method
POST

### Endpoint
/v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/accept

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
- **providerClaimId** (string) - Required - The provider claim ID for the transfer request.
```

--------------------------------

### Install BotID Package with Multiple Package Managers

Source: https://vercel.com/docs/botid/get-started

Install the BotID package using your preferred package manager (pnpm, yarn, npm, or bun). This is the first step in adding bot protection to your Vercel project.

```bash
pnpm i botid
```

```bash
yarn i botid
```

```bash
npm i botid
```

```bash
bun i botid
```

--------------------------------

### GET /v1/installations/{installationId}/resources/{resourceId}/plans

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/list-billing-plans-for-resource

Returns the set of billing plans available to a specific Resource. This endpoint requires system authentication using OpenID Connect Protocol (OIDC) with a JWT token signed by Vercel.

```APIDOC
## GET /v1/installations/{installationId}/resources/{resourceId}/plans

### Description
Returns the set of billing plans available to a specific Resource within a Vercel integration installation.

### Method
GET

### Endpoint
```
/v1/installations/{installationId}/resources/{resourceId}/plans
```

### Authentication
**System Authentication (OIDC)**

This endpoint uses OpenID Connect Protocol (OIDC) authentication. Vercel sends a JSON Web Token (JWT) signed with Vercel's private key, verifiable using Vercel's public JSON Web Key Sets (JWKS).

### Parameters

#### Path Parameters
- **installationId** (string) - Required - The ID of the installation
- **resourceId** (string) - Required - The ID of the resource

#### Query Parameters
- **metadata** (string) - Optional - Additional metadata filter

#### Header Parameters
- **X-Vercel-Auth** (string) - Optional - The auth style used in the request (system, user, etc)

### Request Example
```
GET /v1/installations/icfg_9bceb8ccT32d3U417ezb5c8p/resources/res_example123/plans?metadata=optional_value
Host: marketplace.vercel.com
X-Vercel-Auth: system
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
```

### OIDC Token Claims Schema
```json
{
  "iss": "https://marketplace.vercel.com",
  "sub": "account:1a2b3c4d5e6f7g8h9i0j",
  "aud": "oac_9f4YG9JFjgKkRlxoaaGG0y05",
  "type": "access_token",
  "installation_id": "icfg_9bceb8ccT32d3U417ezb5c8p",
  "account_id": "acc_example123"
}
```

### Response

#### Success Response (200)
Returns an array of billing plans available for the specified resource.

#### Response Example
```json
{
  "plans": [
    {
      "id": "plan_1",
      "name": "Basic Plan",
      "description": "Basic billing plan",
      "price": 0
    },
    {
      "id": "plan_2",
      "name": "Pro Plan",
      "description": "Professional billing plan",
      "price": 29
    }
  ]
}
```

#### Error Responses
- **400 Bad Request** - Invalid parameters provided
- **401 Unauthorized** - Invalid or missing authentication token
- **404 Not Found** - Installation or resource not found
- **500 Internal Server Error** - Server error occurred
```

--------------------------------

### Displaying Missing ESLint React Plugins Error (Shell)

Source: https://vercel.com/docs/conformance/rules/ESLINT_REACT_RULES_REQUIRED

This snippet illustrates an error message received when essential ESLint plugins like 'react', 'react-hooks', and 'jsx-a11y' are not installed or configured in the project. It highlights which required plugins are missing from the current ESLint setup.

```sh
ESLint configuration is missing required security plugins:
  Missing plugins: react, react-hooks, and jsx-a11y
  Registered plugins: import and @typescript-eslint
```

--------------------------------

### Example `marketplace.invoice.notpaid` Webhook Payload JSON

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api

This JSON object illustrates the structure of the `marketplace.invoice.notpaid` webhook payload. It includes details such as the event ID, type, and an `invoice` object containing the invoice ID, associated installation ID, amount, currency, and the timestamp when the invoice was marked as not paid.

```json
{
  "id": "evt_ghi789",
  "type": "marketplace.invoice.notpaid",
  "payload": {
    "invoice": {
      "id": "inv_xyz789",
      "installationId": "icfg_def456",
      "amount": 29.99,
      "currency": "USD",
      "notPaidAt": "2025-01-20T10:00:00Z"
    }
  }
}
```

--------------------------------

### Rate Limiting

Source: https://vercel.com/docs/rest-api/reference

Understand Vercel API rate limiting policies and how to handle rate limit exceeded responses. The API enforces rate limits specified in response headers and returns a 429 status code when limits are exceeded.

```APIDOC
## Rate Limiting

### Description
The Vercel API enforces rate limits on the number of requests allowed within a specific time period. Rate limit information is provided in response headers.

### Rate Limit Headers
- **X-RateLimit-Limit** (integer) - Maximum number of requests permitted in the current window
- **X-RateLimit-Remaining** (integer) - Number of requests remaining in the current rate limit window
- **X-RateLimit-Reset** (integer) - UTC epoch seconds when the current rate limit window resets

### Error Response (429 Too Many Requests)
When rate limit is exceeded, the API returns:

#### Response Example
```json
{
  "error": {
    "code": "too_many_requests",
    "message": "Rate limit exceeded"
  }
}
```

### Status Code
- **429** - Too Many Requests (rate limit exceeded)

### Best Practices
1. Monitor the `X-RateLimit-Remaining` header to track available requests
2. Check `X-RateLimit-Reset` to determine when limits reset
3. Implement exponential backoff when receiving 429 responses
4. Refer to the limits documentation for specific rate limit values per endpoint
```

--------------------------------

### Create Experimentation Items via Vercel API (HTTP)

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/post-v1-installations-resources-experimentation-items

This snippet shows the HTTP method and endpoint for creating one or multiple experimentation items. It requires a `bearerToken` for authentication and specifies `integrationConfigurationId` and `resourceId` as path parameters.

```http
POST /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/items
```

--------------------------------

### Configure dev Command with Microfrontends Port in package.json

Source: https://vercel.com/docs/microfrontends/quickstart

This `package.json` snippet modifies the `dev` script to integrate with the `@vercel/microfrontends` local development proxy. It uses `$(microfrontends port)` to dynamically retrieve the auto-generated port from the proxy, ensuring that the development server routes requests correctly. This setup is crucial for seamless local development with microfrontends.

```json
"scripts": {
  "dev": "next dev --port $(microfrontends port)"
}
```

--------------------------------

### Install httpstat Tool on Linux/macOS

Source: https://vercel.com/docs/cli/httpstat

This snippet demonstrates how to install the `httpstat` command-line utility. Users can install it using `pip` for Python environments, which is cross-platform, or `brew` for macOS. Ensure the respective package manager is available on your system.

```bash
# Install with pip (Python)
pip install httpstat
```

```bash
# Or install with Homebrew (macOS)
brew install httpstat
```

--------------------------------

### GET /v1/products/{productSlug}/plans

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

List all available billing plans for a given product.

```APIDOC
## GET /v1/products/{productSlug}/plans

### Description
List Billing Plans For Product

### Method
GET

### Endpoint
/v1/products/{productSlug}/plans

### Parameters
#### Path Parameters
- **productSlug** (string) - Required - The slug of the product.
```

--------------------------------

### Routing Rule Example - HTTP Redirect

Source: https://vercel.com/docs/build-output-api/configuration

Demonstrates a practical routing rule configuration that redirects requests from one path to an external URL using HTTP status code 308.

```APIDOC
## Routing Rule Example - HTTP Redirect

### Description
This example shows a routing rule that redirects the `/redirect` path to an external URL using an HTTP 308 (Permanent Redirect) status code.

### Configuration
```json
{
  "routes": [
    {
      "src": "/redirect",
      "status": 308,
      "headers": {
        "Location": "https://example.com/"
      }
    }
  ]
}
```

### How It Works
- **src**: Matches incoming requests to the `/redirect` path
- **status**: Returns HTTP 308 status code (Permanent Redirect)
- **headers**: Sets the `Location` header to the destination URL

### Result
When a user accesses `/redirect`, they will be permanently redirected to `https://example.com/`.
```

--------------------------------

### Build Optimization Best Practices

Source: https://vercel.com/docs/builds/managing-builds

Guidelines and recommendations for optimizing build performance in Vercel projects, including cache management, build step configuration, and runtime selection.

```APIDOC
## Build Optimization Strategies

### Overview
Optimize your Vercel builds by implementing these best practices and configuration strategies.

### Optimization Techniques

#### 1. Build Cache Management
- **Default Behavior**: Vercel automatically caches project dependencies based on your framework
- **Action**: Understand and manage build cache to speed up build processes
- **Documentation**: See build cache understanding and management guides

#### 2. Ignored Build Step Configuration
- **Purpose**: Skip the build step on redeployments when not necessary
- **Use Case**: When you know the build step is not required under certain conditions
- **Configuration**: Available in project settings under ignored-build-step

#### 3. Runtime Version Selection
- **Recommendation**: Use the most recent version of your runtime
- **Primary Focus**: Node.js runtime updates provide latest performance improvements
- **Benefit**: Take advantage of performance enhancements and optimizations
- **Documentation**: See Node.js runtime documentation for available versions

### Implementation Considerations
- Monitor build times and cache hit rates
- Regularly update runtime versions for performance gains
- Configure build steps strategically to avoid unnecessary rebuilds
- Leverage framework-specific caching strategies
```

--------------------------------

### Configure pnpm as Install Command in vercel.json for Deployment

Source: https://vercel.com/docs/package-managers

This JSON snippet demonstrates how to specify 'pnpm install' as the package manager installation command for a specific Vercel deployment. By setting the 'installCommand' property in 'vercel.json', you can override Vercel's default package manager behavior, ensuring that pnpm is used for dependency installation during the build process.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "pnpm install"
}
```

--------------------------------

### Track Server-Side Events with Custom Data in Vercel Analytics

Source: https://vercel.com/docs/analytics/custom-events

This snippet demonstrates how to track server-side events, such as a purchase, using the `track` function from `@vercel/analytics/server`. It shows examples for Next.js API routes, Next.js server actions, Remix actions, SvelteKit actions, and Nuxt event handlers, illustrating how to pass an event name and an object with custom data like `quantity`. Ensure `@vercel/analytics` version 1.1.0 or later is installed.

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { track } from '@vercel/analytics/server';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await track('Item purchased', {
    quantity: 1,
  });
}
```

```javascript
import { track } from '@vercel/analytics/server';

export default async function handler(req, res) {
  await track('Item purchased', {
    quantity: 1,
  });
}
```

```typescript
'use server';
import { track } from '@vercel/analytics/server';

export async function purchase() {
  await track('Item purchased', {
    quantity: 1,
  });
}
```

```javascript
'use server';
import { track } from '@vercel/analytics/server';

export async function purchase() {
  await track('Item purchased', {
    quantity: 1,
  });
}
```

```typescript
import { track } from '@vercel/analytics/server';

export async function action() {
  await track('Item purchased', {
    quantity: 1,
  });
}
```

```javascript
import { track } from '@vercel/analytics/server';

export async function action() {
  await track('Item purchased', {
    quantity: 1,
  });
}
```

```typescript
import { track } from '@vercel/analytics/server';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async () => {
    await track('Item purchased', {
      quantity: 1,
    });
  },
};
```

```javascript
import { track } from '@vercel/analytics/server';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async () => {
    await track('Item purchased', {
      quantity: 1,
    });
  },
};
```

```typescript
import { track } from '@vercel/analytics/server';

export default defineEventHandler(async () => {
  await track('Item purchased', {
    quantity: 1,
  });
});
```

```javascript
import { track } from '@vercel/analytics/server';

export default defineEventHandler(async () => {
  await track('Item purchased', {
    quantity: 1,
  });
});
```

--------------------------------

### Verify Git Remote Repositories (Bash)

Source: https://vercel.com/docs/integrations/ecommerce/bigcommerce

Lists the configured remote repositories for your local Git project. This command helps confirm that both your 'origin' (fork) and 'upstream' (official Catalyst) remotes are correctly set up.

```bash
git remote -v
```

--------------------------------

### GET /v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/verify

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/verify-resource-transfer

Validates a resource transfer request for a target installation. Vercel uses this endpoint to provide transfer targets and request necessary prerequisite information. Multiple sources may verify the same transfer, but only incomplete transfers can be verified.

```APIDOC
## GET /v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/verify

### Description
Validate a resource transfer request. This endpoint allows Vercel to provide a potential target for the transfer and request any necessary information for prerequisite setup to support the resources in the target team upon completion of the transfer. Multiple sources/teams may verify the same transfer. Only transfers that haven't been completed can be verified.

**Important:** The installation ID in the URL is the target installation ID, not the source one.

### Method
GET

### Endpoint
/v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/verify

### Authentication
**System Authentication (OIDC)**: This endpoint uses OpenID Connect Protocol (OIDC). Vercel sends a JSON Web Token (JWT) signed with Vercel's private key and verifiable using Vercel's public JSON Web Key Sets (JWKS) available at https://marketplace.vercel.com/.well-known/jwks

### Parameters

#### Path Parameters
- **installationId** (string) - Required - The target installation ID (not the source installation ID)
- **providerClaimId** (string) - Required - The provider claim identifier for the resource transfer request

#### Header Parameters
- **X-Vercel-Auth** (string) - Optional - The auth style used in the request (system, user, etc)

### OIDC Token Claims Schema
```json
{
  "iss": "https://marketplace.vercel.com",
  "sub": "account:[0-9a-fA-F]+",
  "aud": "oac_9f4YG9JFjgKkRlxoaaGG0y05",
  "type": "access_token|id_token",
  "installation_id": "icfg_9bceb8ccT32d3U417ezb5c8p",
  "account_id": "string"
}
```

### Response
#### Success Response (200)
The endpoint returns verification details for the resource transfer request.

### Notes
- Only incomplete transfers can be verified
- Multiple sources/teams may verify the same transfer
- The installation ID in the URL must be the target installation ID, not the source
```

--------------------------------

### Configure pnpm workspaces in YAML

Source: https://vercel.com/docs/conformance/rules/WORKSPACE_MISSING_PACKAGE_JSON

This example demonstrates how to configure pnpm workspaces using a `pnpm-workspace.yaml` file. It specifies that directories within 'apps/*' and 'packages/*' should be treated as workspaces.

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

--------------------------------

### Basic syntax for connecting to a Vercel Sandbox

Source: https://vercel.com/docs/vercel-sandbox/cli-reference

This snippet illustrates the fundamental syntax for initiating an interactive shell session within an existing Vercel sandbox using the `sandbox connect` command. It requires a `<sandbox_id>` and can optionally accept various `OPTIONS` to customize the connection. This command is the entry point for direct interaction with a running sandbox.

```bash
sandbox connect [OPTIONS] <sandbox_id>
```

--------------------------------

### DELETE /v1/installations/{installationId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

Delete an installation by its ID.

```APIDOC
## DELETE /v1/installations/{installationId}

### Description
Delete Installation

### Method
DELETE

### Endpoint
/v1/installations/{installationId}

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
```

--------------------------------

### Install LiteLLM Dependencies - Bash

Source: https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/litellm

Install the required Python packages for LiteLLM and environment variable management. Uses pip to install litellm and python-dotenv packages needed for the integration.

```bash
pip install litellm python-dotenv
```

--------------------------------

### Install OpenAI and Anthropic Python SDKs

Source: https://vercel.com/docs/ai-gateway/sdks-and-apis/python

These commands install the necessary Python packages for interacting with the Vercel AI Gateway using either the OpenAI or Anthropic SDKs. Choose the SDK that best fits your project's requirements.

```bash
pip install openai
```

```bash
pip install anthropic
```

--------------------------------

### Example JSON Response for Deployment File List

Source: https://vercel.com/docs/rest-api/reference/endpoints/deployments/list-deployment-files

This JSON snippet illustrates the typical structure of the response received when successfully listing deployment files. It shows an array of file objects, each containing properties such as `name`, `type` (e.g., 'file', 'directory'), `mode`, `uid`, `children` (for directories), and `contentType`.

```json
[
  {
    "name": "my-file.json",
    "type": "file",
    "mode": 123,
    "uid": "2d4aad419917f15b1146e9e03ddc9bb31747e4d0",
    "children": "<array>",
    "contentType": "application/json"
  }
]
```

--------------------------------

### Example Project Selection Value for Vercel Configuration

Source: https://vercel.com/docs/rest-api/reference/endpoints/integrations/retrieve-an-integration-configuration

This example shows a valid value for the `projectSelection` field. It defines the scope of project access for the integration, with `"all"` indicating full access to all projects. Other options include `"selected"` for restricted access.

```json
"all"
```

--------------------------------

### Command.startedAt

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

Accessor that returns the Unix timestamp in milliseconds when the command started executing. Use this to monitor execution duration or set timeout thresholds for long-running processes.

```APIDOC
## Command.startedAt

### Description
startedAt returns the Unix timestamp (in milliseconds) when the command started executing. Subtract this from the current time to monitor execution duration or set timeout thresholds for long-running processes.

### Property Type
`number`

### Usage Example
```ts
const duration = Date.now() - command.startedAt;
console.log(`Command has been running for ${duration}ms`);
```

### Returns
`number` - Unix timestamp in milliseconds when the command started.
```

--------------------------------

### Configure Vite for Nitro integration in TanStack Start

Source: https://vercel.com/docs/frameworks/full-stack/tanstack-start

This configuration snippet for `vite.config.ts` integrates the Nitro Vite plugin into a TanStack Start project. It imports and adds the `nitro()` plugin to the Vite configuration, enabling Vercel-specific features and deployment optimizations.

```typescript
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'

export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro(),
    viteReact()
  ]
})
```

--------------------------------

### Example JSON Response for Get Edge Configurations API

Source: https://vercel.com/docs/rest-api/reference/endpoints/edge-config/get-edge-configs

This JSON snippet illustrates the typical successful response structure when calling the `getEdgeConfigs` endpoint. It shows an array containing one or more Edge Config objects, each with properties like `sizeInBytes`, `itemCount`, `id`, `createdAt`, `ownerId`, `slug`, `updatedAt`, `digest`, and nested objects for `transfer`, `schema`, and `purpose`. This structure helps in parsing and handling the API's output.

```JSON
[
  {
    "sizeInBytes": 123,
    "itemCount": 123,
    "id": "<string>",
    "createdAt": 123,
    "ownerId": "<string>",
    "slug": "<string>",
    "updatedAt": 123,
    "digest": "<string>",
    "transfer": {
      "fromAccountId": "<string>",
      "startedAt": 123,
      "doneAt": 123
    },
    "schema": {},
    "purpose": {
      "type": "flags",
      "projectId": "<string>"
    }
  }
]
```

--------------------------------

### Configure SvelteKit Project-Level Deployment with Node.js Runtime

Source: https://vercel.com/docs/frameworks/sveltekit

This example demonstrates how to configure your SvelteKit project's deployment settings in `svelte.config.js` to use Vercel's Node.js serverless runtime. It utilizes `@sveltejs/adapter-vercel` to define the `runtime` within the `kit.adapter` configuration, affecting all routes by default.

```javascript
import adapter from '@sveltejs/adapter-vercel';
 
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      runtime: 'nodejs20.x',
    }),
  },
};
 
export default config;
```

--------------------------------

### Trigger Vercel Deploy Hook and disable Build Cache with cURL

Source: https://vercel.com/docs/deploy-hooks

This example shows how to trigger a Vercel Deploy Hook while explicitly disabling the build cache for the upcoming deployment. Appending `?buildCache=false` to the Deploy Hook URL ensures that the deployment starts without utilizing any previously cached build artifacts, which can be useful for specific scenarios.

```bash
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_98g22o5YUFVHlKOzj9vKPTyN2SDG/tKybBxqhQs?buildCache=false
```

--------------------------------

### Create Node.js HTTP Handler with JavaScript

Source: https://vercel.com/docs/functions/configuring-functions/runtime

Defines a GET request handler for Vercel Functions using JavaScript. This example works with Next.js App Router and returns a simple text response. The function receives a Request object and returns a Response object.

```javascript
export function GET(request) {
  return new Response('Hello from Vercel!');
}
```

--------------------------------

### Create API Route for Calling Wasm File in Node.js

Source: https://vercel.com/docs/functions/runtimes/wasm

This TypeScript example demonstrates how to create an API route that reads a compiled WebAssembly file, instantiates it, and calls an exported Wasm function. The code uses the nodejs runtime with Fluid compute, reads the .wasm file from the project root, and exports the result through an HTTP GET endpoint that accepts a number parameter.

```typescript
import path from 'node:path';
import fs from 'node:fs';
import type * as addWasmModule from '../../../add.wasm'; // import type definitions at the root of your project

const wasmBuffer = fs.readFileSync(path.resolve(process.cwd(), './add.wasm')); // path from root
const wasmPromise = WebAssembly.instantiate(wasmBuffer);

export async function GET(request: Request) {
  const url = new URL(request.url);
  const num = Number(url.searchParams.get('number') || 10);
  const { add_one: addOne } = (await wasmPromise).instance
    .exports as typeof addWasmModule;

  return new Response(`got: ${addOne(num)}`);
}
```

--------------------------------

### Override Vercel Build Install Command in JSON

Source: https://vercel.com/docs/project-configuration/vercel-json

The `installCommand` property in `vercel.json` allows overriding the project's default install command, which is useful for experimenting with different package managers or skipping the installation step entirely by providing an empty string. This provides flexibility in managing project dependencies during deployment.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "npm install"
}
```

--------------------------------

### Create Node.js HTTP Handler with TypeScript

Source: https://vercel.com/docs/functions/configuring-functions/runtime

Defines a GET request handler for Vercel Functions using TypeScript. This example works with Next.js App Router and returns a simple text response. The function receives a Request object and returns a Response object.

```typescript
export function GET(request: Request) {
  return new Response('Hello from Vercel!');
}
```

--------------------------------

### Deploying Prebuilt Vercel Project using CLI

Source: https://vercel.com/docs/cli/deploy

Shows how to deploy a Vercel project that has already been built, typically using `vercel build`. The `--prebuilt` flag tells Vercel to use the output from a previous build.

```bash
vercel deploy --prebuilt
```

--------------------------------

### SSO URL Format and Flow

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api

Implementation guide for using sso: prefixed URLs in API responses. When users click these links, Vercel initiates the SSO flow and redirects to the target URL with authenticated access.

```APIDOC
## SSO URL Implementation

### Description
Use sso: prefixed URLs in API response fields to trigger Vercel's SSO flow. This enables seamless authentication before redirecting users to your platform.

### URL Format
sso:https://your-integration.com/resource-page

### Supported Fields
- Installation notification links (notification.href)
- Resource URLs in API responses
- Any URL field that supports sso: prefix

### SSO Flow Process
1. User clicks an sso: URL in Vercel
2. Vercel initiates the SSO flow with redirectLoginUrl
3. Provider validates SSO request via SSO Token Exchange endpoint
4. User is redirected to target URL with authenticated access

### Example Usage
```
sso:https://your-integration.com/dashboard/usage
sso:https://your-integration.com/billing/invoices
sso:https://your-integration.com/settings/api-keys
```

### Implementation Notes
- Always validate the sso: URL for security
- Ensure target URL is under your domain
- Implement proper session management after SSO
- Handle token expiration and refresh appropriately
```

--------------------------------

### Delete Vercel Installation via HTTP API

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/delete-installation

This HTTP snippet demonstrates how to initiate the deletion of a Vercel installation. The deletion is typically postponed for 24 hours, but immediate deletion can be requested by specifying `finalized:true` in the response. The `{installationId}` path parameter identifies the specific installation to be deleted.

```http
DELETE /v1/installations/{installationId}
```

--------------------------------

### Example URL for an uploaded Vercel Blob

Source: https://vercel.com/docs/storage/vercel-blob/using-blob-sdk

This is an example of a public URL generated for a blob uploaded using the `upload()` method, demonstrating the structure including the storage domain, path, and a unique identifier.

```Plaintext
https://ce0rcu23vrrdzqap.public.blob.vercel-storage.com/profilesv1/user-12345-NoOVGDVcqSPc7VYCUAGnTzLTG2qEM2.txt
```

--------------------------------

### List Deployment Files with Vercel SDK in TypeScript

Source: https://vercel.com/docs/rest-api/reference/endpoints/deployments/list-deployment-files

This TypeScript example demonstrates how to use the Vercel SDK to programmatically list the files within a specific deployment. It initializes the Vercel client with a bearer token and then calls the `deployments.listDeploymentFiles` method, requiring a deployment `id`, `teamId`, and `slug` to retrieve the file tree.

```typescript
import { Vercel } from "@vercel/sdk";

const vercel = new Vercel({
  bearerToken: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await vercel.deployments.listDeploymentFiles({
    id: "<id>",
    teamId: "team_1a2b3c4d5e6f7g8h9i0j1k2l",
    slug: "my-team-url-slug",
  });

  console.log(result);
}

run();
```

--------------------------------

### GET /v1/integrations/configuration/{id}

Source: https://vercel.com/docs/rest-api/reference/endpoints/integrations/retrieve-an-integration-configuration

Retrieves the configuration details for a specific integration by its ID. This endpoint returns comprehensive information about the integration setup, including project associations, transfer requests, billing plans, and current status. Authentication is required via bearer token.

```APIDOC
## GET /v1/integrations/configuration/{id}

### Description
Retrieves the configuration details for a specific integration by its ID. Returns comprehensive information about the integration setup, including project associations, transfer requests, billing plans, and current status.

### Method
GET

### Endpoint
/v1/integrations/configuration/{id}

### Parameters
#### Path Parameters
- **id** (string) - Required - ID of the configuration to check
  - Example: `icfg_cuwj0AdCdH3BwWT4LPijCC7t`

#### Query Parameters
- **teamId** (string) - Optional - The Team identifier to perform the request on behalf of
  - Example: `team_1a2b3c4d5e6f7g8h9i0j1k2l`
- **slug** (string) - Optional - The Team slug to perform the request on behalf of
  - Example: `my-team-url-slug`

#### Headers
- **Authorization** (string) - Required - Bearer token for authentication

### Request Example
```typescript
import { Vercel } from "@vercel/sdk";

const vercel = new Vercel({
  bearerToken: "<YOUR_BEARER_TOKEN_HERE>"
});

async function run() {
  const result = await vercel.integrations.getConfiguration({
    id: "icfg_cuwj0AdCdH3BwWT4LPijCC7t",
    teamId: "team_1a2b3c4d5e6f7g8h9i0j1k2l",
    slug: "my-team-url-slug"
  });

  console.log(result);
}

run();
```

### Response
#### Success Response (200)
- **projectSelection** (string) - Project selection mode (e.g., "all")
- **notification** (object) - Notification details
  - **level** (string) - Notification level (e.g., "error")
  - **title** (string) - Notification title
  - **message** (string) - Notification message
  - **href** (string) - Notification link
- **transferRequest** (object) - Transfer request information
  - **kind** (string) - Type of transfer request
  - **requestId** (string) - Request identifier
  - **transferId** (string) - Transfer identifier
  - **requester** (object) - Requester information
    - **name** (string) - Requester name
    - **email** (string) - Requester email
  - **createdAt** (number) - Creation timestamp
  - **expiresAt** (number) - Expiration timestamp
  - **metadata** (object) - Additional metadata
  - **billingPlan** (object) - Billing plan details
    - **id** (string) - Plan identifier
    - **type** (string) - Plan type (e.g., "prepayment")
    - **name** (string) - Plan name
    - **description** (string) - Plan description
    - **scope** (string) - Plan scope (e.g., "installation")
    - **paymentMethodRequired** (boolean) - Whether payment method is required
    - **preauthorizationAmount** (number) - Preauthorization amount
  - **discardedAt** (number) - Discard timestamp
  - **discardedBy** (string) - User who discarded
  - **approvedAt** (number) - Approval timestamp
  - **approvedBy** (string) - User who approved
  - **authorizationId** (string) - Authorization identifier
- **type** (string) - Configuration type (e.g., "integration-configuration")
- **createdAt** (number) - Creation timestamp
- **id** (string) - Configuration identifier
- **slug** (string) - Configuration slug
- **updatedAt** (number) - Last update timestamp
- **userId** (string) - User identifier
- **scopes** (array) - Array of permission scopes
- **integrationId** (string) - Integration identifier
- **ownerId** (string) - Owner identifier
- **projects** (array) - Array of associated project IDs
- **status** (string) - Configuration status
- **deletedAt** (number) - Deletion timestamp
- **teamId** (string) - Team identifier
- **source** (string) - Configuration source (e.g., "marketplace")
- **canConfigureOpenTelemetry** (boolean) - Whether OpenTelemetry can be configured
- **completedAt** (number) - Completion timestamp
- **externalId** (string) - External identifier
- **disabledAt** (number) - Disabled timestamp
- **deleteRequestedAt** (number) - Delete request timestamp
- **disabledReason** (string) - Reason for disabling
- **installationType** (string) - Installation type (e.g., "marketplace")

#### Response Example
```json
{
  "projectSelection": "all",
  "notification": {
    "level": "error",
    "title": "<string>",
    "message": "<string>",
    "href": "<string>"
  },
  "transferRequest": {
    "kind": "transfer-to-marketplace",
    "requestId": "<string>",
    "transferId": "<string>",
    "requester": {
      "name": "<string>",
      "email": "<string>"
    },
    "createdAt": 123,
    "expiresAt": 123,
    "metadata": {},
    "billingPlan": {
      "id": "<string>",
      "type": "prepayment",
      "name": "<string>",
      "description": "<string>",
      "scope": "installation",
      "paymentMethodRequired": false,
      "preauthorizationAmount": 123
    },
    "discardedAt": 123,
    "discardedBy": "<string>",
    "approvedAt": 123,
    "approvedBy": "<string>",
    "authorizationId": "<string>"
  },
  "type": "integration-configuration",
  "createdAt": 1558531915505,
  "id": "icfg_3bwCLgxL8qt5kjRLcv2Dit7F",
  "slug": "slack",
  "updatedAt": 1558531915505,
  "userId": "kr1PsOIzqEL5Xg6M4VZcZosf",
  "scopes": [
    "read:project",
    "read-write:log-drain"
  ],
  "integrationId": "oac_xzpVzcUOgcB1nrVlirtKhbWV",
  "ownerId": "kr1PsOIzqEL5Xg6M4VZcZosf",
  "projects": [
    "prj_xQxbutw1HpL6HLYPAzt5h75m8NjO"
  ],
  "status": "error",
  "deletedAt": 1558531915505,
  "teamId": "team_nLlpyC6RE1qxydlFKbrxDlud",
  "source": "marketplace",
  "canConfigureOpenTelemetry": false,
  "completedAt": 1558531915505,
  "externalId": "<string>",
  "disabledAt": 1558531915505,
  "deleteRequestedAt": 1558531915505,
  "disabledReason": "disabled-by-owner",
  "installationType": "marketplace"
}
```
```

--------------------------------

### Enable Corepack and Install pnpm Dependencies (Bash)

Source: https://vercel.com/docs/integrations/ecommerce/bigcommerce

Enables Corepack, a tool for managing package manager versions, then activates pnpm and installs all project dependencies required for the Catalyst project.

```bash
corepack enable pnpm && pnpm install
```

--------------------------------

### Get Supported TLDs using Vercel Domains Registrar API

Source: https://vercel.com/docs/domains/registrar-api

This example demonstrates how to retrieve a list of supported Top-Level Domains (TLDs) using the Vercel Domains Registrar API. It shows two methods: one using the Vercel SDK in TypeScript, and another using a direct cURL request. Both methods require an access token for authentication.

```typescript
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});

const result = await vercel.domainsRegistrar.getSupportedTlds();
```

```bash
curl --request GET \
  --url https://api.vercel.com/v1/registrar/tlds/supported \
  --header 'Authorization: Bearer <token>'
```

--------------------------------

### Example Conformance Error and Allowlist Entry

Source: https://vercel.com/docs/conformance/rules/ESLINT_CONFIGURATION

This example illustrates a Conformance error message for incorrect ESLint configuration, specifically regarding `reportUnusedDisableDirectives`. It also provides the JSON format for an allowlist entry, which can be used to temporarily ignore such violations by specifying the `testName`, `reason`, and `location` of the workspace.

```sh
A Conformance error occurred in test "ESLINT_CONFIGURATION".

ESLint configuration must specify `reportUnusedDisableDirectives` to be `true`

To find out more information and how to fix this error, visit
/docs/conformance/rules/ESLINT_CONFIGURATION.

If this violation should be ignored, add the following entry to
/apps/dashboard/.allowlists/ESLINT_CONFIGURATION.allowlist.json and get approval from the appropriate person.
```

```json
{
  "testName": "ESLINT_CONFIGURATION",
  "reason": "TODO: Add reason why this violation is allowed to be ignored.",
  "location": {
    "workspace": "dashboard"
  }
}
```

--------------------------------

### Send AI Gateway Request with cURL

Source: https://vercel.com/docs/ai-gateway/getting-started

This cURL command demonstrates how to make a POST request to the Vercel AI Gateway's /v1/responses endpoint. It sends a user prompt to a specified AI model (e.g., Anthropic Claude) and requires an API key for authorization. The request body is a JSON payload containing the model identifier and the input message.

```bash
curl -X POST "https://ai-gateway.vercel.sh/v1/responses" \
  -H "Authorization: Bearer $AI_GATEWAY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "anthropic/claude-sonnet-4.5",
    "input": [
      {
        "type": "message",
        "role": "user",
        "content": "Invent a new holiday and describe its traditions."
      }
    ]
  }'
```

--------------------------------

### Example JSON Response for AI Model Discovery API

Source: https://vercel.com/docs/ai-gateway/models-and-providers

This JSON snippet provides an example of the expected response format when querying the `/v1/models` REST API endpoint. It shows a list of model objects, each containing comprehensive details such as ID, name, description, context window, pricing (including input, output, and cache tiers), and other metadata.

```json
{
  "object": "list",
  "data": [
    {
      "id": "google/gemini-3-pro",
      "object": "model",
      "created": 1755815280,
      "owned_by": "google",
      "name": "Gemini 3 Pro",
      "description": "This model improves upon Gemini 2.5 Pro and is catered towards challenging tasks, especially those involving complex reasoning or agentic workflows.",
      "context_window": 1000000,
      "max_tokens": 64000,
      "type": "language",
      "tags": ["file-input", "tool-use", "reasoning", "vision"],
      "pricing": {
        "input": "0.000002",
        "input_tiers": [
          { "cost": "0.000002", "min": 0, "max": 200001 },
          { "cost": "0.000004", "min": 200001 }
        ],
        "output": "0.000012",
        "output_tiers": [
          { "cost": "0.000012", "min": 0, "max": 200001 },
          { "cost": "0.000018", "min": 200001 }
        ],
        "input_cache_read": "0.0000002",
        "input_cache_read_tiers": [
          { "cost": "0.0000002", "min": 0, "max": 200001 },
          { "cost": "0.0000004", "min": 200001 }
        ],
        "input_cache_write": "0.000002",
        "input_cache_write_tiers": [
          { "cost": "0.000002", "min": 0, "max": 200001 },
          { "cost": "0.000004", "min": 200001 }
        ]
      }
    }
  ]
}
```

--------------------------------

### Install AWS RDS Signer and PostgreSQL packages

Source: https://vercel.com/docs/oidc/aws

Install required dependencies for AWS RDS database integration with Vercel Functions. Includes RDS signer, Vercel functions, and PostgreSQL client. Supports multiple package managers.

```pnpm
pnpm i @aws-sdk/rds-signer @vercel/functions pg
```

```yarn
yarn i @aws-sdk/rds-signer @vercel/functions pg
```

```npm
npm i @aws-sdk/rds-signer @vercel/functions pg
```

```bun
bun i @aws-sdk/rds-signer @vercel/functions pg
```

--------------------------------

### Configure Reasoning Behavior for OpenAI Models in TypeScript

Source: https://vercel.com/docs/ai-gateway/models-and-providers/provider-options

Illustrates how to configure reasoning (thinking) behavior for models that support it, such as OpenAI's gpt-oss-120b. The example sets reasoningEffort to 'high' and reasoningSummary to 'detailed' to control computational effort and output detail level. For gpt-5 and gpt-5.1 models, both parameters must be explicitly set.

```typescript
import { streamText } from 'ai';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const result = streamText({
    model: 'openai/gpt-oss-120b',
    prompt,
    providerOptions: {
      openai: {
        reasoningEffort: 'high',
        reasoningSummary: 'detailed',
      },
    },
  });

  return result.toUIMessageStreamResponse();
}
```

--------------------------------

### Installation Deletion Request Body JSON

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/delete-installation

JSON request body for deleting an installation. Includes a boolean flag to cascade resource deletion and a string field for the deletion reason. Both fields are used to control deletion behavior and provide audit trail information.

```json
{
  "cascadeResourceDeletion": "boolean",
  "reason": "string"
}
```

--------------------------------

### Configure Vercel Private Registry in NPM_RC Environment Variable

Source: https://vercel.com/docs/private-registry

This shell snippet provides the necessary configuration for the `NPM_RC` environment variable, directing npm to use the Vercel private registry for `@vercel-private` scoped packages. It also includes an `_authToken` placeholder for authentication, which should be replaced by a `VERCEL_TOKEN`. This setup allows Vercel deployments to correctly resolve and install private packages.

```sh
@vercel-private:registry=https://vercel-private-registry.vercel.sh/registry
//vercel-private-registry.vercel.sh/:_authToken=${VERCEL_TOKEN}
```

--------------------------------

### Pagination Structure and Usage

Source: https://vercel.com/docs/rest-api/reference

Learn how to handle paginated API responses from Vercel. The API returns a pagination object when results exceed the limit per request (default 20, max 100). Use the pagination timestamps to fetch subsequent pages of results.

```APIDOC
## Pagination

### Description
When API responses include arrays of records exceeding the limit per request, a pagination object is returned to help retrieve all records across multiple requests.

### Pagination Object Structure
```json
{
  "pagination": {
    "count": 20,
    "next": 1555072968396,
    "prev": 1555413045188
  }
}
```

### Parameters
#### Query Parameters
- **limit** (integer) - Optional - Number of items per page (default: 20, maximum: 100)
- **until** (timestamp) - Optional - Timestamp value from previous `next` field to fetch next page

### Pagination Object Fields
- **count** (integer) - Amount of items in the current page
- **next** (timestamp) - Timestamp to use for requesting the next page (null when no more pages)
- **prev** (timestamp) - Timestamp to use for requesting the previous page

### Usage Instructions
1. Send a request to the API endpoint with optional `limit` query parameter
2. Check the `pagination.next` value in the response
3. If `next` is not null, send another request with `until` parameter set to the `next` value
4. Repeat until `pagination.next` is null

### Example: Fetch All Projects
```javascript
const axios = require('axios');
const fs = require('fs');
const vercelToken = 'yourtokenvalue';
const apiEndPt = 'https://api.vercel.com/v9/projects';

let config = {
  method: 'get',
  url: apiEndPt,
  headers: {
    Authorization: 'Bearer ' + vercelToken
  }
};
let results = [];

(function loop() {
  axios(config)
    .then(function (response) {
      results.push(...response.data.projects);
      if (response.data.pagination.next !== null) {
        config.url = `${apiEndPt}?until=${response.data.pagination.next}`;
        loop();
      } else {
        fs.writeFileSync('projects.json', JSON.stringify(results));
      }
    })
    .catch(function (error) {
      console.log(error);
    });
})();
```
```

--------------------------------

### POST /v1/installations/{integrationConfigurationId}/billing/invoices

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel

Submits an invoice for a specific installation in the Vercel Marketplace.

```APIDOC
## POST /v1/installations/{integrationConfigurationId}/billing/invoices

### Description
Submits an invoice for a specific installation in the Vercel Marketplace.

### Method
POST

### Endpoint
/v1/installations/{integrationConfigurationId}/billing/invoices

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required - The ID of the integration configuration.

#### Query Parameters
None

#### Request Body
None

### Request Example
{}

### Response
#### Success Response (200)
None

#### Response Example
{}
```

--------------------------------

### List and Display Vercel Blobs with Download Links using JavaScript

Source: https://vercel.com/docs/storage/vercel-blob

This example shows how to retrieve a list of all blobs stored in Vercel Blob using the `list` function from the `@vercel/blob` SDK. It then iterates through the returned blobs and renders an anchor tag for each, using the `downloadUrl` property to create a direct download link. This allows users to view or download stored files directly from a web interface.

```javascript
import { list } from '@vercel/blob';
 
export default async function Page() {
  const response = await list();
 
  return (
    <>
      {response.blobs.map((blob) => (
        <a key={blob.pathname} href={blob.downloadUrl}>
          {blob.pathname}
        </a>
      ))}
    </>
  );
}
```

--------------------------------

### Run development server in sandbox with port exposure

Source: https://vercel.com/docs/vercel-sandbox/cli-reference

Creates a sandbox with exposed port access and starts a development server. The --publish-port flag enables external access to the server via a provided Vercel URL, allowing testing of web applications.

```bash
# Create with port exposure
sandbox create --timeout 30m --publish-port 3000

# Start your dev server
sandbox exec --workdir /app sb_abc123xyz npm run dev

# Access at the provided URL
# Visit: https://sb-abc123xyz.vercel.app
```

--------------------------------

### Display Vercel Slack Integration Commands and Options

Source: https://vercel.com/docs/comments/integrations

Access a comprehensive list of all available commands and their options for the Vercel Slack integration. This helps users discover functionalities and parameters for managing their Vercel projects and notifications within Slack.

```bash
/vercel help
```

--------------------------------

### Get Member Information via TypeScript

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api

Retrieve details about a specific team member associated with an installation using the Vercel Marketplace API. This function makes an authenticated request to fetch member information including name, email, role, and avatar, which can be used for access control and audit logging purposes.

```typescript
async function getMemberInfo(
  installationId: string,
  memberId: string
): Promise<MemberInfo> {
  const response = await fetch(
    `https://api.vercel.com/v1/installations/${installationId}/member/${memberId}`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to get member info: ${response.statusText}`);
  }

  return response.json();
}
```

--------------------------------

### Configure Next.js Pages Router Rewrites for Vercel Flags Endpoint

Source: https://vercel.com/docs/feature-flags/flags-explorer/getting-started

This JavaScript configuration for `next.config.js` sets up a rewrite rule for Next.js applications using the Pages Router. It redirects requests to `/.well-known/vercel/flags` to the internal `/api/vercel/flags` endpoint, which is necessary because the Pages Router restricts API routes to the `api` folder, ensuring the Vercel Flags endpoint is accessible.

```javascript
module.exports = {
  async rewrites() {
    return [
      {
        source: '/.well-known/vercel/flags',
        destination: '/api/vercel/flags',
      },
    ];
  },
};
```

--------------------------------

### Verify TXT Record Propagation with dig Command

Source: https://vercel.com/docs/domains/working-with-domains/claim-domain-ownership

Use the dig command-line tool to verify that a TXT record has propagated to your domain's DNS configuration. This is useful when troubleshooting domain ownership verification failures. Replace 'example.com' with your actual domain name.

```bash
dig TXT _vercel.example.com
```

--------------------------------

### Get Vercel Deployment Environment (Next.js/Blitz.js)

Source: https://vercel.com/docs/environment-variables/framework-environment-variables

Determine the environment (production, preview, or development) where the Next.js/Blitz.js application is deployed and running on Vercel. Available at both build and runtime.

```bash
NEXT_PUBLIC_VERCEL_ENV=production
```

--------------------------------

### Displaying Missing ESLint Security Plugins Error (Shell)

Source: https://vercel.com/docs/conformance/rules/ESLINT_NEXT_RULES_REQUIRED

This shell example illustrates an error message indicating that the ESLint configuration is missing required security plugins. It specifically points out the absence of `@next/next` while listing other registered plugins like `import` and `@typescript-eslint`. This error occurs when the necessary ESLint plugins for Next.js are not installed or properly referenced in the project's configuration.

```sh
ESLint configuration is missing required security plugins:
  Missing plugins: @next/next
  Registered plugins: import and @typescript-eslint
```

--------------------------------

### Example Python build script for Vercel deployments

Source: https://vercel.com/docs/frameworks/backend/fastapi

This Python script demonstrates a simple build command that prints a message and creates a file. It can be used as a custom build step defined in `pyproject.toml` for FastAPI applications on Vercel, executing specific actions during the build process.

```python
def main():
    print("Running build command...")
    with open("build.txt", "w") as f:
        f.write("BUILD_COMMAND")

if __name__ == "__main__":
    main()
```

--------------------------------

### vercel rolling-release start

Source: https://vercel.com/docs/cli/rolling-release

Start a rolling release for a specific deployment. This command initiates the gradual rollout of a deployment across your user base according to configured stages.

```APIDOC
## vercel rolling-release start

### Description
Start a rolling release for a specific deployment. Initiates the gradual rollout process according to the configured stages.

### Command
```bash
vercel rolling-release start --dpl=<DEPLOYMENT_ID_OR_URL> [--yes]
```

### Parameters
#### Options
- **--dpl** (String) - Required - The deployment ID or URL to target
- **--yes** (Boolean) - Optional - Skip confirmation prompt

### Request Examples
```bash
vercel rr start --dpl=dpl_123abc456def
vercel rr start --dpl=https://my-project-abc123.vercel.app
vercel rr start --dpl=dpl_123 --yes
```

### Response
Rolling release started successfully for the specified deployment. The deployment will begin rolling out according to configured stages.
```

--------------------------------

### List Integration Resources with vercel integration list

Source: https://vercel.com/docs/cli/integration

Displays all installed resources with their associated integrations for the current team or project. Supports filtering by specific integration and listing across all projects with --all and --integration options.

```bash
vercel integration list

# Filter resources to a specific integration
vercel integration list --integration neon
vercel integration list -i upstash

# List all resources across all projects in the team
vercel integration list --all
vercel integration list -a
```

--------------------------------

### Basic Vercel Project Deployment using CLI

Source: https://vercel.com/docs/cli/deploy

Demonstrates the simplest way to deploy a Vercel project by running the `vercel` command from the project's root directory. This command implicitly acts as `vercel deploy`.

```bash
vercel
```

--------------------------------

### Examples of `vercel integration-resource remove` command usage

Source: https://vercel.com/docs/cli/integration-resource

These examples demonstrate various ways to remove an integration resource using the `vercel integration-resource remove` command. They cover basic removal, using the `ir rm` alias, disconnecting all projects before deletion with `--disconnect-all`, and bypassing confirmation prompts with `--yes`.

```bash
# Remove a resource
vercel integration-resource remove my-database

# Remove with alias
vercel ir rm my-cache

# Disconnect all projects and remove
vercel ir remove my-database --disconnect-all

# Remove without confirmation
vercel ir rm my-cache -a -y
```

--------------------------------

### Get Vercel Target Environment (Next.js/Blitz.js)

Source: https://vercel.com/docs/environment-variables/framework-environment-variables

Identify the specific system or custom environment (production, preview, development, or custom name) where the Next.js/Blitz.js application is deployed and running on Vercel. Available at both build and runtime.

```bash
NEXT_PUBLIC_VERCEL_TARGET_ENV=production
```

--------------------------------

### sandbox.mkDir()

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

Creates directories in the sandbox filesystem before you write files or clone repositories. Paths are relative to `/vercel/sandbox` unless you provide an absolute path, so call this before `writeFiles()` when you need nested folders.

```APIDOC
## Function: sandbox.mkDir()

### Description
Creates directories in the sandbox filesystem before you write files or clone repositories. Paths are relative to `/vercel/sandbox` unless you provide an absolute path, so call this before `writeFiles()` when you need nested folders.

### Parameters
- **path** (string) - Required - Directory to create.
- **opts.signal** (AbortSignal) - Optional - Cancel the operation.

### Usage Example
```ts
await sandbox.mkDir('tmp/assets');
```

### Returns
`Promise<void>`.
```

--------------------------------

### Get Git Provider (Next.js/Blitz.js)

Source: https://vercel.com/docs/environment-variables/framework-environment-variables

Identify the Git provider (e.g., GitHub) from which the Vercel deployment was triggered for Next.js/Blitz.js projects. Available at both build and runtime.

```bash
NEXT_PUBLIC_VERCEL_GIT_PROVIDER=github
```

--------------------------------

### Create Basic Vercel Routing Middleware (TypeScript)

Source: https://vercel.com/docs/routing-middleware/getting-started

This snippet demonstrates how to set up a fundamental Vercel Routing Middleware in `middleware.ts`. It logs the incoming request URL and returns a simple response, showcasing the middleware's ability to intercept and respond to requests. The optional `config.runtime` specifies the execution environment.

```typescript
export const config = {
  runtime: 'nodejs' // optional: use 'nodejs' or omit for 'edge' (default)
};

export default function middleware(request: Request) {
  console.log('Request to:', request.url);
  return new Response('Logging request URL from Middleware');
}
```

--------------------------------

### Handle Blob Upload with Token Generation - JavaScript

Source: https://vercel.com/docs/vercel-blob/client-upload

JavaScript implementation of a Vercel Blob upload handler that generates client tokens for browser uploads with content type restrictions and handles upload completion callbacks. The handler authenticates users before token generation to prevent anonymous uploads and processes blob metadata after successful upload.

```javascript
import { handleUpload } from '@vercel/blob/client';

export default async function handler(request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        // Generate a client token for the browser to upload the file
        // Make sure to authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          addRandomSuffix: true,
          // callbackUrl: 'https://example.com/api/avatar/upload',
          // optional, `callbackUrl` is automatically computed when hosted on Vercel
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            // you could pass a user id from auth, or a value from clientPayload
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Called by Vercel API on client upload completion
        // Use tools like ngrok if you want this to work locally

        console.log('blob upload completed', blob, tokenPayload);

        try {
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          throw new Error('Could not update user');
        }
      },
    });

    return Response.json(jsonResponse);
  } catch (error) {
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
```

--------------------------------

### Generate SSL Challenge Records using Vercel CLI

Source: https://vercel.com/docs/domains/pre-generating-ssl-certs

This command uses the Vercel CLI to generate challenge records for a domain, specifically for `*.example.com` and `example.com`. It's used when pre-generating SSL certificates to obtain the necessary TXT records for domain ownership verification without immediately issuing the certificate.

```bash
vercel certs issue "*.example.com" example.com --challenge-only
```

--------------------------------

### Example User ID for Vercel Configuration Creator

Source: https://vercel.com/docs/rest-api/reference/endpoints/integrations/retrieve-an-integration-configuration

This example shows a sample user ID (`userId`) of the individual who created the Vercel integration configuration. This `string` field is required and links the configuration to its creator.

```json
"kr1PsOIzqEL5Xg6M4VZcZosf"
```

--------------------------------

### GET /deployments/{idOrUrl}/logs

Source: https://vercel.com/docs/ai-resources/vercel-mcp/tools

Get the build logs of a deployment by deployment ID or URL. You can use this to investigate why a deployment failed.

```APIDOC
## GET /deployments/{idOrUrl}/logs

### Description
Get the build logs of a deployment by deployment ID or URL. You can use this to investigate why a deployment failed.

### Method
GET

### Endpoint
/deployments/{idOrUrl}/logs

### Parameters
#### Path Parameters
- **idOrUrl** (string) - Required - The unique identifier or hostname of the deployment

#### Query Parameters
- **limit** (number) - Optional - Maximum number of log lines to return. Default: 100
- **teamId** (string) - Required - The team ID to get the deployment logs for. Alternatively the team slug can be used. Team IDs start with 'team_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`.

### Request Example
{}

### Response
#### Success Response (200)
- **logs** (array of object) - An array of log entries.
  - **id** (string) - Unique ID of the log entry.
  - **date** (string) - Timestamp of the log entry.
  - **text** (string) - The log message.

#### Response Example
{
  "logs": [
    {
      "id": "log_1",
      "date": "2023-10-27T10:00:00Z",
      "text": "[BUILD] Starting build process..."
    },
    {
      "id": "log_2",
      "date": "2023-10-27T10:00:05Z",
      "text": "[BUILD] Installing dependencies..."
    }
  ]
}
```

--------------------------------

### Disable Vercel GitHub Auto-Deployments (JSON, TypeScript)

Source: https://vercel.com/docs/project-configuration/git-configuration

This snippet demonstrates how to disable automatic deployments for a Vercel project by setting the `github.enabled` property to `false`. This property is deprecated in favor of `git.deploymentEnabled`. When `false`, Vercel for GitHub will not deploy the project, even if the app is installed. Examples are shown for `vercel.json` and `vercel.ts`.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "github": {
    "enabled": false
  }
}
```

```typescript
import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  github: {
    enabled: false,
  },
};
```

--------------------------------

### sandbox.snapshot()

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

Captures the current state of a sandbox including filesystem and installed packages. The sandbox automatically shuts down after calling this method. Snapshots expire after 7 days and can be used to create new sandboxes with pre-configured environments.

```APIDOC
## sandbox.snapshot()

### Description
Captures the current state of the sandbox, including the filesystem and installed packages. Use snapshots to skip lengthy setup steps when creating new sandboxes. The sandbox must be running to create a snapshot and will automatically shut down after this method is called.

### Method
Async Method

### Parameters
#### Optional Parameters
- **opts.signal** (AbortSignal) - Optional - Cancel the operation.

### Request Example
```ts
const snapshot = await sandbox.snapshot();
console.log(snapshot.snapshotId);

// Later, create a new sandbox from the snapshot
const newSandbox = await Sandbox.create({
  source: { type: 'snapshot', snapshotId: snapshot.snapshotId }
});
```

### Response
#### Success Response
- **snapshotId** (string) - Unique identifier for the created snapshot

#### Returns
`Promise<Snapshot>` - A promise that resolves to a Snapshot object containing the snapshotId.

### Notes
- Snapshots expire after 7 days
- The sandbox becomes unreachable after snapshot creation
- No need to call stop() after creating a snapshot
- Subsequent commands to the sandbox will fail after snapshot creation
```

--------------------------------

### Handle Blob Upload with Token Generation - TypeScript

Source: https://vercel.com/docs/vercel-blob/client-upload

TypeScript implementation of a Vercel Blob upload handler that generates client tokens for browser uploads with content type restrictions and handles upload completion callbacks. The handler authenticates users before token generation to prevent anonymous uploads and processes blob metadata after successful upload.

```typescript
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';

export default async function handler(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname,
        /* clientPayload */
      ) => {
        // Generate a client token for the browser to upload the file
        // Make sure to authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          addRandomSuffix: true,
          // callbackUrl: 'https://example.com/api/avatar/upload',
          // optional, `callbackUrl` is automatically computed when hosted on Vercel
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            // you could pass a user id from auth, or a value from clientPayload
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Called by Vercel API on client upload completion
        // Use tools like ngrok if you want this to work locally

        console.log('blob upload completed', blob, tokenPayload);

        try {
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          throw new Error('Could not update user');
        }
      },
    });

    return Response.json(jsonResponse);
  } catch (error) {
    return Response.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
```

--------------------------------

### Setup DevCycle in Next.js Pages Router with TypeScript

Source: https://vercel.com/docs/edge-config/edge-config-integrations/devcycle-edge-config

Initialize DevCycle integration in a Next.js application using the Pages Router with TypeScript. Imports GetServerSideProps type and creates an Edge Config client with EdgeConfigSource for server-side DevCycle setup.

```typescript
import type { GetServerSideProps } from 'next';
import { createClient } from '@vercel/edge-config';
import { EdgeConfigSource } from '@devcycle/vercel-edge-config';
import { getServerSideDevCycle } from '@devcycle/nextjs-sdk/pages';

const edgeClient = createClient(process.env.EDGE_CONFIG ?? '');
const edgeConfigSource = new EdgeConfigSource(edgeClient);
```

--------------------------------

### Install DevCycle Vercel Edge Config Package

Source: https://vercel.com/docs/edge-config/edge-config-integrations/devcycle-edge-config

Install the DevCycle Vercel Edge Config integration package along with the Vercel Edge Config SDK using pnpm, yarn, npm, or bun. This enables DevCycle feature flag management through Vercel Edge Config.

```bash
pnpm i @devcycle/vercel-edge-config @vercel/edge-config
```

```bash
yarn i @devcycle/vercel-edge-config @vercel/edge-config
```

```bash
npm i @devcycle/vercel-edge-config @vercel/edge-config
```

```bash
bun i @devcycle/vercel-edge-config @vercel/edge-config
```

--------------------------------

### Install AWS S3 and Vercel Functions packages

Source: https://vercel.com/docs/oidc/aws

Install required dependencies for AWS S3 integration with Vercel Functions. Supports multiple package managers including pnpm, yarn, npm, and bun.

```pnpm
pnpm i @aws-sdk/client-s3 @vercel/functions
```

```yarn
yarn i @aws-sdk/client-s3 @vercel/functions
```

```npm
npm i @aws-sdk/client-s3 @vercel/functions
```

```bun
bun i @aws-sdk/client-s3 @vercel/functions
```

--------------------------------

### Create a New Sandbox Instance (TypeScript)

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

This method launches a new microVM sandbox with specified runtime, source, and resource configurations. It supports various source types like Git repositories, tarballs, or snapshots, and allows overriding CPU counts and defining exposed ports. The method returns a promise that resolves to a `Sandbox` object.

```typescript
const sandbox = await Sandbox.create({ runtime: 'node24' });
```

--------------------------------

### Install Astro Vercel Adapter with astro add

Source: https://vercel.com/docs/frameworks/astro

Install the @astrojs/vercel adapter using the astro add command, which automatically configures the adapter with default settings. Supports pnpm, npm, and bun package managers.

```bash
pnpm astro add vercel
```

```bash
npx astro add @astrojs/vercel
```

```bash
bun add @astrojs/vercel
```

--------------------------------

### Submit Interim Billing Data to Vercel API (cURL)

Source: https://vercel.com/docs/integrations/create-integration/billing

This cURL example demonstrates how to send interim billing data, including billing items and usage metrics, to the Vercel API. This data is for display purposes only, helping Vercel users understand their expected charges throughout the billing period. It requires an `access_token` for authorization and should be called at least once a day.

```bash
curl -X POST "https://api.vercel.com/v1/installations/{integrationConfigurationId}/billing" \
  -H "Authorization: Bearer {access_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "timestamp": "2025-01-15T12:00:00Z",
    "eod": "2025-01-15T00:00:00Z",
    "period": {
      "start": "2025-01-01T00:00:00Z",
      "end": "2025-02-01T00:00:00Z"
    },
    "billing": {
      "items": [
        {
          "billingPlanId": "plan_pro",
          "resourceId": "db_abc123",
          "name": "Pro Plan",
          "price": "29.00",
          "quantity": 1,
          "units": "month",
          "total": "29.00"
        }
      ]
    },
    "usage": [
      {
        "resourceId": "db_abc123",
        "name": "Storage",
        "type": "total",
        "units": "GB",
        "dayValue": 5.2,
        "periodValue": 5.2
      }
    ]
  }'
```

--------------------------------

### Successful Installation Update Response (200 OK) - JSON

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/update-installation

This JSON object represents a successful response for an installation update, detailing the new billing plan and any associated notifications. It includes comprehensive fields for billing plan configuration and user-facing messages.

```json
{
  "billingPlan": {
    "id": "string",
    "type": "string",
    "name": "string",
    "scope": "string",
    "description": "string",
    "paymentMethodRequired": "boolean",
    "preauthorizationAmount": "number",
    "initialCharge": "string",
    "minimumAmount": "string",
    "maximumAmount": "string",
    "maximumAmountAutoPurchasePerPeriod": "string",
    "cost": "string",
    "details": [
      "label": "string",
      "value": "string"
    ],
    "highlightedDetails": [
      "label": "string",
      "value": "string"
    ],
    "quote": [
      "line": "string",
      "amount": "string"
    ],
    "effectiveDate": "string",
    "disabled": "boolean"
  },
  "notification": {
    "level": "string",
    "title": "string",
    "message": "string",
    "href": "string"
  }
}
```

--------------------------------

### Constructing a Vercel Deploy Button URL with Redirect Parameter (Bash)

Source: https://vercel.com/docs/deploy-button/callback

This example demonstrates how to create a Vercel Deploy Button URL that includes a `redirect-url` parameter. After a successful deployment, Vercel will redirect the user to the specified URL, `https://my-headless-application.com`, instead of the newly created Vercel project dashboard. This is useful for integrating Vercel deployments into an external application workflow.

```bash
https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fhello-world&redirect-url=https%3A%2F%2Fmy-headless-application.com
```

--------------------------------

### Install Clawd Bot - npm Package Manager

Source: https://vercel.com/docs/ai-gateway/chat-platforms/clawd-bot

Install Clawd Bot globally using npm package manager. Requires Node.js 22 or later. Alternative installation method using pnpm is also available.

```bash
npm install -g clawdbot@latest
```

```bash
pnpm add -g clawdbot@latest
```

--------------------------------

### Manage Vercel Bulk Redirects via REST API using cURL

Source: https://vercel.com/docs/redirects/bulk-redirects/getting-started

This `curl` command demonstrates how to programmatically create or update bulk redirects on Vercel. It sends a `PUT` request to the `/v1/bulk-redirects` endpoint, requiring a Vercel API token for authorization and a JSON payload specifying the team ID, project ID, and an array of redirect objects with source, destination, and permanence.

```bash
curl -X PUT "https://api.vercel.com/v1/bulk-redirects" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "teamId": "team_123",
    "projectId": "project_123",
    "redirects": [
      {
        "source": "/old-path",
        "destination": "/new-path",
        "permanent": true
      }
    ]
  }'
```

--------------------------------

### Example `put()` response without random suffix

Source: https://vercel.com/docs/storage/vercel-blob/using-blob-sdk

Presents a concrete example of the JSON response when a blob is uploaded using `put()` without `addRandomSuffix: true` (default behavior). It highlights that the `pathname` and `filename` remain as provided, without an appended random string.

```json
{
  "pathname": "profilesv1/user-12345.txt",
  "contentType": "text/plain",
  "contentDisposition": "attachment; filename=\"user-12345.txt\"",
  "url": "https://ce0rcu23vrrdzqap.public.blob.vercel-storage.com/profilesv1/user-12345.txt",
  "downloadUrl": "https://ce0rcu23vrrdzqap.public.blob.vercel-storage.com/profilesv1/user-12345.txt?download=1"
}
```

--------------------------------

### Create a TypeScript API Endpoint with Bun on Vercel

Source: https://vercel.com/docs/functions/runtimes/bun

This example demonstrates how to create a basic TypeScript API endpoint (`api/hello.ts`) for a Vercel Function, leveraging Bun's built-in TypeScript support. It shows a simple `fetch` handler that processes a request, extracts a name parameter, and returns a JSON response. No additional configuration is required for TypeScript files in the `/api` directory.

```typescript
export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const name = url.searchParams.get('name') || 'World';

    return Response.json({ message: `Hello ${name}!` });
  },
};
```

--------------------------------

### Configure Conditional Rewrite with 'has' for Vercel

Source: https://vercel.com/docs/project-configuration/vercel-ts

This snippet demonstrates how to define a conditional rewrite in `vercel.ts` using the `has` property. It shows an example where a path `'/start'` is rewritten to `'/end'` only if the `X-Custom-Header` header's value starts with 'valid' and ends with 'value'. Note that `has` conditions might not work locally with `vercel dev` but are functional upon deployment.

```typescript
import { routes, type VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  rewrites: [
    routes.rewrite('/start', '/end', {
      has: [
        {
          type: 'header',
          key: 'X-Custom-Header',
          value: { pre: 'valid', suf: 'value' },
        },
      ],
    }),
  ],
};
```

--------------------------------

### Run Vercel Microfrontends Local Proxy

Source: https://vercel.com/docs/microfrontends/local-development

This command, typically used within a `package.json` script, starts the Vercel microfrontends local proxy. It routes requests for specified local applications (e.g., 'web' and 'docs') to their local development servers, while other application requests are routed to their configured fallback URLs. The `microfrontends.json` file defines the microfrontend configuration.

```shell
microfrontends proxy microfrontends.json --local-apps web docs
```

--------------------------------

### Configure AI SDK Model with Default AI Gateway Provider in TypeScript

Source: https://vercel.com/docs/ai-gateway/models-and-providers

This example shows how to use the default `gateway()` provider instance from `@ai-sdk/gateway` to specify a model for `generateText` calls. This allows leveraging AI Gateway for model selection and management.

```typescript
import { generateText } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { NextRequest } from 'next/server';

export async function GET() {
  const result = await generateText({
    model: gateway('anthropic/claude-opus-4.5'),
    prompt: 'Tell me the history of the San Francisco Mission-style burrito.',
  });
  return Response.json(result);
}
```

--------------------------------

### Add Local Development Proxy Script to package.json

Source: https://vercel.com/docs/microfrontends/quickstart

This `package.json` snippet defines a `proxy` script to run the `@vercel/microfrontends` local development proxy. This proxy allows developers to run a single microfrontend locally while ensuring all microfrontend requests are correctly routed. The `--local-apps` flag specifies the name of the local application to proxy.

```json
"scripts": {
  "proxy": "microfrontends proxy --local-apps my-local-app-name"
}
```

--------------------------------

### Install Vercel Speed Insights package via npm

Source: https://vercel.com/docs/speed-insights/managing-usage

This command installs the `@vercel/speed-insights` package using npm. It is a prerequisite for configuring Speed Insights usage and cost reduction options on Vercel.

```bash
npm i @vercel/speed-insights
```

--------------------------------

### Install LangFuse and OpenAI dependencies

Source: https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/langfuse

This set of commands installs the necessary packages for LangFuse integration, the OpenAI client, environment variable loading (`dotenv`), and TypeScript type definitions (`@types/node`). It provides options for `pnpm`, `yarn`, `npm`, and `bun` package managers to suit different development environments.

```bash
pnpm i langfuse openai dotenv @types/node
```

```bash
yarn i langfuse openai dotenv @types/node
```

```bash
npm i langfuse openai dotenv @types/node
```

```bash
bun i langfuse openai dotenv @types/node
```

--------------------------------

### Install @vercel/config Package

Source: https://vercel.com/docs/project-configuration/vercel-ts

To access types and helper functions for `vercel.ts` configuration, install the `@vercel/config` NPM package. This snippet provides installation commands for various package managers: pnpm, yarn, npm, and bun.

```bash
pnpm i @vercel/config
```

```bash
yarn i @vercel/config
```

```bash
npm i @vercel/config
```

```bash
bun i @vercel/config
```

--------------------------------

### Configure Microfrontend Routing for Vite in microfrontends.json

Source: https://vercel.com/docs/microfrontends/quickstart

This JSON snippet demonstrates how to configure routing for a microfrontend application named "docs" within the `microfrontends.json` file when using Vite. It specifies that all requests matching `/my-base-path/:path*` should be routed to the "docs" microfrontend. This setup requires `@vercel/microfrontends` version `1.0.1` or higher.

```json
"applications": {
  "docs": {
    "routing": [
      {
        "paths": ["/my-base-path/:path*"]
      }
    ]
  }
}
```

--------------------------------

### PATCH /v1/installations/{installationId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

Partially update an existing installation by its ID.

```APIDOC
## PATCH /v1/installations/{installationId}

### Description
Update Installation

### Method
PATCH

### Endpoint
/v1/installations/{installationId}

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
```

--------------------------------

### Configure Asset Routing for Other Frameworks in microfrontends.json

Source: https://vercel.com/docs/microfrontends/quickstart

This `microfrontends.json` configuration shows how to route static assets for a "docs" microfrontend when using frameworks not explicitly listed. It defines a unique path prefix, `/docs-assets/:path*`, ensuring that all assets under this path are routed to the correct microfrontend. This requires manually moving JS and CSS assets to the specified directory.

```json
"applications": {
  "docs": {
    "routing": [
      {
        "paths": ["/docs-assets/:path*"]
      }
    ]
  }
}
```

--------------------------------

### Manually Install Astro Vercel Adapter Package

Source: https://vercel.com/docs/frameworks/astro

Manually install the @astrojs/vercel package without automatic configuration. Use this approach when you want to customize the initial adapter settings instead of using opinionated defaults.

```bash
pnpm i @astrojs/vercel
```

```bash
yarn add @astrojs/vercel
```

```bash
bun add @astrojs/vercel
```

--------------------------------

### Configure OpenAI Client for Chat Completions in Python

Source: https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-compat

Set up the OpenAI client library in Python to connect to the Vercel AI Gateway. This example retrieves the API key from environment variables and configures the base URL to the AI Gateway's endpoint. It then performs a simple chat completion request.

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv('AI_GATEWAY_API_KEY'),
    base_url='https://ai-gateway.vercel.sh/v1'
)

response = client.chat.completions.create(
    model='anthropic/claude-sonnet-4.5',
    messages=[
        {'role': 'user', 'content': 'Hello, world!'}
    ]
)
```

--------------------------------

### Delete Request Headers by Prefix using Vercel Transforms (JSON)

Source: https://vercel.com/docs/project-configuration/vercel-json

This example demonstrates how to delete incoming request headers that match a specific prefix for the `/home` route. It uses a `request.headers` transform with `op: "delete"` and leverages the `key` object's `pre` property to match headers starting with `x-react-router-`.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "routes": [
    {
      "src": "/home",
      "transforms": [
        {
          "type": "request.headers",
          "op": "delete",
          "target": {
            "key": {
              "pre": "x-react-router-"
            }
          }
        }
      ]
    }
  ]
}
```

--------------------------------

### Configure Vercel Project Comment Subscriptions in Slack (UI)

Source: https://vercel.com/docs/comments/integrations

Initiate the subscription process for Vercel project comments within a Slack channel. This command opens an interactive modal allowing configuration of branches (using regex) and pages (using glob patterns) for notifications.

```bash
/vercel subscribe
```

--------------------------------

### Example Vercel Deployment API Response (JSON)

Source: https://vercel.com/docs/rest-api/reference/endpoints/deployments/get-a-deployment-by-id-or-url

This JSON object represents a sample response from the Vercel API's `getDeployment` endpoint. It includes comprehensive details about a deployment, such as build information, environment variables, project settings, creator details, status, ID, creation timestamp, URL, and various other metadata like routes, integrations, and image configurations.

```JSON
{
  "build": {
    "env": [
      "<string>"
    ]
  },
  "env": [
    "<string>"
  ],
  "inspectorUrl": "<string>",
  "isInConcurrentBuildsQueue": false,
  "isInSystemBuildsQueue": false,
  "projectSettings": {
    "nodeVersion": "24.x",
    "buildCommand": "<string>",
    "devCommand": "<string>",
    "framework": "blitzjs",
    "commandForIgnoringBuildStep": "<string>",
    "installCommand": "<string>",
    "outputDirectory": "<string>",
    "speedInsights": {
      "id": "<string>",
      "enabledAt": 123,
      "disabledAt": 123,
      "canceledAt": 123,
      "hasData": false,
      "paidAt": 123
    },
    "webAnalytics": {
      "id": "<string>",
      "disabledAt": 123,
      "canceledAt": 123,
      "enabledAt": 123,
      "hasData": true
    }
  },
  "aliasAssigned": true,
  "bootedAt": 123,
  "buildingAt": 123,
  "buildSkipped": false,
  "creator": {
    "uid": "96SnxkFiMyVKsK3pnoHfx3Hz",
    "username": "john-doe",
    "avatar": "<string>"
  },
  "public": false,
  "status": "QUEUED",
  "id": "dpl_89qyp1cskzkLrVicDaZoDbjyHuDJ",
  "createdAt": 1540257589405,
  "readyState": "READY",
  "name": "my-project",
  "type": "LAMBDAS",
  "meta": {},
  "regions": [
    "sfo1"
  ],
  "url": "my-instant-deployment-3ij3cxz9qr.now.sh",
  "version": 2,
  "projectId": "<string>",
  "plan": "pro",
  "createdIn": "<string>",
  "ownerId": "<string>",
  "routes": [
    {
      "src": "<string>",
      "dest": "<string>",
      "headers": {},
      "methods": [
        "<string>"
      ],
      "continue": false,
      "override": false,
      "caseSensitive": false,
      "check": false,
      "important": false,
      "status": 123,
      "has": [
        {
          "type": "host",
          "value": "<string>"
        }
      ],
      "missing": [
        {
          "type": "host",
          "value": "<string>"
        }
      ],
      "mitigate": {
        "action": "challenge"
      },
      "transforms": [
        {
          "type": "request.headers",
          "op": "append",
          "target": {
            "key": "<string>"
          },
          "args": "<string>",
          "env": [
            "<string>"
          ]
        }
      ],
      "env": [
        "<string>"
      ],
      "locale": {
        "redirect": {},
        "cookie": "<string>"
      },
      "middlewarePath": "<string>",
      "middlewareRawSrc": [
        "<string>"
      ],
      "middleware": 123,
      "respectOriginCacheControl": false
    }
  ],
  "aliasAssignedAt": 123,
  "alwaysRefuseToBuild": false,
  "buildArtifactUrls": [
    "<string>"
  ],
  "builds": [
    {
      "use": "<string>",
      "src": "<string>",
      "config": {}
    }
  ],
  "readyStateReason": "<string>",
  "integrations": {
    "status": "skipped",
    "startedAt": 123,
    "completedAt": 123,
    "skippedAt": 123,
    "skippedBy": "<string>"
  },
  "images": {
    "sizes": [
      123
    ],
    "qualities": [
      123
    ],
    "domains": [
      "<string>"
    ],
    "remotePatterns": [
      {
        "hostname": "<string>",
        "protocol": "http",
        "port": "<string>",
        "pathname": "<string>",
        "search": "<string>"
      }
    ],
    "localPatterns": [
      {
        "pathname": "<string>",
        "search": "<string>"
      }
    ],
    "minimumCacheTTL": 123,
    "formats": [
      "image/avif"
    ],
    "dangerouslyAllowSVG": false,
    "contentSecurityPolicy": "<string>",
    "contentDispositionType": "inline"
  },
  "alias": [],
  "buildContainerFinishedAt": 123,
  "initReadyAt": 123,
  "isFirstBranchDeployment": false,
  "lambdas": [
    {
      "id": "<string>",
      "output": [
        {
          "path": "<string>",
          "functionName": "<string>"
        }
      ],
      "createdAt": 123,
      "readyState": "BUILDING",
      "entrypoint": "<string>",
      "readyStateAt": 123
    }
  ],
  "ready": 123,
  "team": {
    "id": "<string>",
    "name": "<string>",
    "slug": "<string>",
    "avatar": "<string>"
  },
  "userAliases": [
    "sub1.example.com",
    "sub2.example.com"
  ],
  "previewCommentsEnabled": false,
  "ttyBuildLogs": false,
  "customEnvironment": {
    "id": "<string>",
    "slug": "<string>",
    "type": "production",
    "createdAt": 123
  }
}
```

--------------------------------

### CommandFinished - startedAt Accessor

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

Returns the Unix timestamp in milliseconds when the command started executing. Subtract from current time to measure execution duration or schedule follow-up tasks.

```APIDOC
## CommandFinished.startedAt

### Description
The Unix timestamp (in milliseconds) when command execution began.

### Accessor Type
Number (read-only)

### Details
Use to calculate execution duration or correlate with other timestamps.

### Request Example
```ts
const duration = Date.now() - result.startedAt;
console.log(`Command took ${duration}ms`);
```

### Response
#### Accessor Value
- **startedAt** (number) - Unix timestamp in milliseconds when command started.

### Notes
- Returns: `number`
```

--------------------------------

### GET /billing/plans

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/list-billing-plans-for-product

Retrieves a list of available billing plans for the integration. Returns plan details including pricing structure, payment requirements, and plan-specific configuration. Supports subscription, prepayment, and fixed-cost plan types.

```APIDOC
## GET /billing/plans

### Description
Retrieve a list of billing plans available for the integration. Returns comprehensive plan information including pricing, payment method requirements, and plan-specific details.

### Method
GET

### Endpoint
/billing/plans

### Response
#### Success Response (200)
- **plans** (array) - Required - List of billing plans
  - **id** (string) - Required - Partner-provided billing plan identifier. Example: "pro200"
  - **type** (string) - Required - Plan type (subscription, prepayment, or fixed-cost)
  - **name** (string) - Required - Name of the plan. Example: "Hobby"
  - **scope** (string) - Optional - Plan scope. Installation-level billing plans require Installation-level Billing Plans to be enabled
  - **description** (string) - Required - Plan description. Example: "Use all you want up to 20G"
  - **paymentMethodRequired** (boolean) - Optional - Only for subscription plans. Set to false if plan is completely free
  - **preauthorizationAmount** (number) - Optional - For subscription plans with paymentMethodRequired=true. Test amount for payment method validation. Example: 10.53 for $10.53 USD
  - **initialCharge** (string) - Optional - For subscription plans with paymentMethodRequired=true. Amount invoiced at sign-up. Example: "20.00" for $20.00 USD
  - **minimumAmount** (string) - Optional - For prepayment plans. Minimum purchase amount in USD. Example: "4.39"
  - **maximumAmount** (string) - Optional - For prepayment plans. Maximum purchase amount in USD. Example: "86.82"
  - **maximumAmountAutoPurchasePerPeriod** (string) - Optional - For prepayment plans. Maximum auto-purchase amount per month in USD. Example: "86.82"
  - **cost** (string) - Optional - Plan cost for fixed-cost plans. Example: "$20.00/month"
  - **details** (array) - Optional - Plan details with label and value pairs
  - **highlightedDetails** (array) - Optional - Highlighted plan details with label and value pairs
  - **quote** (array) - Optional - Quote information with line items and amounts
  - **effectiveDate** (string) - Optional - Date/time when plan becomes effective
  - **disabled** (boolean) - Optional - If true, plan cannot be selected

#### Response Example
```json
{
  "plans": [
    {
      "id": "pro200",
      "type": "subscription",
      "name": "Hobby",
      "scope": "account",
      "description": "Use all you want up to 20G",
      "paymentMethodRequired": true,
      "preauthorizationAmount": 10.53,
      "initialCharge": "20.00",
      "cost": "$20.00/month",
      "details": [
        {
          "label": "Storage",
          "value": "20GB"
        }
      ],
      "highlightedDetails": [
        {
          "label": "Users",
          "value": "Unlimited"
        }
      ],
      "quote": [
        {
          "line": "Monthly subscription",
          "amount": "20.00"
        }
      ],
      "effectiveDate": "2024-01-01T00:00:00Z",
      "disabled": false
    }
  ]
}
```

#### Error Response (400)
- **error** (object) - Required - Error details
  - **code** (string) - Required - Error code
  - **message** (string) - Required - System error message
  - **user** (object) - Optional - User-facing error information
    - **message** (string) - Optional - User-facing error message
    - **url** (string) - Optional - URL to help article or dashboard page
  - **fields** (array) - Optional - Field-level validation errors
    - **key** (string) - Required - Field key
    - **message** (string) - Optional - Field error message

#### Error Response (403)
- **error** (object) - Required - Error details
  - **code** (string) - Required - Error code
  - **message** (string) - Required - System error message
  - **user** (object) - Optional - User-facing error information
    - **message** (string) - Optional - User-facing error message
    - **url** (string) - Optional - URL to help article or dashboard page

#### Error Response (409)
- **error** (object) - Required - Error details
  - **code** (string) - Required - Error code
  - **message** (string) - Required - System error message
  - **user** (object) - Optional - User-facing error information
    - **message** (string) - Optional - User-facing error message
    - **url** (string) - Optional - URL to help article or dashboard page

### Error Codes
- **400** - Input has failed validation
- **403** - Operation failed because authentication is not allowed to perform this operation
- **409** - Operation failed because of a conflict with the current state of the resource
```

--------------------------------

### Sandbox.list()

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

Enumerate sandboxes for a project with optional filtering by time range or page size. Use pagination cursors to resume after restarts without missing entries.

```APIDOC
## Sandbox.list()

### Description
Enumerate sandboxes for a project, optionally filtering by time range or page size. Combine `since` and `until` with the pagination cursor and cache the last `pagination.next` value to resume after restarts.

### Method
GET

### Returns
`Promise<Parsed<{ sandboxes: SandboxSummary[]; pagination: Pagination; }>>`

### Parameters
#### Query Parameters
- **projectId** (string) - Optional - Project whose sandboxes you want to list.
- **limit** (number) - Optional - Maximum number of sandboxes to return.
- **since** (number | Date) - Optional - List sandboxes created after this time.
- **until** (number | Date) - Optional - List sandboxes created before this time.
- **signal** (AbortSignal) - Optional - Cancel the request if necessary.

### Request Example
```ts
const { json: { sandboxes, pagination } } = await Sandbox.list();
```

### Response
#### Success Response (200)
- **sandboxes** (SandboxSummary[]) - Array of sandbox summaries matching the query criteria.
- **pagination** (Pagination) - Pagination information including cursor for next page.
```

--------------------------------

### Run xmcp application locally using project's dev scripts

Source: https://vercel.com/docs/frameworks/backend/xmcp

These commands execute the local development script defined in the project's `package.json` file. They provide an alternative way to start the xmcp application locally, leveraging standard Node.js package manager commands.

```bash
npm run dev
```

```bash
yarn dev
```

```bash
pnpm run dev
```

--------------------------------

### Example Domain Transfer-In Canceled Status Response (JSON)

Source: https://vercel.com/docs/rest-api/reference/endpoints/domains-registrar/get-a-domains-transfer-status

This JSON snippet illustrates a possible response structure for the `getDomainTransferIn` API call when a domain transfer has been canceled. It shows a simple object containing a 'status' field with the value 'canceled', indicating the current state of the domain transfer process.

```json
{
  "status": "canceled"
}
```

--------------------------------

### List all available packages in build image with dnf

Source: https://vercel.com/docs/builds/build-image

Display all packages available in the build image repositories using dnf, the default package manager for Amazon Linux 2023. This helps identify which packages can be installed during the build process.

```bash
dnf list
```

--------------------------------

### Examples of `vercel integration-resource disconnect` command usage

Source: https://vercel.com/docs/cli/integration-resource

These examples illustrate how to disconnect an integration resource from various contexts using the `vercel integration-resource disconnect` command. They show disconnecting from a linked project, a specific project, all projects using `--all`, and bypassing confirmation prompts with `--yes`.

```bash
# Disconnect from linked project
vercel integration-resource disconnect my-database

# Using alias
vercel ir disconnect my-redis-cache

# Disconnect from a specific project
vercel ir disconnect my-database my-project

# Disconnect all projects from the resource
vercel ir disconnect my-database --all

# Disconnect all without confirmation
vercel ir disconnect my-database -a -y
```

--------------------------------

### Configure Blackbox AI CLI with Vercel AI Gateway

Source: https://vercel.com/docs/ai-gateway/coding-agents/blackbox

This command initiates the configuration process for the Blackbox AI CLI. It guides the user through selecting 'Vercel AI Gateway' as the model provider and entering their AI Gateway API key, integrating Blackbox AI with Vercel's AI Gateway for unified model access and spend monitoring.

```bash
blackbox configure
```

--------------------------------

### Install jose package for OIDC token verification

Source: https://vercel.com/docs/oidc/api

Install the jose package using various package managers (pnpm, yarn, npm, bun). This package provides utilities for working with JSON Web Tokens and cryptographic operations required for OIDC token validation.

```bash
pnpm i jose
```

```bash
yarn i jose
```

```bash
npm i jose
```

```bash
bun i jose
```

--------------------------------

### POST /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}/actions

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel

Performs actions on a specific invoice for an installation in the Vercel Marketplace.

```APIDOC
## POST /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}/actions

### Description
Performs actions on a specific invoice for an installation in the Vercel Marketplace.

### Method
POST

### Endpoint
/v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}/actions

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required - The ID of the integration configuration.
- **invoiceId** (string) - Required - The ID of the invoice.

#### Query Parameters
None

#### Request Body
None

### Request Example
{}

### Response
#### Success Response (200)
None

#### Response Example
{}
```

--------------------------------

### PATCH /v1/installations/{installationId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/update-installation

Update an installation in the Vercel Marketplace. This endpoint allows partners to modify installation details such as the billing plan. Authentication is performed using OpenID Connect Protocol (OIDC) with JWT tokens signed by Vercel.

```APIDOC
## PATCH /v1/installations/{installationId}

### Description
Update an installation in the Vercel Marketplace. This endpoint allows partners to modify installation configuration and billing plan details.

### Method
PATCH

### Endpoint
`/v1/installations/{installationId}`

### Authentication
**User Authentication**: OpenID Connect Protocol (OIDC)
- JWT token signed with Vercel's private key
- Verifiable using Vercel's public JSON Web Key Sets (JWKS)
- Available at: `https://marketplace.vercel.com/.well-known/jwks`

### Parameters

#### Path Parameters
- **installationId** (string) - Required - The unique identifier of the installation to update

#### Header Parameters
- **X-Vercel-Auth** (string) - Optional - The auth style used in the request (e.g., system, user)
- **Idempotency-Key** (string) - Optional - A unique key to identify a request across multiple retries

#### Request Body
- **billingPlanId** (string) - Optional - Partner-provided billing plan identifier. Example: "pro200"

### Request Example
```json
{
  "billingPlanId": "pro200"
}
```

### Response
#### Success Response (200)
The installation has been successfully updated.

### OIDC Token Claims
The JWT token includes the following claims:
- **iss** (string) - Issuer: "https://marketplace.vercel.com"
- **aud** (string) - Audience: The integration ID (e.g., "oac_9f4YG9JFjgKkRlxoaaGG0y05")
- **type** (string) - Token type: "access_token" or "id_token"
- **account_id** (string) - The account identifier
- **sub** (string) - Subject: The user making the change (format: `/^account:[0-9a-fA-F]+:user:[0-9a-fA-F]+$/`)
- **installation_id** (string) - The installation ID (e.g., "icfg_9bceb8ccT32d3U417ezb5c8p")
- **user_id** (string) - The user identifier
- **user_role** (string) - User role: "ADMIN" or "USER"
- **user_email** (string) - Optional: User's verified email address (requires opt-in)
- **user_name** (string) - Optional: User's real name
- **user_avatar_url** (string) - Optional: User's public avatar URL

### Content-Type
`application/json`
```

--------------------------------

### Link Vercel Project with Default Answers (Yes Option)

Source: https://vercel.com/docs/cli/link

Employ the `--yes` option to automatically answer setup questions with default values, streamlining the linking process. It uses the current directory for the project name and location, making it suitable for non-interactive scripts.

```bash
vercel link --yes
```

--------------------------------

### Install LlamaIndex and Vercel AI Gateway Dependencies (Bash)

Source: https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/llamaindex

This command installs the necessary Python packages for LlamaIndex, including the Vercel AI Gateway integration and `python-dotenv` for environment variable management.

```bash
pip install llama-index-llms-vercel-ai-gateway llama-index python-dotenv
```

--------------------------------

### Vercel API Versioned Endpoint URL Example

Source: https://vercel.com/docs/rest-api/reference/welcome

This example demonstrates the structure of a versioned Vercel API endpoint URL. The version number, such as `v6`, is included directly after the base API URL and before the specific endpoint path, like `/deployments`.

```url
https://api.vercel.com/v6/deployments
```

--------------------------------

### Example JSON Response for Vercel Get Check API

Source: https://vercel.com/docs/rest-api/reference/endpoints/checks/get-a-single-check

This JSON object represents a successful (HTTP 200) response from the Vercel API when requesting check details. It provides comprehensive information about a deployment check, including its unique identifier, name, current status, blocking status, associated integration and deployment IDs, creation and update timestamps, and detailed performance metrics within the `output` field.

```json
{
  "id": "<string>",
  "name": "<string>",
  "status": "registered",
  "blocking": false,
  "integrationId": "<string>",
  "deploymentId": "<string>",
  "createdAt": 123,
  "updatedAt": 123,
  "path": "<string>",
  "conclusion": "canceled",
  "output": {
    "metrics": {
      "FCP": {
        "value": 123,
        "source": "web-vitals",
        "previousValue": 123
      },
      "LCP": {
        "value": 123,
        "source": "web-vitals",
        "previousValue": 123
      },
      "CLS": {
        "value": 123,
        "source": "web-vitals",
        "previousValue": 123
      },
      "TBT": {
        "value": 123,
        "source": "web-vitals",
        "previousValue": 123
      },
      "virtualExperienceScore": {
        "value": 123,
        "source": "web-vitals",
        "previousValue": 123
      }
    }
  },
  "detailsUrl": "<string>",
  "externalId": "<string>",
  "startedAt": 123,
  "completedAt": 123,
  "rerequestable": false
}
```

--------------------------------

### Install and Configure Claude Code Wrapper Script

Source: https://vercel.com/docs/ai-gateway/sdks-and-apis/anthropic-compat

These commands prepare and activate the Claude Code wrapper script. They create a `~/bin` directory, make the script executable, add the `~/bin` directory to the system's PATH, and then reload the shell configuration. This allows the `claude-vercel` command to be executed directly from any terminal session.

```bash
mkdir -p ~/bin
chmod +x ~/bin/claude-vercel
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

--------------------------------

### Implement Split.io Feature Flagging in Vercel Edge Function

Source: https://vercel.com/docs/edge-config/edge-config-integrations/split-edge-config

These examples demonstrate how to set up a Vercel Edge Function to use Split.io for feature flagging. They initialize the Split SDK with Edge Config as storage, retrieve a user-specific treatment for a feature flag, and return a different marketing page based on the treatment. Both TypeScript and JavaScript versions handle environment variables for API keys and gracefully manage SDK initialization timeouts, providing a robust solution for conditional content delivery.

```typescript
import {
  SplitFactory,
  PluggableStorage,
  ErrorLogger,
} from '@splitsoftware/splitio-browserjs';
import { EdgeConfigWrapper } from '@splitsoftware/vercel-integration-utils';
import { RequestContext } from '@vercel/edge';
import { createClient } from '@vercel/edge-config';

export default async function handler(
  request: Request,
  context: RequestContext,
) {
  const { EDGE_CONFIG_SPLIT_ITEM_KEY, SPLIT_SDK_CLIENT_API_KEY } = process.env;

  if (!SPLIT_SDK_CLIENT_API_KEY || !EDGE_CONFIG_SPLIT_ITEM_KEY)
    return new Response(
      `Failed to find your SDK Key (${SPLIT_SDK_CLIENT_API_KEY})\n        or item key ${EDGE_CONFIG_SPLIT_ITEM_KEY}`,
    );

  const edgeConfigClient = createClient(process.env.EDGE_CONFIG);
  const { searchParams } = new URL(request.url);
  const userKey = searchParams.get('userKey') || 'anonymous';
  const client = SplitFactory({
    core: {
      authorizationKey: SPLIT_SDK_CLIENT_API_KEY,
      key: userKey,
    },
    mode: 'consumer_partial',
    storage: PluggableStorage({
      wrapper: EdgeConfigWrapper({
        // The Edge Config item key where Split stores
        // feature flag definitions
        edgeConfigItemKey: EDGE_CONFIG_SPLIT_ITEM_KEY,
        // The Edge Config client
        edgeConfig: edgeConfigClient,
      }),
    }),
    // Disable or keep only ERROR log level in production,
    // to minimize performance impact
    debug: ErrorLogger(),
  }).client();

  // Wait until
  await new Promise((resolve) => {
    client.on(client.Event.SDK_READY, () => resolve);
    client.on(client.Event.SDK_READY_TIMED_OUT, () => resolve);
  });

  // Replace this with the feature flag you want
  const FEATURE_FLAG = 'New_Marketing_Page';
  const treatment = await client.getTreatment(FEATURE_FLAG);

  // Must await in app-router; waitUntil() is not
  // yet supported

  context.waitUntil(client.destroy());
  // treatment will be 'control' if the SDK timed out
  if (treatment == 'control') return new Response('Control marketing page');

  return treatment === 'on'
    ? new Response('New marketing page')
    : new Response('Old marketing page');
}
```

```javascript
import {
  SplitFactory,
  PluggableStorage,
  ErrorLogger,
} from '@splitsoftware/splitio-browserjs';
import { EdgeConfigWrapper } from '@splitsoftware/vercel-integration-utils';
import { createClient } from '@vercel/edge-config';

export default async function handler(request, context) {
  const { EDGE_CONFIG_SPLIT_ITEM_KEY, SPLIT_SDK_CLIENT_API_KEY } = process.env;

  if (!SPLIT_SDK_CLIENT_API_KEY || !EDGE_CONFIG_SPLIT_ITEM_KEY)
    return new Response(
      `Failed to find your SDK Key (${SPLIT_SDK_CLIENT_API_KEY})\n        or item key ${EDGE_CONFIG_SPLIT_ITEM_KEY}`,
    );

  const edgeConfigClient = createClient(process.env.EDGE_CONFIG);
  const { searchParams } = new URL(request.url);
  const userKey = searchParams.get('userKey') || 'anonymous';
  const client = SplitFactory({
    core: {
      authorizationKey: SPLIT_SDK_CLIENT_API_KEY,
      key: userKey,
    },
    mode: 'consumer_partial',
    storage: PluggableStorage({
      wrapper: EdgeConfigWrapper({
        // The Edge Config item key where Split stores
        // feature flag definitions
        edgeConfigItemKey: EDGE_CONFIG_SPLIT_ITEM_KEY,
        // The Edge Config client
        edgeConfig: edgeConfigClient,
      }),
    }),
    // Disable or keep only ERROR log level in production,
    // to minimize performance impact
    debug: ErrorLogger(),
  }).client();

  // Wait until
  await new Promise((resolve) => {
    client.on(client.Event.SDK_READY, () => resolve);
    client.on(client.Event.SDK_READY_TIMED_OUT, () => resolve);
  });

  // Replace this with the feature flag you want
  const FEATURE_FLAG = 'New_Marketing_Page';
  const treatment = await client.getTreatment(FEATURE_FLAG);

  // Must await in app-router; waitUntil() is not
  // yet supported

  context.waitUntil(client.destroy());
  // treatment will be 'control' if the SDK timed out
  if (treatment == 'control') return new Response('Control marketing page');

  return treatment === 'on'
    ? new Response('New marketing page')
    : new Response('Old marketing page');
}
```

--------------------------------

### Implement Vercel Blob Upload API Route in Next.js App Router (TypeScript)

Source: https://vercel.com/docs/vercel-blob/client-upload

This snippet demonstrates how to create a POST API route using the Next.js App Router to handle file uploads to Vercel Blob storage. It leverages @vercel/blob/client's handleUpload function, including onBeforeGenerateToken for defining upload policies (e.g., allowed content types, random suffixes) and onUploadCompleted for executing post-upload logic. The route returns a NextResponse with JSON data or an error status.

```typescript
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (
        pathname,
        /* clientPayload */
      ) => {
        // Generate a client token for the browser to upload the file
        // Make sure to authenticate and authorize users before generating the token.
        // Otherwise, you're allowing anonymous uploads.

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp'],
          addRandomSuffix: true,
          // callbackUrl: 'https://example.com/api/avatar/upload',
          // optional, `callbackUrl` is automatically computed when hosted on Vercel
          tokenPayload: JSON.stringify({
            // optional, sent to your server on upload completion
            // you could pass a user id from auth, or a value from clientPayload
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Called by Vercel API on client upload completion
        // Use tools like ngrok if you want this to work locally

        console.log('blob upload completed', blob, tokenPayload);

        try {
          // Run any logic after the file upload completed
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          throw new Error('Could not update user');
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }, // The webhook will retry 5 times waiting for a status 200
    );
  }
}
```

--------------------------------

### DELETE /v1/installations/{installationId}/resources/{resourceId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

Delete a resource belonging to an installation.

```APIDOC
## DELETE /v1/installations/{installationId}/resources/{resourceId}

### Description
Delete Resource

### Method
DELETE

### Endpoint
/v1/installations/{installationId}/resources/{resourceId}

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
- **resourceId** (string) - Required - The ID of the resource.
```

--------------------------------

### Search for packages in build image with dnf

Source: https://vercel.com/docs/builds/build-image

Search for a specific package by name in the available repositories. Replace 'my-package-here' with the desired package name to find matching packages in the build image.

```bash
dnf search my-package-here
```

--------------------------------

### Deploy a Staged Production Build and Promote with Vercel CLI

Source: https://vercel.com/docs/cli/deploying-from-cli

This section explains how to create a production deployment without immediately assigning it to a domain using the `--skip-domain` flag. It then shows how to manually promote a specific staged deployment to production using the `vercel promote` command.

```bash
vercel --prod --skip-domain
```

```bash
vercel promote [deployment-id or url]
```

--------------------------------

### Update Installation with SSO Notification URL

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api

Patches a Vercel installation to include an SSO-enabled notification with a sso: prefixed URL. When users click the notification link, Vercel initiates the SSO flow before redirecting to the provider's dashboard. Requires Bearer token authentication and returns the updated installation object.

```typescript
// When creating or updating an installation, include an sso: URL
const response = await fetch(
  `https://api.vercel.com/v1/installations/${installationId}`,
  {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${vercelToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      notification: {
        title: 'Review your usage',
        message: 'Your monthly usage report is ready',
        href: 'sso:https://your-integration.com/dashboard/usage',
        type: 'info',
      },
    }),
  },
);
```

--------------------------------

### GET /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/edge-config

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-v1-installations-resources-experimentation-edge-config

This endpoint allows partners to fetch the contents of a user-provided Edge Config when Edge Config syncing is enabled.

```APIDOC
## GET /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/edge-config

### Description
When the user enabled Edge Config syncing, then this endpoint can be used by the partner to fetch the contents of the Edge Config.

### Method
GET

### Endpoint
/v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/edge-config

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required -
- **resourceId** (string) - Required -

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
(None)

### Response
#### Success Response (200)
- **items** (object) - Required -
- **updatedAt** (number) - Required -
- **digest** (string) - Required -
- **purpose** (string) - Optional -

#### Response Example
{
  "items": "object",
  "updatedAt": "number",
  "digest": "string",
  "purpose": "string"
}
```

--------------------------------

### Deploy and Manage Custom Environments with Vercel CLI

Source: https://vercel.com/docs/custom-environments

Demonstrates CLI commands for deploying to, pulling variables from, and adding variables to custom environments. Includes deployment targeting, environment variable retrieval, and variable addition operations for named custom environments.

```bash
# Deploy to a custom environment named "staging":
vercel deploy --target=staging

# Pull environment variables from "staging":
vercel pull --environment=staging

# Add environment variables to "staging":
vercel env add MY_KEY staging
```

--------------------------------

### Update Vercel Installation via HTTP PATCH

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/update-installation

This HTTP snippet shows the method and path for updating an existing Vercel integration installation. It requires an `integrationConfigurationId` as a path parameter to identify the specific installation to be updated.

```http
PATCH /v1/installations/{integrationConfigurationId}
```

--------------------------------

### Track Vercel Blob Upload Progress using JavaScript `onUploadProgress`

Source: https://vercel.com/docs/storage/vercel-blob/examples

This JavaScript example illustrates how to monitor the progress of a Vercel Blob upload using the `onUploadProgress` callback. The callback provides real-time updates on `loaded` bytes, `total` bytes, and the `percentage` completed, which is useful for displaying progress indicators in user interfaces.

```javascript
const blob = await upload('big-file.mp4', file, {
  access: 'public',
  handleUploadUrl: '/api/upload',
  onUploadProgress: (progressEvent) => {
    console.log(`Loaded ${progressEvent.loaded} bytes`);
    console.log(`Total ${progressEvent.total} bytes`);
    console.log(`Percentage ${progressEvent.percentage}%`);
  },
});
```

--------------------------------

### GET /api/has-example - Check if a Key Exists

Source: https://vercel.com/docs/edge-config/edge-config-sdk

The has() helper method verifies if a key exists in your Edge Config. It returns true if the key exists and false if it doesn't. This method is useful for conditional logic based on key availability.

```APIDOC
## GET /api/has-example

### Description
Check if a key exists in the Edge Config using the has() helper method. Returns a boolean indicating key existence.

### Method
GET

### Endpoint
/api/has-example

### Parameters
#### Query Parameters
- **key** (string) - Required - The key name to check for existence in Edge Config

### Request Example
```typescript
import { NextResponse } from 'next/server';
import { has } from '@vercel/edge-config';

export async function GET() {
  const exists = await has('key');

  return NextResponse.json({
    keyExists: exists ? `The key exists!` : `The key doesn't exist!`,
  });
}
```

### Response
#### Success Response (200)
- **keyExists** (string) - Message indicating whether the key exists or not

#### Response Example
```json
{
  "keyExists": "The key exists!"
}
```

or

```json
{
  "keyExists": "The key doesn't exist!"
}
```
```

--------------------------------

### Configure Turborepo Build Outputs in turbo.json

Source: https://vercel.com/docs/monorepos/turborepo

Define build output directories in turbo.json to match your Framework Preset expectations. This configuration specifies which directories contain build outputs for Next.js, SvelteKit, Build Output API, and other frameworks. Ensure outputs are aligned with your framework's expected output directory to prevent cache misses on Vercel deployments.

```json
{
  "$schema": "https://turborepo.com/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [
        ".next/**",
        "!.next/cache/**",
        ".svelte-kit/**",
        ".vercel/**",
        ".vercel/output/**",
        ".nuxt/**",
        "dist/**",
        "other-output-directory/**"
      ]
    }
  }
}
```

--------------------------------

### GET /v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/verify

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

Validate a resource transfer request using a provider claim ID.

```APIDOC
## GET /v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/verify

### Description
Validate Resources Transfer Request

### Method
GET

### Endpoint
/v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/verify

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
- **providerClaimId** (string) - Required - The provider claim ID for the transfer request.
```

--------------------------------

### Get Git Repository Slug (Next.js/Blitz.js)

Source: https://vercel.com/docs/environment-variables/framework-environment-variables

Retrieve the slug (name) of the origin repository that triggered the Vercel deployment for Next.js/Blitz.js projects. Available at both build and runtime.

```bash
NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG=my-site
```

--------------------------------

### Configure Git Deployment with Multiple Matching Rules (vercel.json, TypeScript)

Source: https://vercel.com/docs/project-configuration/git-configuration

This example demonstrates how 'git.deploymentEnabled' handles branches matching multiple rules. If a branch matches multiple rules and at least one rule is 'true', a deployment will occur. This configuration prevents deployments for 'experiment-*' branches but enables them for '*-dev' branches.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": {
      "experiment-*": false,
      "*-dev": true
    }
  }
}
```

```typescript
import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  git: {
    deploymentEnabled: {
      'experiment-*': false,
      '*-dev': true,
    },
  },
};
```

--------------------------------

### GET /v6/domains/{domain}/config

Source: https://vercel.com/docs/rest-api/vercel-api-integrations

Retrieve the configuration settings for a specific domain. Returns DNS configuration, nameserver information, and domain settings.

```APIDOC
## GET /v6/domains/{domain}/config

### Description
Retrieve the configuration settings for a specific domain including DNS and nameserver information.

### Method
GET

### Endpoint
/v6/domains/{domain}/config

### Parameters
#### Path Parameters
- **domain** (string) - Required - The domain name to retrieve configuration for

#### Query Parameters
- **teamId** (string) - Required if integration installation is for a Team - Team identifier

### Response
#### Success Response (200)
- **nameservers** (array) - List of nameservers
- **dnsRecords** (array) - DNS configuration records

### Notes
- Ensure `teamId` query parameter is included for Team installations
- Scope: Read access required
```

--------------------------------

### Create a Vercel Team using API (cURL and SDK)

Source: https://vercel.com/docs/accounts/create-an-account

These snippets demonstrate how to programmatically create a new Vercel team. The first example uses a cURL command to interact directly with the Vercel API, requiring an Authorization Bearer token and specifying the team's slug and name. The second example utilizes the Vercel SDK for JavaScript, initializing it with a bearer token and calling the `createTeam` method with the desired team details.

```bash
curl --request POST \
  --url https://api.vercel.com/v1/teams \
  --header "Authorization: Bearer $VERCEL_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
  "slug": "<team-slug>",
  "name": "<team-name>"
}'
```

```javascript
import { Vercel } from '@vercel/sdk';
 
const vercel = new Vercel({
  bearerToken: '<YOUR_BEARER_TOKEN_HERE>',
});
 
async function run() {
  const result = await vercel.teams.createTeam({
    slug: 'team-slug',
    name: 'team-name',
  });
 
  // Handle the result
  console.log(result);
}
 
run();
```

--------------------------------

### Access Vercel Deployment Environment

Source: https://vercel.com/docs/environment-variables/framework-environment-variables

Exposes the current deployment environment (production, preview, or development). Available in Astro and SolidStart frameworks at both build and runtime stages.

```bash
PUBLIC_VERCEL_ENV=production
```

```bash
VITE_VERCEL_ENV=production
```

--------------------------------

### Example Team ID for Vercel Configuration

Source: https://vercel.com/docs/rest-api/reference/endpoints/integrations/retrieve-an-integration-configuration

This example shows a sample team ID (`teamId`) when the Vercel integration configuration was created for a team. This `string` field can be `null` if the configuration is not associated with a team.

```json
"team_nLlpyC6RE1qxydlFKbrxDlud"
```

--------------------------------

### Declare Deployment Actions

Source: https://vercel.com/docs/integrations/create-integration/deployment-integration-action

Set up deployment actions for your native integration product through the Integration Console. This involves creating actions with a slug and name that users can add to their deployments.

```APIDOC
## Declare Deployment Actions

### Description
Declare deployment actions for your native integration product through the Integration Console.

### Steps
1. Open the Integration Console
2. Select your Marketplace integration and click **Manage**
3. Edit an existing product or create a new one
4. Navigate to **Deployment Actions** in the left-side menu
5. Create an action by assigning it a slug and a name

### Next Steps
- Handle webhook events in your integration server
- Perform API actions based on webhook triggers
- Review the [example marketplace integration server](https://github.com/vercel/example-marketplace-integration) for implementation details
```

--------------------------------

### Implement On-Demand Revalidation API Route in Next.js (App Router - JavaScript)

Source: https://vercel.com/docs/incremental-static-regeneration/quickstart

This JavaScript API route for the Next.js App Router enables on-demand revalidation using the `revalidatePath` function. It ensures the request is authorized by validating a secret token found in the request URL's search parameters, then returns a JSON object confirming the revalidation and its timestamp.

```js
import { revalidatePath } from 'next/cache';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== process.env.MY_SECRET_TOKEN) {
    return new Response('Invalid credentials', {
      status: 401,
    });
  }

  revalidatePath('/blog-posts');

  return Response.json({
    revalidated: true,
    now: Date.now(),
  });
}
```

--------------------------------

### Retrieve a Resource using Vercel Marketplace API HTTP GET

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/get-resource

This HTTP snippet illustrates the GET request used to fetch a specific resource from the Vercel Marketplace API. It targets a resource identified by `resourceId` within a given `installationId`, both provided as path parameters.

```http
GET /v1/installations/{installationId}/resources/{resourceId}
```

--------------------------------

### Example Unique Identifier for Vercel Configuration

Source: https://vercel.com/docs/rest-api/reference/endpoints/integrations/retrieve-an-integration-configuration

This example illustrates a typical unique identifier (`id`) for a Vercel integration configuration. This `string` value is required and serves as the primary key for referencing the configuration.

```json
"icfg_3bwCLgxL8qt5kjRLcv2Dit7F"
```

--------------------------------

### GitHub Actions Workflow for Conformance with Vercel Private Registry

Source: https://vercel.com/docs/private-registry

This YAML snippet defines a GitHub Actions workflow named 'Conformance' that runs on pull requests to the `main` branch. It sets up Node.js and pnpm, configures authentication for the Vercel private registry using a `VERCEL_TOKEN` secret, installs project dependencies, and executes the Conformance command. This automates continuous integration checks for projects utilizing Vercel's private registry.

```yaml
name: Conformance

on:
  pull_request:
    branches:
      - main

jobs:
  conformance:
    name: 'Run Conformance'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version-file: '.node-version'

      - name: Set up pnpm
        uses: pnpm/action-setup@v3

      - name: Set up Vercel private registry
        run: npm config set //vercel-private-registry.vercel.sh/:_authToken $VERCEL_TOKEN
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}

      - name: Install dependencies
        run: pnpm install

      - name: Run Conformance
        run: pnpm conformance
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

--------------------------------

### POST /v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/accept

Source: https://vercel.com/docs/integrations/marketplace-flows

Completes the resource transfer by updating resource ownership from the claims generator to the target user, linking resources to the target installation, and invalidating the provider claim ID.

```APIDOC
## POST /v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/accept

### Description
Completes the resource transfer request by transferring ownership of resources from the source team to the target team. This endpoint updates resource ownership, links resources to the target installation, and invalidates the provider claim ID.

### Method
POST

### Endpoint
/v1/installations/{installationId}/resource-transfer-requests/{providerClaimId}/accept

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The unique identifier of the integration installation
- **providerClaimId** (string) - Required - The provider's unique identifier for the pending resource transfer

#### Request Body
- **targetInstallationId** (string) - Required - The installation ID of the target team
- **targetTeamId** (string) - Required - The unique identifier of the target team

### Request Example
```
{
  "targetInstallationId": "icfg_target123",
  "targetTeamId": "team_target456"
}
```

### Response
#### Success Response (200)
- **success** (boolean) - Indicates whether the transfer was completed successfully

#### Response Example
```
{
  "success": true
}
```

### Transfer Completion Actions
Upon successful acceptance, the endpoint:
- Updates resource ownership from the claims generator to the target user
- Links resources to the target installation
- Invalidates the provider claim ID to prevent reuse
```

--------------------------------

### Team Configuration

Source: https://vercel.com/docs/teams-and-accounts

Guide for configuring team settings including finding your Team ID, setting a default team, and managing team information through the Vercel dashboard.

```APIDOC
## Team Configuration

### Finding Your Team ID

#### Description
Locate your unique Team ID, which is an unchangeable identifier automatically assigned when your team is created.

#### Methods to Find Team ID

##### Method 1: Vercel API
- Use the Vercel API to retrieve your Team ID programmatically

##### Method 2: Dashboard URL
- Navigate to: `https://vercel.com/teams/your_team_name_here/settings#team-id`
- Replace `your_team_name_here` with your actual team name

##### Method 3: Dashboard Navigation
1. Open your team's dashboard
2. Navigate to the Settings tab
3. Choose "General" from the left-hand navigation
4. Scroll down to the "Team ID" section
5. Copy your Team ID

---

### Setting a Default Team

#### Description
Your default team is used when making API or CLI requests without specifying a team. It's also displayed on first login and when navigating to `/dashboard`.

#### Default Team Assignment
- The first Hobby or Pro team you create is automatically set as default
- Automatically reassigned if you delete, leave, or are removed from current default team

#### How to Change Default Team
1. Navigate to `vercel.com/account/settings`
2. Under "Default Team", select your new default team from the dropdown
3. Press "Save"

---

### Managing Account Emails

#### Description
Manage email addresses associated with your Vercel account.

#### Steps to Access Email Settings
1. Select your avatar in the top right corner of the dashboard
2. Select "Account Settings" from the list
3. Select the "Settings" tab
4. Scroll down to the "Emails" section

#### Available Actions
- Add new email addresses
- Remove existing email addresses
- Change the primary email address associated with your account
```

--------------------------------

### DELETE /v1/installations/{installationId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/delete-installation

Deletes a marketplace installation. The deletion is postponed for 24 hours by default to allow for final invoice processing. You can request immediate deletion by specifying finalized:true in the request body.

```APIDOC
## DELETE /v1/installations/{installationId}

### Description
Deletes the Installation. The final deletion is postponed for 24 hours to allow for sending of final invoices. You can request immediate deletion by specifying {finalized:true} in the request body.

### Method
DELETE

### Endpoint
/v1/installations/{installationId}

### Authentication
This endpoint supports two authentication methods:

**User Authentication**: Uses OpenID Connect Protocol (OIDC) with JWT tokens signed by Vercel's private key and verifiable using Vercel's public JWKS.

**System Authentication**: Uses OpenID Connect Protocol (OIDC) with JWT tokens for system-level operations.

Both token types are verifiable at: https://marketplace.vercel.com/.well-known/jwks

### Parameters

#### Path Parameters
- **installationId** (string) - Required - The ID of the installation to delete. Example: "icfg_9bceb8ccT32d3U417ezb5c8p"

#### Header Parameters
- **X-Vercel-Auth** (string) - Optional - The auth style used in the request (system, user, etc)
- **Idempotency-Key** (string) - Optional - A unique key to identify a request across multiple retries

#### Request Body
- **finalized** (boolean) - Optional - Set to true to request immediate deletion instead of the default 24-hour postponement

### Request Example
```
DELETE /v1/installations/icfg_9bceb8ccT32d3U417ezb5c8p HTTP/1.1
Host: api.vercel.com
X-Vercel-Auth: user
Idempotency-Key: unique-key-12345
Content-Type: application/json

{
  "finalized": true
}
```

### Response

#### Success Response (200)
The installation has been successfully deleted or marked for deletion.

#### Response Example
```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "deleted",
  "installationId": "icfg_9bceb8ccT32d3U417ezb5c8p",
  "deletionScheduled": "2024-01-15T10:30:00Z"
}
```

### User Authentication Token Claims
- **iss** (string) - Issuer: https://marketplace.vercel.com
- **aud** (string) - Integration ID
- **type** (string) - Token type: access_token or id_token
- **account_id** (string) - Account identifier
- **sub** (string) - Subject: User identifier (matches /^account:[0-9a-fA-F]+:user:[0-9a-fA-F]+$/)
- **installation_id** (string) - Installation ID
- **user_id** (string) - User identifier
- **user_role** (string) - User role: ADMIN or USER
- **user_email** (string) - User's verified email (if opted in)
- **user_name** (string) - User's real name
- **user_avatar_url** (string) - User's public avatar URL

### System Authentication Token Claims
- **iss** (string) - Issuer: https://marketplace.vercel.com
- **sub** (string) - Subject: Account identifier (matches /^account:[0-9a-fA-F]+$/) or null
- **aud** (string) - Integration ID
- **type** (string) - Token type: access_token or id_token
- **installation_id** (string) - Installation ID (nullable)
- **account_id** (string) - Account identifier
```

--------------------------------

### Create directories in sandbox with mkDir()

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

Creates directories in the sandbox filesystem relative to /vercel/sandbox or as absolute paths. Must be called before writeFiles() when nested folder structures are needed. Returns a Promise<void>.

```typescript
await sandbox.mkDir('tmp/assets');
```

--------------------------------

### Override Vercel Build Install Command (TypeScript)

Source: https://vercel.com/docs/project-configuration/vercel-ts

This snippet illustrates how to customize the 'Install Command' for a Vercel deployment using the `installCommand` property. It sets the command to `npm install`, allowing users to specify a different package manager or installation process.

```typescript
import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  installCommand: 'npm install',
};
```

--------------------------------

### Define Provider-Initiated SSO URL Structure for Vercel

Source: https://vercel.com/docs/integrations/marketplace-api

This snippet outlines the required URL format for an integration provider to initiate an SSO process directly from their platform to Vercel. It specifies the inclusion of the integration's unique `URLSlug` and `installationId`, along with optional query parameters to pass additional context.

```text
https://vercel.com/sso/integrations/{URLSlug}/{installationId}?{query} 
```

--------------------------------

### Configure Vercel Git Provider for Vue.js (Bash)

Source: https://vercel.com/docs/environment-variables/framework-environment-variables

This environment variable specifies the Git provider (e.g., GitHub, GitLab, Bitbucket) from which the Vercel deployment was triggered. It is available at both build and runtime, allowing Vue.js applications to dynamically adapt based on the source control system. The example demonstrates setting it to 'github'.

```bash
VUE_APP_VERCEL_GIT_PROVIDER=github
```

--------------------------------

### List All Edge Configs using Vercel API

Source: https://vercel.com/docs/edge-config/vercel-api

This snippet demonstrates how to retrieve a list of all Edge Configs associated with a Vercel team or Hobby account. It uses a GET request to the Vercel REST API, requiring a teamId query parameter and a Vercel API token for authorization. Examples are provided for both cURL and JavaScript fetch.

```bash
curl "https://api.vercel.com/v1/edge-config?teamId=your_team_id_here" \
     -H 'Authorization: Bearer your_vercel_api_token_here'
```

```javascript
try {
  const listItems = await fetch(
    'https://api.vercel.com/v1/edge-config?teamId=your_team_id_here',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${your_vercel_api_token_here}`,
      },
    },
  );
  const result = await listItems.json();
  console.log(result);
} catch (error) {
  console.log(error);
}
```

--------------------------------

### List All Vercel Blobs using `list()` (TypeScript/JavaScript)

Source: https://vercel.com/docs/vercel-blob/using-blob-sdk

This example illustrates how to implement an API route that uses the `@vercel/blob` library's `list()` function to retrieve an array of all blob objects in the store. The route returns the list of blobs, each with its metadata, as a JSON response. It supports Next.js App Router, Pages Router, and other frameworks.

```typescript
import { list } from '@vercel/blob';

export async function GET(request: Request) {
  const { blobs } = await list();
  return Response.json(blobs);
}
```

```javascript
import { list } from '@vercel/blob';

export async function GET(request) {
  const { blobs } = await list();
  return Response.json(blobs);
}
```

--------------------------------

### PATCH /v1/installations/{installationId}/resources/{resourceId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner

Partially update an existing resource for an installation.

```APIDOC
## PATCH /v1/installations/{installationId}/resources/{resourceId}

### Description
Update Resource

### Method
PATCH

### Endpoint
/v1/installations/{installationId}/resources/{resourceId}

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation.
- **resourceId** (string) - Required - The ID of the resource.
```

--------------------------------

### Configure SvelteKit Vercel Adapter with Image Optimization

Source: https://vercel.com/docs/image-optimization/quickstart

Configure the @sveltejs/adapter-vercel in SvelteKit to enable Vercel's native image optimization API. Specify image sizes, formats, cache TTL, and allowed domains for image optimization.

```javascript
import adapter from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter({
      images: {
        sizes: [640, 828, 1200, 1920, 3840],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 300,
        domains: ['example-app.vercel.app'],
      }
    })
  }
};
```

```typescript
import adapter from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter({
      images: {
        sizes: [640, 828, 1200, 1920, 3840],
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 300,
        domains: ['example-app.vercel.app'],
      }
    })
  }
};
```

--------------------------------

### Install `@vercel/og` Library for Vercel OG Image Generation

Source: https://vercel.com/docs/og-image-generation

Provides commands to install the `@vercel/og` library using various Node.js package managers (pnpm, yarn, npm, bun). This library is crucial for enabling dynamic Open Graph image generation on Vercel.

```bash
pnpm i @vercel/og
```

```bash
yarn i @vercel/og
```

```bash
npm i @vercel/og
```

```bash
bun i @vercel/og
```

--------------------------------

### Upload Avatar Form with Vercel Blob Client

Source: https://vercel.com/docs/vercel-blob/client-upload

React component that creates a file upload form for avatar images using Vercel Blob's client upload functionality. Accepts JPEG, PNG, and WebP formats, handles form submission with file upload, and displays the resulting blob URL after successful upload.

```jsx
import { upload } from '@vercel/blob/client';
import { useState, useRef } from 'react';

export default function AvatarUploadPage() {
  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);
  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const file = inputFileRef.current.files[0];

          const newBlob = await upload(file.name, file, {
            access: 'public',
            handleUploadUrl: '/api/avatar/upload',
          });

          setBlob(newBlob);
        }}
      >
        <input
          name="file"
          ref={inputFileRef}
          type="file"
          accept="image/jpeg, image/png, image/webp"
          required
        />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
    </>
  );
}
```

--------------------------------

### POST /v1/team-microfrontends

Source: https://vercel.com/docs/rest-api/reference/endpoints/projects/create-a-new-project

Creates a new team microfrontend configuration.

```APIDOC
## POST /v1/team-microfrontends

### Description
Creates a new team microfrontend configuration.

### Method
POST

### Endpoint
/v1/team-microfrontends

### Parameters
#### Path Parameters
- No path parameters.

#### Query Parameters
- No query parameters.

#### Request Body
- **payload** (object) - Required - The data for the new team microfrontend configuration.

### Request Example
{
  "teamId": "team_xxxxxxxxxxxxxxxxx",
  "name": "my-microfrontend",
  "url": "https://my-microfrontend.vercel.app"
}

### Response
#### Success Response (200)
- **id** (string) - The ID of the created team microfrontend configuration.
- **message** (string) - A success message.

#### Response Example
{
  "id": "tmf_xxxxxxxxxxxxxxxxx",
  "message": "Team microfrontend created successfully."
}
```

--------------------------------

### Verify Clawd Bot Installation and Status

Source: https://vercel.com/docs/ai-gateway/chat-platforms/clawd-bot

Check that Clawd Bot is configured correctly and running. These commands verify the health status and current operational status of the Clawd Bot installation.

```bash
clawdbot health
clawdbot status
```

--------------------------------

### Implement Time-based Revalidation in Next.js App Router API Routes (TypeScript/JavaScript)

Source: https://vercel.com/docs/runtime-cache

This example shows how to achieve time-based revalidation in Next.js App Router API routes. It leverages `next/cache`'s `cacheLife` to specify a cache expiration of 1 hour (3600 seconds) for the data. The `GET` handler fetches product data, and the `getProducts` helper function applies the caching directive.

```TypeScript
import { cacheLife } from 'next/cache';

export async function GET() {
  const data = await getProducts();
  return Response.json(data);
}

async function getProducts() {
  'use cache: remote'
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/products');
  return response.json();
}
```

```JavaScript
import { cacheLife } from 'next/cache';

export async function GET() {
  const data = await getProducts();
  return Response.json(data);
}

async function getProducts() {
  'use cache: remote'
  cacheLife({ expire: 3600 }) // 1 hour

  const response = await fetch('https://api.example.com/products');
  return response.json();
}
```

--------------------------------

### Configure Wildcard Path Redirect with vercel.json

Source: https://vercel.com/docs/project-configuration/vercel-json

Use wildcard path matching to redirect requests from one directory to another while preserving the remaining path. This example redirects /blog/* to /news/* with a 308 status code.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "redirects": [
    {
      "source": "/blog/:path*",
      "destination": "/news/:path*"
    }
  ]
}
```

--------------------------------

### Skip Interactive Questions with --yes Flag

Source: https://vercel.com/docs/cli/deploy

The --yes option bypasses all interactive prompts during Vercel project setup by using default values inferred from vercel.json and the folder name. This is useful for automated deployments and CI/CD pipelines.

```bash
vercel --yes
```

--------------------------------

### Implement On-Demand Revalidation API Route in Next.js (App Router - TypeScript)

Source: https://vercel.com/docs/incremental-static-regeneration/quickstart

This API route, built for the Next.js App Router with TypeScript, facilitates on-demand revalidation using `revalidatePath`. It secures the revalidation process by checking for a secret token within the request URL's search parameters. The route returns a JSON response indicating the revalidation status and a timestamp.

```ts
import { revalidatePath } from 'next/cache';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== process.env.MY_SECRET_TOKEN) {
    return new Response('Invalid credentials', {
      status: 401,
    });
  }

  revalidatePath('/blog-posts');

  return Response.json({
    revalidated: true,
    now: Date.now(),
  });
}
```

--------------------------------

### Handle Vercel Private Registry Login Error in JavaScript

Source: https://vercel.com/docs/private-registry

This JavaScript code snippet demonstrates error handling for a command that checks user login status to the Vercel private registry. If the command fails, it catches the error and throws a new one, instructing the user to log in using a provided command. This ensures proper feedback when private dependency installation fails due to authentication issues.

```javascript
await execPromise(checkCommand);
  } catch (error) {
    throw new Error(
      `Please log in to the Vercel private registry to install \`@vercel-private\`-scoped packages:\n\`${loginCommand}\``,
    );
  }
```

--------------------------------

### Configure SvelteKit Deployment with Node.js Runtime

Source: https://vercel.com/docs/frameworks/full-stack/sveltekit

This JavaScript example shows how to explicitly configure the SvelteKit Vercel adapter in `svelte.config.js` to use a specific Node.js runtime version, such as `nodejs20.x`. This allows for project-wide control over the serverless function environment for server-side rendering.

```javascript
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      runtime: 'nodejs20.x',
    }),
  },
};

export default config;
```

--------------------------------

### Implement On-Demand Revalidation API Route in Next.js (Pages Router - TypeScript)

Source: https://vercel.com/docs/incremental-static-regeneration/quickstart

This TypeScript API route for Next.js Pages Router performs on-demand revalidation. It ensures type safety for `NextApiRequest` and `NextApiResponse` while verifying a secret token from the request query. Upon successful validation, `res.revalidate()` is called to purge the cache for the specified path, with error handling for revalidation failures.

```ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    // This should be the actual path, not a rewritten path
    // e.g. for "/blog-posts/[slug]" this should be "/blog-posts/1"
    await res.revalidate('/blog-posts');
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating');
  }
}
```

--------------------------------

### Example Streaming API Response with OpenAI Reasoning Details (Summary Chunk)

Source: https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-compat/advanced

This JSON object represents an incremental chunk from a streaming API response from an OpenAI model. It demonstrates how `reasoning_details` are streamed, specifically showing a `reasoning.summary` type with partial reasoning content within the `delta` object.

```json
{
  "id": "chatcmpl-456",
  "object": "chat.completion.chunk",
  "created": 1677652288,
  "model": "openai/o3-mini",
  "choices": [
    {
      "index": 0,
      "delta": {
        "reasoning": "Step 1:",
        "reasoning_details": [
          {
            "type": "reasoning.summary",
            "summary": "Step 1:"
          }
        ]
      }
    }
  ]
}
```

--------------------------------

### Image Optimization Source Image Usage Example

Source: https://vercel.com/docs/image-optimization/legacy-pricing

Demonstrates how a single source image passed to the Image component's src prop can generate multiple optimized images with different dimensions and quality settings. Shows the relationship between the source image and resulting optimized image URLs.

```jsx
<Image src="/hero.png" width="700" height="745" />

// Source image: /hero.png
// Optimized images generated:
// /_next/image?url=%2Fhero.png&w=750&q=75
// /_next/image?url=%2Fhero.png&w=828&q=75
// /_next/image?url=%2Fhero.png&w=1080&q=75
```

--------------------------------

### Perform Partial Downloads with cURL Range Requests on Vercel Blob

Source: https://vercel.com/docs/storage/vercel-blob/examples

This example demonstrates how to use `curl` with the `-r` flag to perform range requests on Vercel Blob URLs. It allows downloading specific byte ranges, such as the first few bytes, the last few bytes, or a custom byte range, enabling efficient partial content retrieval.

```bash
# First 4 bytes
curl -r 0-3 https://1sxstfwepd7zn41q.public.blob.vercel-storage.com/pi.txt
# 3.14
 
# Last 5 bytes
curl -r -5 https://1sxstfwepd7zn41q.public.blob.vercel-storage.com/pi.txt
# 58151
 
# Bytes 3-6
curl -r 3-6 https://1sxstfwepd7zn41q.public.blob.vercel-storage.com/pi.txt
# 4159
```

--------------------------------

### Install @vercel/remix package with package managers

Source: https://vercel.com/docs/frameworks/full-stack/remix

Install the @vercel/remix package using pnpm, yarn, npm, or bun. This package exposes useful types and utilities for Remix apps deployed on Vercel, including json, defer, and createCookie utilities.

```bash
pnpm i @vercel/remix
```

```bash
yarn i @vercel/remix
```

```bash
npm i @vercel/remix
```

```bash
bun i @vercel/remix
```

--------------------------------

### Test Turborepo Remote Caching with Build Command

Source: https://vercel.com/docs/monorepos/turborepo

Execute `turbo run build` to verify that remote caching is active and functioning. Subsequent builds after changes will demonstrate significantly improved speeds as Turborepo reuses cached artifacts and only rebuilds changed files.

```bash
turbo run build
```

--------------------------------

### Fetch Edge Configurations with Vercel SDK (TypeScript)

Source: https://vercel.com/docs/rest-api/reference/endpoints/edge-config/get-edge-configs

This TypeScript example demonstrates how to use the Vercel SDK to retrieve a list of all Edge Configurations associated with a specific team. It requires a bearer token for authentication and takes `teamId` and `slug` as query parameters to identify the target team. The function logs the array of Edge Config objects returned by the API.

```TypeScript
import { Vercel } from "@vercel/sdk";

const vercel = new Vercel({
  bearerToken: "<YOUR_BEARER_TOKEN_HERE>",
});

async function run() {
  const result = await vercel.edgeConfig.getEdgeConfigs({
    teamId: "team_1a2b3c4d5e6f7g8h9i0j1k2l",
    slug: "my-team-url-slug",
  });

  console.log(result);
}

run();
```

--------------------------------

### Install and configure LlamaIndex with Vercel AI Gateway

Source: https://vercel.com/docs/ai-gateway/ecosystem

Install the dedicated llama-index-llms-vercel-ai-gateway package and initialize the VercelAIGateway client for knowledge assistants and document Q&A applications. Requires the AI_GATEWAY_API_KEY environment variable.

```bash
pip install llama-index-llms-vercel-ai-gateway
```

```python
from llama_index.llms.vercel_ai_gateway import VercelAIGateway

llm = VercelAIGateway(
    model="anthropic/claude-sonnet-4.5",
    api_key=os.getenv("AI_GATEWAY_API_KEY")
)
```

--------------------------------

### Configure Vercel Git Provider for RedwoodJS (Bash)

Source: https://vercel.com/docs/environment-variables/framework-environment-variables

This environment variable specifies the Git provider (e.g., GitHub, GitLab, Bitbucket) from which the Vercel deployment was triggered for a RedwoodJS application. It is available at both build and runtime. The example demonstrates setting it to 'github'.

```bash
REDWOOD_ENV_VERCEL_GIT_PROVIDER=github
```

--------------------------------

### Use Tool Calling with AI SDK

Source: https://vercel.com/docs/ai-sdk

Shows how to implement tool calling with the AI SDK to interact with external systems and perform discrete tasks. This example defines a getWeather tool that the model can invoke to retrieve weather information for a specified location.

```typescript
import { generateText, tool } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-5.2',
  prompt: 'What is the weather like today in San Francisco?',
  tools: {
    getWeather: tool({
      description: 'Get the weather in a location',
      inputSchema: z.object({
        location: z.string().describe('The location to get the weather for'),
      }),
      execute: async ({ location }) => ({
        location,
        temperature: 72 + Math.floor(Math.random() * 21) - 10,
      }),
    }),
  },
});
```

--------------------------------

### Configure Cache-Control Headers in Vercel Functions (Generic/Vercel Node)

Source: https://vercel.com/docs/cdn-cache

This example shows how to set Cache-Control headers for a generic Vercel Function, potentially using the @vercel/node runtime. It configures a public cache with a 1-second s-maxage, enabling CDN caching and revalidation.

```ts
import type { VercelResponse } from '@vercel/node';

export default function handler(response: VercelResponse) {
  response.setHeader('Cache-Control', 'public, s-maxage=1');

  return response.status(200).json({ name: 'John Doe' });
}
```

```js
export default function handler(response) {
  response.setHeader('Cache-Control', 'public, s-maxage=1');

  return response.status(200).json({ name: 'John Doe' });
}
```

--------------------------------

### Demonstrate AI Gateway Streaming Response Format (SSE)

Source: https://vercel.com/docs/ai-gateway/sdks-and-apis/openai-compat/chat-completions

This HTTP example illustrates the Server-Sent Events (SSE) format used by the AI Gateway for streaming responses. Each 'data:' line contains a JSON object with partial response data, and the stream concludes with 'data: [DONE]'. It shows the incremental delivery of content.

```http
data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1677652288,"model":"anthropic/claude-sonnet-4.5","choices":[{"index":0,"delta":{"content":"Once"},"finish_reason":null}]}

data: {"id":"chatcmpl-123","object":"chat.completion.chunk","created":1677652288,"model":"anthropic/claude-sonnet-4.5","choices":[{"index":0,"delta":{"content":" upon"},"finish_reason":null}]}

data: [DONE]
```

--------------------------------

### Create LlamaIndex Project Directory (Bash)

Source: https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/llamaindex

This command sequence creates a new directory for the LlamaIndex project and navigates into it, preparing the environment for further setup.

```bash
mkdir llamaindex-ai-gateway
cd llamaindex-ai-gateway
```

--------------------------------

### Monitor Command Execution Duration in TypeScript

Source: https://vercel.com/docs/vercel-sandbox/sdk-reference

Demonstrates using the startedAt accessor to retrieve the Unix timestamp (in milliseconds) when a command started, enabling duration monitoring and timeout threshold management for long-running processes.

```typescript
const duration = Date.now() - command.startedAt;
console.log(`Command has been running for ${duration}ms`);
```

--------------------------------

### Implement Cross-Microfrontend Navigation Prefetching in Next.js

Source: https://vercel.com/docs/microfrontends/managing-microfrontends

To optimize navigations between different top-level microfrontends in Next.js, use the `Link` component from `@vercel/microfrontends/next/client`. This component automatically prefetches and prerenders links to minimize user-visible latency. First, add the `PrefetchCrossZoneLinks` element to your `layout.tsx` (App Router) or `_app.tsx` (Pages Router) file, then replace standard `<a>` tags with this `Link` component.

```tsx
import { Link } from '@vercel/microfrontends/next/client';

export function MyComponent() {
  return (
    <>
      <Link href="/docs">Docs</Link>
    </>
  );
}
```

--------------------------------

### Install Vercel Functions package for Astro Middleware

Source: https://vercel.com/docs/frameworks/frontend/astro

This snippet shows how to install the `@vercel/functions` package, which is required for TypeScript users to type their middleware functions when working with `Astro.locals` in Vercel's edge environment. Various package managers are provided.

```bash
pnpm i @vercel/functions
```

```bash
yarn i @vercel/functions
```

```bash
npm i @vercel/functions
```

```bash
bun i @vercel/functions
```

--------------------------------

### Retrieve all Edge Config values with getAll

Source: https://vercel.com/docs/edge-config/edge-config-sdk

The getAll helper method returns all items stored in your Edge Config. This example demonstrates fetching all configuration values and returning them as JSON in a Next.js API route. The method is imported from @vercel/edge-config and works with both TypeScript and JavaScript.

```TypeScript
import { NextResponse } from 'next/server';
import { getAll } from '@vercel/edge-config';

export async function GET() {
  const configItems = await getAll();

  return NextResponse.json({
    label: `These are all the values in my Edge Config.`,
    value: configItems,
  });
}
```

```JavaScript
import { NextResponse } from 'next/server';
import { getAll } from '@vercel/edge-config';

export async function GET() {
  const configItems = await getAll();

  return NextResponse.json({
    label: `These are all the values in my Edge Config.`,
    value: configItems,
  });
}
```

--------------------------------

### Implement Next.js Middleware to Read Edge Config

Source: https://vercel.com/docs/edge-config/get-started

Example Next.js middleware code (TypeScript and JavaScript) demonstrating how to read a 'greeting' value from a Vercel Edge Config store. This middleware intercepts requests to the '/welcome' path and returns the retrieved value as a JSON response, showcasing dynamic content delivery based on Edge Config.

```ts
import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = { matcher: '/welcome' };

export async function middleware() {
  const greeting = await get('greeting');
  return NextResponse.json(greeting);
}
```

```js
import { NextResponse } from 'next/server';
import { get } from '@vercel/edge-config';

export const config = { matcher: '/welcome' };

export async function middleware() {
  const greeting = await get('greeting');
  return NextResponse.json(greeting);
}
```

--------------------------------

### Install AI Gateway and Mastra Dependencies

Source: https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/mastra

Install required packages for Mastra framework and AI Gateway integration. Supports multiple package managers (pnpm, yarn, npm, bun) for dependency management.

```bash
pnpm i @ai-sdk/gateway mastra @mastra/core @mastra/memory
```

```bash
yarn i @ai-sdk/gateway mastra @mastra/core @mastra/memory
```

```bash
npm i @ai-sdk/gateway mastra @mastra/core @mastra/memory
```

```bash
bun i @ai-sdk/gateway mastra @mastra/core @mastra/memory
```

--------------------------------

### Read Edge Config Metadata using Vercel API

Source: https://vercel.com/docs/edge-config/vercel-api

This snippet illustrates how to retrieve metadata (like createdAt, updatedAt, slug, id, itemCount) for a specific Edge Config. It uses a GET request to the Vercel REST API, requiring the Edge Config's ID and a Vercel API token for authentication. Examples are provided for both cURL and JavaScript fetch.

```bash
curl "https://api.vercel.com/v1/edge-config/your_edge_config_id_here?teamId=your_team_id_here" \
     -H 'Authorization: Bearer your_vercel_api_token_here'
```

```javascript
try {
  const readMetadata = await fetch(
    'https://api.vercel.com/v1/edge-config/your_edge_config_id_here?teamId=your_team_id_here',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${your_vercel_api_token_here}`,
      },
    },
  );
  const result = await readMetadata.json();
  console.log(result);
} catch (error) {
  console.log(error);
}
```

--------------------------------

### Environment Variable Options Reference

Source: https://vercel.com/docs/cli/env

Reference guide for common options available across vercel env commands including --sensitive, --force, and --yes flags.

```APIDOC
## Environment Variable Command Options

### --sensitive
Marks an environment variable as sensitive, applying additional security measures and hiding the value in the Vercel dashboard.

#### Usage
```bash
vercel env add API_TOKEN --sensitive
vercel env update API_TOKEN --sensitive
```

#### Examples
```bash
# Add sensitive variable
vercel env add API_TOKEN --sensitive

# Update variable and mark as sensitive
vercel env update API_TOKEN --sensitive
```

---

### --force
Overwrites an existing environment variable of the same target without prompting for confirmation.

#### Usage
```bash
vercel env add API_TOKEN production --force
```

#### Examples
```bash
# Add and force overwrite existing variable
vercel env add API_TOKEN production --force
```

---

### --yes
Bypasses confirmation prompts when overwriting environment files, removing variables, or updating variables.

#### Usage
```bash
vercel env pull --yes
vercel env rm [name] --yes
vercel env update [name] --yes
```

#### Examples
```bash
# Pull and overwrite existing file without confirmation
vercel env pull --yes

# Remove variable without confirmation
vercel env rm API_TOKEN --yes

# Update variable without confirmation
vercel env update API_TOKEN production --yes
```
```

--------------------------------

### PATCH /v1/installations/{integrationConfigurationId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/update-installation

Updates an integration installation with new configuration details. This endpoint allows you to modify the installation status, external ID, billing plan information, and customer notifications for an existing integration configuration.

```APIDOC
## PATCH /v1/installations/{integrationConfigurationId}

### Description
Updates an integration installation with new configuration details including status, external ID, billing plan, and notifications.

### Method
PATCH

### Endpoint
/v1/installations/{integrationConfigurationId}

### Authentication
- **Type**: Bearer Token
- **Required**: Yes

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required - The unique identifier of the integration configuration to update

### Request Body
**Content-Type**: application/json

- **status** (string) - Optional - The new status of the installation
- **externalId** (string) - Optional - External identifier for the installation
- **billingPlan** (object) - Optional - Billing plan details for the installation
  - **id** (string) - Required - Unique identifier for the billing plan
  - **type** (string) - Required - Type of billing plan
  - **name** (string) - Required - Display name of the billing plan
  - **description** (string) - Optional - Description of the billing plan
  - **paymentMethodRequired** (boolean) - Optional - Whether payment method is required
  - **cost** (string) - Optional - Cost of the billing plan
  - **details** (array) - Optional - Additional plan details
    - **label** (string) - Required - Label for the detail
    - **value** (string) - Detail value
  - **highlightedDetails** (array) - Optional - Highlighted plan details
    - **label** (string) - Required - Label for the highlighted detail
    - **value** (string) - Detail value
  - **effectiveDate** (string) - Optional - Date when the plan becomes effective
- **notification** (string) - Optional - Notification message to display to customer. Send null to clear current notification

### Request Example
```json
{
  "status": "active",
  "externalId": "ext_123456",
  "billingPlan": {
    "id": "plan_pro",
    "type": "subscription",
    "name": "Professional Plan",
    "description": "Advanced features for professionals",
    "paymentMethodRequired": true,
    "cost": "29.99",
    "details": [
      {
        "label": "Users",
        "value": "Unlimited"
      }
    ],
    "highlightedDetails": [
      {
        "label": "Support",
        "value": "24/7 Priority"
      }
    ],
    "effectiveDate": "2024-01-01"
  },
  "notification": "Your plan has been upgraded"
}
```

### Response
#### Success Response (204)
- **Status**: No Content
- **Description**: Installation successfully updated

#### Error Response (400)
- **Status**: Bad Request
- **Description**: One of the provided values in the request body or query is invalid

#### Error Response (401)
- **Status**: Unauthorized
- **Description**: The request is not authorized. Verify your bearer token is valid.

#### Error Response (403)
- **Status**: Forbidden
- **Description**: You do not have permission to access this resource.

#### Error Response (404)
- **Status**: Not Found
- **Description**: The specified integration configuration was not found.
```

--------------------------------

### PATCH /v1/installations/{integrationConfigurationId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel

Updates an existing installation configuration in the Vercel Marketplace.

```APIDOC
## PATCH /v1/installations/{integrationConfigurationId}

### Description
Updates an existing installation configuration in the Vercel Marketplace.

### Method
PATCH

### Endpoint
/v1/installations/{integrationConfigurationId}

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required - The ID of the integration configuration.

#### Query Parameters
None

#### Request Body
None

### Request Example
{}

### Response
#### Success Response (200)
None

#### Response Example
{}
```

--------------------------------

### Implement On-Demand Revalidation API Route in Next.js (Pages Router - JavaScript)

Source: https://vercel.com/docs/incremental-static-regeneration/quickstart

This API route, designed for Next.js applications using the Pages Router, handles on-demand revalidation. It securely validates a secret token from the request query parameters and then invokes `response.revalidate()` to clear the cache for a specified path. The route includes error handling to ensure the last successfully generated page is shown if revalidation fails.

```js
export default async function handler(request, response) {
  // Check for secret to confirm this is a valid request
  if (request.query.secret !== process.env.MY_SECRET_TOKEN) {
    return response.status(401).json({ message: 'Invalid token' });
  }

  try {
    // This should be the actual path, not a rewritten path
    // e.g. for "/blog-posts/[slug]" this should be "/blog-posts/1"
    await response.revalidate('/blog-posts');
    return response.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return response.status(500).send('Error revalidating');
  }
}
```

--------------------------------

### Perform Vercel Runtime Cache Operations (Get, Set) in TypeScript

Source: https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package

This TypeScript example demonstrates how to use the Vercel Runtime Cache within a Vercel Function. It shows how to retrieve a value using `cache.get()`, and if not found, fetch data from an external API and store it in the cache using `cache.set()` with a Time-To-Live (TTL) and tags. This pattern is useful for optimizing API responses and reducing external service calls.

```typescript
import { getCache } from '@vercel/functions';

export default {
  async fetch(request) {
    const cache = getCache();

    // Get a value from cache
    const value = await cache.get('somekey');

    if (value) {
      return new Response(JSON.stringify(value));
    }

    const res = await fetch('https://api.vercel.app/blog');
    const originValue = await res.json();

    // Set a value in cache with TTL and tags
    await cache.set('somekey', originValue, {
      ttl: 3600, // 1 hour in seconds
      tags: ['example-tag'],
    });

    return new Response(JSON.stringify(originValue));
  },
};
```

--------------------------------

### Create Vercel API route with GCP Vertex AI text generation

Source: https://vercel.com/docs/oidc/gcp

Implements a GET API route that authenticates with GCP using OIDC tokens, initializes an External Account Client, and uses Vertex AI's Gemini model to generate text from prompts. The function reads GCP configuration from environment variables and returns JSON response with generated text.

```typescript
import { getVercelOidcToken } from '@vercel/oidc';
import { ExternalAccountClient } from 'google-auth-library';
import { createVertex } from '@ai-sdk/google-vertex';
import { generateText } from 'ai';

const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID;
const GCP_PROJECT_NUMBER = process.env.GCP_PROJECT_NUMBER;
const GCP_SERVICE_ACCOUNT_EMAIL = process.env.GCP_SERVICE_ACCOUNT_EMAIL;
const GCP_WORKLOAD_IDENTITY_POOL_ID = process.env.GCP_WORKLOAD_IDENTITY_POOL_ID;
const GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID =
  process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID;

// Initialize the External Account Client
const authClient = ExternalAccountClient.fromJSON({
  type: 'external_account',
  audience: `//iam.googleapis.com/projects/${GCP_PROJECT_NUMBER}/locations/global/workloadIdentityPools/${GCP_WORKLOAD_IDENTITY_POOL_ID}/providers/${GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID}`,
  subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
  token_url: 'https://sts.googleapis.com/v1/token',
  service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT_EMAIL}:generateAccessToken`,
  subject_token_supplier: {
    // Use the Vercel OIDC token as the subject token
    getSubjectToken: getVercelOidcToken,
  },
});

const vertex = createVertex({
  project: GCP_PROJECT_ID,
  location: 'us-central1',
  googleAuthOptions: {
    authClient,
    projectId: GCP_PROJECT_ID,
  },
});

// Export the route handler
export const GET = async (req: Request) => {
  const result = generateText({
    model: vertex('gemini-1.5-flash'),
    prompt: 'Write a vegetarian lasagna recipe for 4 people.',
  });
  return Response.json(result);
};
```

--------------------------------

### PATCH /v1/installations/{installationId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api

Update installation with SSO-enabled notification links. This endpoint allows providers to include sso: prefixed URLs in notifications and other API responses to trigger Vercel's SSO flow before redirecting users.

```APIDOC
## PATCH /v1/installations/{installationId}

### Description
Update an installation with SSO-enabled notification links. Include sso: prefixed URLs in the notification href field to trigger Vercel's SSO flow before redirecting users to your platform.

### Method
PATCH

### Endpoint
/v1/installations/{installationId}

### Parameters
#### Path Parameters
- **installationId** (string) - Required - The ID of the installation to update

#### Request Body
- **notification** (object) - Optional - Notification object with SSO-enabled URL
  - **title** (string) - Required - Notification title
  - **message** (string) - Required - Notification message
  - **href** (string) - Required - SSO-enabled URL with sso: prefix (format: "sso:https://your-domain.com/path")
  - **type** (string) - Required - Notification type (e.g., "info", "warning", "error")

### Request Example
{
  "notification": {
    "title": "Review your usage",
    "message": "Your monthly usage report is ready",
    "href": "sso:https://your-integration.com/dashboard/usage",
    "type": "info"
  }
}

### Response
#### Success Response (200)
- **id** (string) - Installation ID
- **notification** (object) - Updated notification object
- **status** (string) - Installation status

#### Response Example
{
  "id": "inst_abc123",
  "notification": {
    "title": "Review your usage",
    "message": "Your monthly usage report is ready",
    "href": "sso:https://your-integration.com/dashboard/usage",
    "type": "info"
  },
  "status": "active"
}
```

--------------------------------

### Same-Application Rewrite with Dynamic Parameters

Source: https://vercel.com/docs/rewrites

Route requests with dynamic path parameters to a serverless function. This example converts image resize requests like /resize/800/600 to /api/sharp with width and height query parameters.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/resize/:width/:height",
      "destination": "/api/sharp"
    }
  ]
}
```

--------------------------------

### Install Vercel Analytics Package

Source: https://vercel.com/docs/frameworks/frontend/react-router

Package installation commands for @vercel/analytics using multiple package managers (pnpm, yarn, npm, bun). Run one of these commands in the root directory of your React Router project to enable visitor and page view tracking.

```bash
pnpm i @vercel/analytics
```

```bash
yarn i @vercel/analytics
```

```bash
npm i @vercel/analytics
```

```bash
bun i @vercel/analytics
```

--------------------------------

### Setup DevCycle in Next.js App Router with TypeScript

Source: https://vercel.com/docs/edge-config/edge-config-integrations/devcycle-edge-config

Initialize DevCycle integration in a Next.js application using the App Router with TypeScript. Creates an Edge Config client and configures DevCycle with server and client SDK keys, user context, and Edge Config source.

```typescript
import { createClient } from '@vercel/edge-config';
import { EdgeConfigSource } from '@devcycle/vercel-edge-config';
import { setupDevCycle } from '@devcycle/nextjs-sdk/server';

const edgeClient = createClient(process.env.EDGE_CONFIG ?? '');
const edgeConfigSource = new EdgeConfigSource(edgeClient);

export const { getVariableValue, getClientContext } = setupDevCycle({
  serverSDKKey: process.env.DEVCYCLE_SERVER_SDK_KEY ?? '',
  clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? '',
  userGetter: () => ({ user_id: 'test_user' }),
  options: {
    // pass the configSource option with the instance of EdgeConfigSource
    configSource: edgeConfigSource,
  },
});
```

--------------------------------

### DELETE /v1/installations/{integrationConfigurationId}/resources/{resourceId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/delete-integration-resource

Delete a resource owned by the selected installation ID.

```APIDOC
## DELETE /v1/installations/{integrationConfigurationId}/resources/{resourceId}

### Description
Delete a resource owned by the selected installation ID.

### Method
DELETE

### Endpoint
/v1/installations/{integrationConfigurationId}/resources/{resourceId}

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required -
- **resourceId** (string) - Required -

### Response
#### Success Response (204)
- **Status**: 204 No Content

#### Error Responses
- **400 Bad Request**: One of the provided values in the request query is invalid.
- **401 Unauthorized**: The request is not authorized.
- **403 Forbidden**: You do not have permission to access this resource.
- **404 Not Found**: Success
```

--------------------------------

### Inject Vercel Analytics in Other Frameworks (Client-side)

Source: https://vercel.com/docs/analytics/quickstart

This example demonstrates the generic `inject` function for integrating Vercel Analytics into frameworks not explicitly covered by dedicated components. It should be imported from `@vercel/analytics` and called once in your main client-side application file. Note that this method does not provide route support.

```ts
import { inject } from '@vercel/analytics';

inject();
```

```js
import { inject } from '@vercel/analytics';

inject();
```

--------------------------------

### POST /domains/check-availability

Source: https://vercel.com/docs/ai-resources/vercel-mcp/tools

Check if domain names are available for purchase and get pricing information.

```APIDOC
## POST /domains/check-availability

### Description
Check if domain names are available for purchase and get pricing information.

### Method
POST

### Endpoint
/domains/check-availability

### Parameters
#### Request Body
- **names** (array of string) - Required - Array of domain names to check availability for (e.g., ['example.com', 'test.org'])

### Request Example
{
  "names": [
    "example.com",
    "test.org"
  ]
}

### Response
#### Success Response (200)
- **domains** (array of object) - An array of domain availability results.
  - **name** (string) - The domain name.
  - **available** (boolean) - True if the domain is available, false otherwise.
  - **price** (number) - The price of the domain if available (e.g., 12.99).
  - **currency** (string) - The currency of the price (e.g., 'USD').

#### Response Example
{
  "domains": [
    {
      "name": "example.com",
      "available": false,
      "price": null,
      "currency": null
    },
    {
      "name": "test.org",
      "available": true,
      "price": 15.99,
      "currency": "USD"
    }
  ]
}
```

--------------------------------

### Configure Catch-All Redirect with vercel.json

Source: https://vercel.com/docs/project-configuration/vercel-json

Redirect all paths including subdirectories to an external URL using regex pattern matching. This example uses /(.*) to catch all requests and redirect them to https://vercel.com/docs.

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "https://vercel.com/docs"
    }
  ]
}
```

--------------------------------

### Fetch Edge Config Data via HTTP GET Request

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-v1-installations-resources-experimentation-edge-config

This HTTP GET request retrieves the contents of a user-provided Edge Config. It requires `integrationConfigurationId` and `resourceId` as path parameters and is used by partners when Edge Config syncing is enabled.

```http
GET /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/edge-config
```

--------------------------------

### Example AI Gateway Provider Metadata Output

Source: https://vercel.com/docs/ai-gateway/models-and-providers/provider-options

This JSON object illustrates the detailed metadata returned by the AI Gateway for a successful request. It includes routing information, resolved providers, fallback options, execution reasoning, cost details, and a unique generation ID.

```json
{
  "anthropic": {},
  "gateway": {
    "routing": {
      "originalModelId": "anthropic/claude-sonnet-4.5",
      "resolvedProvider": "anthropic",
      "resolvedProviderApiModelId": "claude-sonnet-4.5",
      "internalResolvedModelId": "anthropic:claude-sonnet-4.5",
      "fallbacksAvailable": ["bedrock", "vertex"],
      "internalReasoning": "Selected anthropic as preferred provider for claude-sonnet-4.5. 2 fallback(s) available: bedrock, vertex",
      "planningReasoning": "System credentials planned for: anthropic. Total execution order: anthropic(system)",
      "canonicalSlug": "anthropic/claude-sonnet-4.5",
      "finalProvider": "anthropic",
      "attempts": [
        {
          "provider": "anthropic",
          "internalModelId": "anthropic:claude-sonnet-4.5",
          "providerApiModelId": "claude-sonnet-4.5",
          "credentialType": "system",
          "success": true,
          "startTime": 458753.407267,
          "endTime": 459891.705775
        }
      ],
      "modelAttemptCount": 1,
      "modelAttempts": [
        {
          "modelId": "anthropic/claude-sonnet-4.5",
          "canonicalSlug": "anthropic/claude-sonnet-4.5",
          "success": true,
          "providerAttemptCount": 1,
          "providerAttempts": [
            {
              "provider": "anthropic",
              "internalModelId": "anthropic:claude-sonnet-4.5",
              "providerApiModelId": "claude-sonnet-4.5",
              "credentialType": "system",
              "success": true,
              "startTime": 458753.407267,
              "endTime": 459891.705775
            }
          ]
        }
      ],
      "totalProviderAttemptCount": 1
    },
    "cost": "0.0045405",
    "marketCost": "0.0045405",
    "generationId": "gen_01K8KPJ0FZA7172X6CSGNZGDWY"
  }
}
```

--------------------------------

### GET /integrations/configurations

Source: https://vercel.com/docs/rest-api/reference/endpoints/integrations/get-configurations-for-the-authenticated-user-or-team

Retrieves the list of integration configurations for the authenticated user. Returns all configurations with their metadata including status, ownership, permissions, and lifecycle information. Configurations can be filtered by various properties and may be limited to specific projects.

```APIDOC
## GET /integrations/configurations

### Description
Retrieves the list of integration configurations for the authenticated user. Each configuration represents an installed integration with its current status, permissions, and metadata.

### Method
GET

### Endpoint
/integrations/configurations

### Response
#### Success Response (200)
- **completedAt** (number) - A timestamp indicating when the configuration was installed successfully
- **createdAt** (number) - A timestamp indicating when the configuration was created
- **id** (string) - The unique identifier of the configuration
- **integrationId** (string) - The unique identifier of the app the configuration was created for
- **ownerId** (string) - The user or team ID that owns the configuration
- **status** (enum) - The configuration status. Available options: `error`, `ready`, `pending`, `onboarding`, `suspended`, `resumed`, `uninstalled`
- **externalId** (string) - An external identifier defined by the integration vendor
- **projects** (string[]) - Project IDs the configuration is allowed to access. If undefined, configuration has full access
- **source** (enum) - Where the configuration was installed from. Available options: `marketplace`, `deploy-button`, `external`, `v0`, `resource-claims`, `cli`, `oauth`, `backoffice`
- **slug** (string) - The slug of the integration the configuration is created for
- **teamId** (string | null) - The ID of the team if the configuration was created for a team
- **type** (enum) - Configuration type. Available option: `integration-configuration`
- **updatedAt** (number) - A timestamp indicating when the configuration was last updated
- **userId** (string) - The ID of the user that created the configuration
- **scopes** (string[]) - The resources allowed to be accessed by the configuration
- **disabledAt** (number) - A timestamp indicating when the configuration was disabled
- **deletedAt** (number | null) - A timestamp indicating when the configuration was deleted
- **deleteRequestedAt** (number | null) - A timestamp indicating when configuration deletion was initiated
- **disabledReason** (enum) - Reason for disablement. Available options: `disabled-by-owner`, `feature-not-available`, `disabled-by-admin`, `original-owner-left-the-team`, `account-plan-downgrade`, `original-owner-role-downgraded`
- **installationType** (enum) - Installation type. Available options: `marketplace`, `external`

#### Response Example
```json
{
  "completedAt": 1558531915505,
  "createdAt": 1558531915505,
  "id": "icfg_3bwCLgxL8qt5kjRLcv2Dit7F",
  "integrationId": "oac_xzpVzcUOgcB1nrVlirtKhbWV",
  "ownerId": "kr1PsOIzqEL5Xg6M4VZcZosf",
  "status": "ready",
  "externalId": "ext_123",
  "projects": ["prj_xQxbutw1HpL6HLYPAzt5h75m8NjO"],
  "source": "marketplace",
  "slug": "slack",
  "teamId": "team_nLlpyC6RE1qxydlFKbrxDlud",
  "type": "integration-configuration",
  "updatedAt": 1558531915505,
  "userId": "kr1PsOIzqEL5Xg6M4VZcZosf",
  "scopes": ["read:project", "read-write:log-drain"],
  "disabledAt": null,
  "deletedAt": null,
  "deleteRequestedAt": null,
  "disabledReason": null,
  "installationType": "marketplace"
}
```
```

--------------------------------

### Create Next.js Profile Page to Display Vercel User Info (TSX)

Source: https://vercel.com/docs/sign-in-with-vercel/getting-started

This Next.js `Profile` component fetches the user's `access_token` from cookies. It then uses this token to make an authenticated GET request to the Vercel `/login/oauth/userinfo` API endpoint. The component displays the fetched user details (name, email, username) or an error message if the token is invalid or the API call fails, prompting the user to sign in again.

```tsx
import { cookies } from 'next/headers';
  import Link from 'next/link';
  import SignOutButton from '../components/sign-out-button';

  export default async function Profile() {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    const result = await fetch('https://api.vercel.com/login/oauth/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = result.status === 200 ? await result.json() : undefined;

    if (!user) {
      return (
        <main className="p-10">
          <h1 className="text-3xl font-semibold">Error</h1>
          <p className="mt-4">
            An error occurred while trying to fetch your profile.
          </p>
          Go{' '}
          <Link className="underline" href="/">
            back to the home page
          </Link>{' '}
          and sign in again.
        </main>
      );
    }

    return (
      <main className="p-10">
        <h1 className="text-3xl font-semibold">Profile</h1>
        <p className="mt-4">
          Welcome to your profile page <strong>{user.name}</strong>.
        </p>
        <div>
          <h2 className="text-xl font-semibold mt-8">User Details</h2>
          <ul className="mt-4">
            <li>
              <strong>Name:</strong> {user.name}
            </li>
            <li>
              <strong>Email:</strong> {user.email}
            </li>
            <li>
              <strong>Username:</strong> {user.preferred_username}
            </li>
            <li>
```

--------------------------------

### Filter Deployments by Project IDs - JSON Array

Source: https://vercel.com/docs/rest-api/reference/endpoints/deployments/list-deployments

Example of the projectIds query parameter as a JSON array. This parameter accepts 1-20 project IDs to filter deployments from multiple projects simultaneously. Cannot be used in conjunction with the projectId parameter.

```json
["prj_123", "prj_456"]
```

--------------------------------

### Clone Catalyst Repository Locally (Bash)

Source: https://vercel.com/docs/integrations/ecommerce/bigcommerce

Clones the forked Catalyst repository from GitHub to your local machine and navigates into its directory. Remember to replace `<YOUR_GITHUB_USERNAME>` and `<YOUR_FORK_NAME>` with your specific details.

```bash
git clone https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_FORK_NAME>.git
cd <YOUR_FORK_NAME>
```

--------------------------------

### Generate Text with AI SDK using API Key (TypeScript)

Source: https://vercel.com/docs/ai-gateway/authentication-and-byok/authentication

This TypeScript example demonstrates how to use the AI SDK's `generateText` function to interact with the Vercel AI Gateway. When the `AI_GATEWAY_API_KEY` environment variable is set, the SDK automatically uses it for authentication.

```typescript
import { generateText } from 'ai';

export async function GET() {
  const result = await generateText({
    model: 'xai/grok-4.1-fast-non-reasoning',
    prompt: 'Why is the sky blue?',
  });
  return Response.json(result);
}
```

--------------------------------

### Initialize Git Repository and Push to Remote

Source: https://vercel.com/docs/integrations/cms/contentful

Initialize a local Git repository, stage all files, create an initial commit, add remote origin, and push to the master branch. This prepares your Next.js project for deployment via Vercel's Git integration.

```shell
git init
git add .
git commit -m "Initial commit"
git remote add origin
git push -u origin master
```

--------------------------------

### Update Installation Request Body - Vercel Marketplace API

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner/update-installation

JSON request body schema for the PATCH /v1/installations/{installationId} endpoint. Contains the partner-provided billing plan ID to update an installation's billing configuration.

```json
{
  "billingPlanId": "string"
}
```

--------------------------------

### GET /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}

Source: https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel/get-invoice

Get Invoice details and status for a given invoice ID. See Billing Events with Webhooks documentation on how to receive invoice events. This endpoint is used to retrieve the invoice details.

```APIDOC
## GET /v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}

### Description
Get Invoice details and status for a given invoice ID. See Billing Events with Webhooks documentation on how to receive invoice events. This endpoint is used to retrieve the invoice details.

### Method
GET

### Endpoint
/v1/installations/{integrationConfigurationId}/billing/invoices/{invoiceId}

### Parameters
#### Path Parameters
- **integrationConfigurationId** (string) - Required -
- **invoiceId** (string) - Required -

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
(None)

### Response
#### Success Response (200)
Content-Type: `application/json`
- **test** (boolean) - Optional - Whether the invoice is in the testmode (no real transaction created).
- **invoiceId** (string) - Required - Vercel Marketplace Invoice ID.
- **externalId** (string) - Optional - Partner-supplied Invoice ID, if applicable.
- **state** (string) - Required - Invoice state.
- **invoiceNumber** (string) - Optional - User-readable invoice number.
- **invoiceDate** (string) - Required - Invoice date. ISO 8601 timestamp.
- **period** (object) - Required -
  - **start** (string) - Required -
  - **end** (string) - Required -
- **paidAt** (string) - Optional - Moment the invoice was paid. ISO 8601 timestamp.
- **refundedAt** (string) - Optional - Most recent moment the invoice was refunded. ISO 8601 timestamp.
- **memo** (string) - Optional - Additional memo for the invoice.
- **items** (array of objects) - Required -
  - **billingPlanId** (string) - Required - Partner's billing plan ID.
  - **resourceId** (string) - Optional - Partner's resource ID. If not specified, indicates installation-wide item.
  - **start** (string) - Optional - Start and end are only needed if different from the period's start/end. ISO 8601 timestamp.
  - **end** (string) - Optional - Start and end are only needed if different from the period's start/end. ISO 8601 timestamp.
  - **name** (string) - Required - Invoice item name.
  - **details** (string) - Optional - Additional item details.
  - **price** (string) - Required - Item price. A dollar-based decimal string.
  - **quantity** (number) - Required - Item quantity.
  - **units** (string) - Required - Units for item's quantity.
  - **total** (string) - Required - Item total. A dollar-based decimal string.
- **discounts** (array of objects) - Optional -
  - **billingPlanId** (string) - Required - Partner's billing plan ID.
  - **resourceId** (string) - Optional - Partner's resource ID. If not specified, indicates installation-wide discount.
  - **start** (string) - Optional - Start and end are only needed if different from the period's start/end. ISO 8601 timestamp.
  - **end** (string) - Optional - Start and end are only needed if different from the period's start/end. ISO 8601 timestamp.
  - **name** (string) - Required - Discount name.
  - **details** (string) - Optional - Additional discount details.
  - **amount** (string) - Required - Discount amount. A dollar-based decimal string.
- **total** (string) - Required - Invoice total amount. A dollar-based decimal string.
- **refundReason** (string) - Optional - The reason for refund. Only applicable for states "refunded" or "refund_request".
- **refundTotal** (string) - Optional - Refund amount. Only applicable for states "refunded" or "refund_request". A dollar-based decimal string.
- **created** (string) - Required - System creation date. ISO 8601 timestamp.
- **updated** (string) - Required - System update date. ISO 8601 timestamp.

#### Response Example
```json
{
  "test": false,
  "invoiceId": "inv_xxxxxxxxxxxxxxxxxxxx",
  "externalId": "ext_inv_12345",
  "state": "paid",
  "invoiceNumber": "INV-2023-001",
  "invoiceDate": "2023-10-26T10:00:00Z",
  "period": {
    "start": "2023-10-01T00:00:00Z",
    "end": "2023-10-31T23:59:59Z"
  },
  "paidAt": "2023-10-26T10:30:00Z",
  "refundedAt": null,
  "memo": "Monthly subscription for October",
  "items": [
    {
      "billingPlanId": "plan_pro",
      "resourceId": "res_project_abc",
      "start": "2023-10-01T00:00:00Z",
      "end": "2023-10-31T23:59:59Z",
      "name": "Pro Plan Subscription",
      "details": "Monthly Pro Plan for project 'My Awesome App'",
      "price": "50.00",
      "quantity": 1,
      "units": "month",
      "total": "50.00"
    }
  ],
  "discounts": [
    {
      "billingPlanId": "plan_pro",
      "resourceId": null,
      "start": null,
      "end": null,
      "name": "Welcome Discount",      "details": "First month 10% off",
      "amount": "5.00"
    }
  ],
  "total": "45.00",
  "refundReason": null,
  "refundTotal": null,
  "created": "2023-10-25T15:00:00Z",
  "updated": "2023-10-26T10:30:00Z"
}
```

#### Error Response (400)
- **description** (string) - One of the provided values in the request query is invalid.

#### Error Response (401)
- **description** (string) - The request is not authorized.

#### Error Response (403)
- **description** (string) - You do not have permission to access this resource.

#### Error Response (404)
- **description** (string) - Success
```

--------------------------------

### POST integration-resource.project-connected

Source: https://vercel.com/docs/webhooks/webhooks-api

Webhook event triggered when a user connects an integration resource to a project. This event provides details about the integration installation, resource, project, and deployment targets involved in the connection.

```APIDOC
## POST integration-resource.project-connected

### Description
Occurs whenever the user connects the integration resource to a project. This webhook event provides comprehensive information about the integration installation, the resource being connected, and the target project.

### Event Type
integration-resource.project-connected

### Payload Fields

#### Configuration
- **payload.configuration.id** (ID) - Required - The ID of the integration installation.

#### Installation
- **payload.installationId** (ID) - Required - The ID of the integration installation (same as `configuration.id`).

#### Resource
- **payload.resourceId** (ID) - Required - The ID of the resource.

#### Project Information
- **payload.project.id** (ID) - Required - The ID of the project.
- **payload.project.name** (String) - Required - The name of the project.
- **payload.projectId** (ID) - Required - The ID of the project (same as project.id).

#### Deployment
- **payload.targets** (List) - Required - The list of the deployment targets.

### Payload Example
{
  "payload": {
    "configuration": {
      "id": "config_123"
    },
    "installationId": "config_123",
    "resourceId": "resource_456",
    "project": {
      "id": "project_789",
      "name": "my-project"
    },
    "projectId": "project_789",
    "targets": ["production", "preview"]
  }
}
```

--------------------------------

### Migrate GitHub Action Trigger from Deployment Status to Repository Dispatch (YAML Diff)

Source: https://vercel.com/docs/git/vercel-for-github

This `diff` illustrates how to migrate a GitHub Actions workflow from using the `deployment_status` event to the more efficient `repository_dispatch` event. It shows changes to the `on` trigger, the `if` condition for job execution, and how to access the deployment URL from `github.event.client_payload.url` instead of `github.event.deployment_status.environment_url`. This migration reduces complexity and cost by triggering workflows only on specific Vercel deployment success events.

```diff
name: End to End Tests

on:
- deployment_status:
+ repository_dispatch:
+   types:
+    - 'vercel.deployment.success'
jobs:
  run-e2es:
-   if: github.event_name == 'deployment_status' && github.event.deployment_status.state == 'success'
+   if: github.event_name == 'repository_dispatch'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: npm ci && npx playwright install --with-deps
      - name: Run tests
        run: npx playwright test
        env:
-         BASE_URL: ${{ github.event.deployment_status.environment_url }}
+         BASE_URL: ${{ github.event.client_payload.url }}
```
