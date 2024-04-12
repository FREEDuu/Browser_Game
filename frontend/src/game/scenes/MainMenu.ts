import { GameObjects, Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;

  // Button containers
  buttonContainer: GameObjects.Container;
  singleplayerButton: GameObjects.Text;
  multiplayerButton: GameObjects.Text;
  myHeroesButton: GameObjects.Text;
  settingsButton: GameObjects.Text;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  constructor()
  {
      super('main-menu')
  }

  init()
  {
      this.cursors = this.input.keyboard!.createCursorKeys()
  }

  preload()
  {
      this.load.image('glass-panel', 'assets/glassPanel.png')
      this.load.image('cursor-hand', 'assets/cursor_hand.png')
  }

  selectButton(index: number)
  {
      // TODO
  }

  selectNextButton(change = 1)
  {
      // TODO
  }

  confirmSelection()
  {
      // TODO
  }

  update() 
  {
    const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up!)
    const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down!)
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space!)

    if (upJustPressed)
		{
			this.selectNextButton(-1)
		}
		else if (downJustPressed)
		{
			this.selectNextButton(1)
		}
		else if (spaceJustPressed)
		{
			this.confirmSelection()
		}
  }

  async create() {
    // Add background
    this.background = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'menu_background'
    );

    // Add logo image
    this.logo = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 100,
      'game_logo'
    );

    // Add title
    this.title = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY + 50,
      'Dantes adv',
      {
        fontSize: 48,
        color: '#ffffff',
      }
    );

    // Create button container
    this.buttonContainer = this.add.container(
      this.cameras.main.centerX,
      // place button container below the title (adjust as needed)
      this.cameras.main.centerY + 150
    );

	const { width, height } = this.scale

	const singleplayerButton = this.add.image(width * 0.5, height * 0.6, 'glass-panel').setDisplaySize(150, 50)
	this.add.text(singleplayerButton.x, singleplayerButton.y, 'Singleplayer').setOrigin(0.5)

    const multiplayerButton = this.add.image(width * 0.5, height * 0.6, 'glass-panel').setDisplaySize(150, 50)
	this.add.text(multiplayerButton.x, multiplayerButton.y, 'Multiplayer').setOrigin(0.5)

    const settingsButton  = this.add.image(width * 0.5, height * 0.6, 'glass-panel').setDisplaySize(150, 50)
	this.add.text(settingsButton .x, settingsButton .y, 'Singleplayer').setOrigin(0.5)

    const singlePlayerButton = this.add.image(width * 0.5, height * 0.6, 'glass-panel').setDisplaySize(150, 50)
	this.add.text(singlePlayerButton.x, singlePlayerButton.y, 'Singleplayer').setOrigin(0.5)


    EventBus.emit('current-scene-ready', this);
  }
  

  onSingleplayerClick() {
    console.log('Singleplayer button clicked');
  }

  onMultiplayerClick() {
    console.log('Multiplayer button clicked');
  }

  onMyHeroesClick() {
    console.log('My Heroes button clicked');
  }

  onSettingsClick() {
    console.log('Settings button clicked');
  }

  changeScene ()
  {
      this.scene.start('Game');
  }
}
