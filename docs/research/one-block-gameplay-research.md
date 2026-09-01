# One-block sky survival research

## Scope

This note studies the reusable game loop behind Minecraft's one-block map genre so EduGames can build an original browser game. It does not reproduce or redistribute a Minecraft map, resource pack, texture, name treatment or creator-authored phase data.

## Primary findings

- The original OneBlock description starts the player on one block suspended in a void. Mining it immediately creates another block, so the same world position is both the resource source and the player's first foothold.
- The regenerating block produces weighted resources rather than a flat random list. The weights and available resources change as themed phases advance.
- Progress is readable: mining fills a phase, the block pauses/upgrades, and a new resource family becomes available.
- Chests, rare items, passive creatures and danger events interrupt the repeated mining action. Their purpose is surprise and pacing rather than replacing the core loop.
- Collected blocks are useful because the player must build a safer, larger island. Falling is a natural risk, and returning to the growing island keeps failure recoverable.
- The original map documents ten main phases followed by an open-ended mixed after-phase. Its creator also says modified copies may not be redistributed, so EduGames must implement only the abstract loop with original content.

Sources:

- [IJAMinecraft: OneBlock](https://ijaminecraft.com/map/oneblock/)
- [Minecraft: OneBlock is a popular map genre](https://www.minecraft.net/en-us/article/lets-play-oneblock-luckyblock)
- [CurseForge: current Oneblock project listing and licence](https://www.curseforge.com/minecraft/worlds/oneblock)

## EduGames adaptation

### Core loop

1. Stand on the renewable Knowledge Block.
2. Mine it to collect its current voxel; it regenerates instantly.
3. Use collected voxels to expand a personal sky island.
4. Reach the phase mining target.
5. Solve one Year 3–5 English, maths or science challenge to upgrade the block.
6. Unlock the next original resource theme and repeat.

### Learning loop

- A run uses ten non-repeating questions: two questions from every in-year Level 1–5.
- Every question retains its curriculum objective, detailed Learn explanation, three worked steps, a worked example, a self-check and a separate Hint.
- Two answer blocks keep the decision fast enough for an action game. Spelling records use one plausible same-length error rather than exposing the target in an instruction.
- A wrong choice does not remove blocks or reset the island. It keeps the phase gate closed and offers learner-controlled support.
- A correct choice grants a small resource cache and upgrades the renewable block. The reward is useful in the sandbox rather than a detached score.

### Original progression

EduGames uses ten new phase names and original weighted resource tables: Seedling Sky, Stone Workshop, Frost Lab, River Cloud, Canopy Camp, Sunstone Mesa, Ember Works, Bloom Haven, Star Ruins and Aurora Summit. Completing all ten opens an unlimited Afterglow mix and a fresh non-repeating curriculum expedition.

## Mobile and performance requirements

- The canvas owns the viewport; menus and teaching panels are bounded overlays.
- Analogue movement, Mine, Place and Jump use independent pointers.
- The question gate pauses movement so reading does not compete with survival.
- The HUD must leave the renewable block and crosshair visible at 320 × 568 and 390 × 844.
- The world stores only player-placed edits and inventory. A small island should use individual voxel meshes; repeated clouds and particles should be instanced or pooled.
- Falling below the island returns the learner to the renewable block without losing educational progress.
