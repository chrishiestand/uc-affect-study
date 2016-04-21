# UC Affect Study
Webapp that writes data to firebase. Read the data into spreadsheet form with: <https://github.com/chrishiestand/uc-affect-study-importer>


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

# Thanks
code based on <https://github.com/coryhouse/react-slingshot>

