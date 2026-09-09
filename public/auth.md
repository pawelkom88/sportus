# Sportuś auth.md

Welcome to the AI Agent Authentication and Registration Guide for Sportuś (`sportus.com.pl`).

This document describes how autonomous AI agents, personal assistants, and automated clients can register, authenticate, and interact with Sportuś resources and APIs.

## Discovery Metadata

Sportuś publishes RFC-standardized discovery documents:

- **OAuth Protected Resource Metadata (RFC 9728)**: [`/.well-known/oauth-protected-resource`](/.well-known/oauth-protected-resource)
- **OAuth Authorization Server Metadata (RFC 8414)**: [`/.well-known/oauth-authorization-server`](/.well-known/oauth-authorization-server)
- **OpenID Connect Configuration**: [`/.well-known/openid-configuration`](/.well-known/openid-configuration)
- **API Catalog (RFC 9727)**: [`/.well-known/api-catalog`](/.well-known/api-catalog)
- **Agent Resource Discovery (ARD)**: [`/.well-known/ai-catalog.json`](/.well-known/ai-catalog.json)

## Audience

This interface is intended for:
- AI agents seeking sports schedules and class information on behalf of parents or students.
- Search and booking assistant agents operating in Gdańsk and surrounding regions.
- Automated indexing systems conforming to agent discovery standards.

## Registration Endpoints

Agents can register dynamically or request access credentials:

- **Registration URI**: `https://sportus.com.pl/agent/register`
- **Claim URI**: `https://sportus.com.pl/agent/claim`
- **Revocation URI**: `https://sportus.com.pl/oauth/revoke`
- **Agent Skill**: `https://sportus.com.pl/.well-known/agent-skills/sports-classes/SKILL.md`

## Supported Identity & Credential Types

### 1. Identity Assertion (ID-JAG)
- **Assertion Type**: `urn:ietf:params:oauth:token-type:id-jag`
- **Credential Type**: `bearer`
- **Revocation**: Supported via `https://sportus.com.pl/oauth/revoke` with event `https://schemas.openid.net/secevent/oauth/event-type/token-revocation`

### 2. Verified Email
- **Assertion Type**: `verified_email`
- **Credential Type**: `bearer`
- **Claim URI**: `https://sportus.com.pl/agent/claim`

### 3. Anonymous
- **Credential Types**: `bearer`, `api_key`
- **Claim URI**: `https://sportus.com.pl/agent/claim`

## Scopes Supported

- `read:classes`: Read sports programs, age criteria, and course descriptions.
- `read:schedule`: Query weekly schedule and training locations in Gdańsk.
- `read:news`: Fetch news and updates.
- `write:inquiry`: Submit enrollment contact forms and inquiries on behalf of users.

## Bearer Methods

- **Header**: Requests must send access credentials via HTTP Authorization header:
  ```http
  Authorization: Bearer <token>
  ```
