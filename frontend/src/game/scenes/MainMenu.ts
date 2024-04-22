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
      console.log("MainMenu constructor finished")
  }

  init()
  {
      console.log("MainMenu init started")
      this.cursors = this.input.keyboard!.createCursorKeys()
  }

  preload()
  {
      //this.load.image('glass-panel', 'assets/glassPanel.png')
      //this.load.image('cursor-hand', 'assets/cursor_hand.png')

      console.log("MainMenu preloaded")
  }

  update() 
  {
    console.log("next tick")
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

  create() {
    console.log("create started")
    // Add background
    this.cameras.main.setBackgroundColor('#263238');

    /*
    this.logo = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 100,
      'game_logo'
    ); */

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
      this.cameras.main.centerY
    );

    const width = 400; 
    const height = 200;
    
    const buttonStyle = {
      font: '20px',
      fill: '#fff',
      align: 'center'
    };
    
    const buttonPadding = 10; 
    
    // Singleplayer Button
    const singleplayerButton = this.add.text(width * 0.5, height * 0.6, 'Singleplayer', buttonStyle);
    singleplayerButton.setDisplaySize(150 + buttonPadding * 2, 50 + buttonPadding * 2); 
    singleplayerButton.setOrigin(0.5);
    
    // Multiplayer Button 
    const multiplayerButton = this.add.text(width * 0.5, height * 0.7, 'Multiplayer', buttonStyle);
    multiplayerButton.setDisplaySize(150 + buttonPadding * 2, 50 + buttonPadding * 2); 
    multiplayerButton.setOrigin(0.5);
    multiplayerButton.on
    
    // Settings Button 
    const settingsButton = this.add.text(width * 0.5, height * 0.8, 'Settings', buttonStyle);
    settingsButton.setDisplaySize(150 + buttonPadding * 2, 50 + buttonPadding * 2); 
    settingsButton.setOrigin(0.5);
    EventBus.emit('current-scene-ready', this);
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
      console.log("changescene")
      this.scene.start('Game');
  }
}
