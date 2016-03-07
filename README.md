# UC Affect Study

code based on <https://github.com/coryhouse/react-slingshot>


## Firebase Security Rules

Prevent users from accidentally overwriting another user's data. Only admins can read the data back.

```
{
  "rules": {

    ".read": false,
    ".write": true,

    "affectstudy": {
      "$env": {
        "$userid": {
          ".write": "!data.exists()"
        }
      }
    }
  }
}
```
