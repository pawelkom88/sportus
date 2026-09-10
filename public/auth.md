# Sportuś auth.md

Welcome to the AI Agent Authentication and Registration Guide for Sportuś (`sportus.com.pl`).

This document provides both a machine-readable contract and step-by-step instructions for autonomous AI agents, personal assistants, and automated clients to register, obtain credentials, and interact with Sportuś resources and APIs.

---

## 1. Audience

This interface is intended for:
- Autonomous AI agents seeking sports schedules, swimming lessons, gymnastics, and class information on behalf of parents or students.
- Search, calendar, and booking assistant agents operating in Gdańsk and surrounding regions.
- Automated indexing systems conforming to agent discovery standards.

---

## 2. Discovery Metadata

Sportuś publishes RFC-standardized discovery documents:

- **OAuth Protected Resource Metadata (RFC 9728)**: [`/.well-known/oauth-protected-resource`](https://sportus.com.pl/.well-known/oauth-protected-resource)
- **OAuth Authorization Server Metadata (RFC 8414)**: [`/.well-known/oauth-authorization-server`](https://sportus.com.pl/.well-known/oauth-authorization-server)
- **OpenID Connect Configuration**: [`/.well-known/openid-configuration`](https://sportus.com.pl/.well-known/openid-configuration)
- **API Catalog (RFC 9727)**: [`/.well-known/api-catalog`](https://sportus.com.pl/.well-known/api-catalog)
- **Agent Resource Discovery (ARD)**: [`/.well-known/ai-catalog.json`](https://sportus.com.pl/.well-known/ai-catalog.json)

---

## 3. Endpoints Summary

- **Registration URI**: `https://sportus.com.pl/agent/register`
- **Identity Endpoint**: `https://sportus.com.pl/agent/register`
- **Claim URI / Endpoint**: `https://sportus.com.pl/agent/claim`
- **Token Endpoint**: `https://sportus.com.pl/oauth/token`
- **Revocation URI**: `https://sportus.com.pl/oauth/revoke`
- **Agent Skill Manifest**: `https://sportus.com.pl/auth.md`

---

## 4. Step-by-Step Registration Flow

Follow these steps in order to register and obtain credentials:

### Step 1: Discover
Fetch `/.well-known/oauth-protected-resource` or inspect the `WWW-Authenticate` header returned on any 401 response to obtain the authorization server location and supported scopes.

### Step 2: Choose Registration Method

Select one of the following methods supported by Sportuś:

1. **Identity Assertion (ID-JAG)** (Recommended for user-delegated agents):
   - **Assertion Type**: `urn:ietf:params:oauth:token-type:id-jag`
   - **Credential Type**: `bearer`
   - Your agent IdP mints an identity assertion with `aud = "https://sportus.com.pl"`.
   - Submit assertion to `POST https://sportus.com.pl/agent/register`.

2. **Verified Email**:
   - **Assertion Type**: `verified_email`
   - **Credential Type**: `bearer`
   - Submit user's verified email to `POST https://sportus.com.pl/agent/register` and complete confirmation at `https://sportus.com.pl/agent/claim`.

3. **Anonymous Agent**:
   - **Credential Types**: `bearer`, `api_key`
   - Call `POST https://sportus.com.pl/agent/register` without user assertion to obtain a scoped client credential. User can claim ownership later via `https://sportus.com.pl/agent/claim`.

### Step 3: Register or Claim
Send a registration request to the `register_uri`:
```http
POST /agent/register HTTP/1.1
Host: sportus.com.pl
Content-Type: application/json

{
  "client_name": "FamilyAssistantBot",
  "identity_type": "anonymous",
  "requested_scopes": ["read:classes", "read:schedule"]
}
```

### Step 4: Token Exchange & API Access
Exchange your issued assertion or client credentials at `https://sportus.com.pl/oauth/token` for a Bearer access token:
```http
POST /oauth/token HTTP/1.1
Host: sportus.com.pl
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials&scope=read:classes%20read:schedule
```

Send the received Bearer token in the HTTP `Authorization` header on all API calls:
```http
GET /api/classes HTTP/1.1
Host: sportus.com.pl
Authorization: Bearer <access_token>
```

### Step 5: Revocation
To revoke an issued token or session, make a POST request to `https://sportus.com.pl/oauth/revoke`:
```http
POST /oauth/revoke HTTP/1.1
Host: sportus.com.pl
Content-Type: application/x-www-form-urlencoded

token=<access_token>&token_type_hint=access_token
```
Revocation events are emitted via `https://schemas.openid.net/secevent/oauth/event-type/token-revocation`.

---

## 5. Supported Scopes

- `read:classes`: Browse sports activities, descriptions, age brackets, and locations in Gdańsk.
- `read:schedule`: Query class schedules, hours, and trainer information.
- `read:news`: Read announcements and news articles.
- `write:inquiry`: Submit enrollment inquiries and contact messages.
