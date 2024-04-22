<script lang="ts">

    import type { Scene } from "phaser";
    import type { MainMenu } from "../../game/scenes/MainMenu";
    import PhaserGame, { type TPhaserRef } from "../../game/PhaserGame.svelte";

    //  References to the PhaserGame component (game and scene are exposed)
    let phaserRef: TPhaserRef = { game: null, scene: null};

    const changeScene = () => {

        const scene = phaserRef.scene as MainMenu;

        console.log("scene",scene)
        if (scene)
        {
            scene.changeScene();

        }

    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Scene) => {
        console.log("current scene: ", scene)
    }
    
</script>

<div id="app">
    <PhaserGame bind:phaserRef={phaserRef} currentActiveScene={currentScene} />
    <div>
        <div>
            <button class="button" on:click={changeScene}>Change Scene</button>
        </div>
    </div>
</div>

<style>
    #app {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    

    .button {
        width: 140px;
        margin: 10px;
        padding: 10px;
        background-color: #000000;
        color: rgba(255, 255, 255, 0.87);
        border: 1px solid rgba(255, 255, 255, 0.87);
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
            border: 1px solid #0ec3c9;
            color: #0ec3c9;
        }

        &:active {
            background-color: #0ec3c9;
        }

        /* Disabled styles */
        &:disabled {
            cursor: not-allowed;
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: rgba(255, 255, 255, 0.3);
        }
    }
</style>
