# Security Specification for Barom Learn

## Data Invariants
1. A user document must have a `uid` that matches the document ID.
2. Users can only read and write their own profile document.
3. The `email` field must match the authenticated user's email.
4. `xp`, `streak`, and `completedLessons` must be non-negative.
5. Users cannot modify other users' data.

## The Dirty Dozen Payloads
1. **Identity Spoofing**: Attempt to create a user doc for a different UID.
2. **Email Hijacking**: Attempt to set an email that doesn't match the auth token.
3. **Ghost Field Injection**: Adding `isAdmin: true` to a profile.
4. **XP Inflation**: Sending a negative XP or a 1GB string as XP.
5. **PII Leak**: Authenticated user trying to 'get' another user's profile.
6. **Anonymous Write**: Attempting to write without authentication.
7. **Unverified Email Access**: Attempting to write with an unverified email (if required).
8. **Field Deletion**: Attempting to delete the `stats` object during an update.
9. **Role Escalation**: Attempting to change `skillLevel` to 'GodMode'.
10. **Orphaned Achievement**: Adding an achievement with an invalid ID.
11. **Bulk Scrape**: Attempting to `list` the `/users` collection without filters.
12. **Document Poisoning**: Using a 2KB string as a document ID.

## Test Strategy
The `firestore.rules` will be verified against these payloads using local tests (if possible) or rigorous logic checks in the rules themselves.
