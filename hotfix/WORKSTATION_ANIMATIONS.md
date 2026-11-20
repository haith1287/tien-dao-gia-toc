# Workstation Animation Prototype

This is an **isolated work-at-station renderer prototype**, not a deployed game modification.

- 6 named occupations are mapped, with prototype sprites for smithing (3 poses), mining, herb collection, and alchemy.
- Characters are anchored to one station; no arbitrary walking.
- The module does not alter worker assignments, game-state or save formats.
- The primary game is currently distributed as a binary `game-h5.zip` on the main branch, so this module is **not yet wired into the actual game**.
- PNG proof-of-concept image assets and a standalone browser preview are available separately as `TDGT_HoatCanh_Prototype_v01.zip` in the conversation.

After extracting the actual game source, add script load after scene initialization, install sprites at `assets/workstation/`, and call `TDGT_Workstations.mount(node, 'khi_phuong')` from existing worker assignment/rendering code. Call returned disposer upon scene removal to avoid stale animations. Maintain each character's assigned hair/eye/robe appearance in the final assets.

This code is intentionally proposed via pull request instead of overwriting `main`.
