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
      super('MainMenu')
  }

  init()
  {
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
    // Add background
    this.cameras.main.setBackgroundColor('#263238');

    this.logo = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 150,
      'game_logo'
    ); 

    // Add title
    this.title = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 250,
      'Dantes adv',
      {
        fontSize: '48px',
        color: '#ffffff',
        fontFamily: 'Arial',
      }
    ).setOrigin(0.5, 0.5);

    // Create button container
    this.buttonContainer = this.add.container(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 50
    );
    
    const buttonStyle = {
      font: '18px Arial',
      fill: '#fff',
      align: 'center'
    };
    
    const buttonPadding = 10;
    const buttonWidth = 120;
    const buttonHeight = 50; 
    const buttonSpacing = 20;
    
    // Calculate starting Y position for buttons to be under the logo
    const startY = 0; 
    
    // Singleplayer Button
    const singleplayerButton = this.add.text(0, startY, 'Singleplayer', buttonStyle);
    singleplayerButton.setFixedSize(buttonWidth + buttonPadding * 2, buttonHeight + buttonPadding * 2); 
    singleplayerButton.setOrigin(0.5);
    singleplayerButton.setInteractive().on('pointerdown', this.onSingleplayerClick.bind(this));
    
    // Multiplayer Button 
    const multiplayerButton = this.add.text(0, startY + (buttonHeight + buttonSpacing), 'Multiplayer', buttonStyle);
    multiplayerButton.setFixedSize(buttonWidth + buttonPadding * 2, buttonHeight + buttonPadding * 2); 
    multiplayerButton.setOrigin(0.5);
    multiplayerButton.setInteractive().on('pointerdown', this.onMultiplayerClick.bind(this));
    
    // Settings Button 
    const settingsButton = this.add.text(0, startY + 2 * (buttonHeight + buttonSpacing), 'Settings', buttonStyle);
    settingsButton.setFixedSize(buttonWidth + buttonPadding * 2, buttonHeight + buttonPadding * 2); 
    settingsButton.setOrigin(0.5);
    settingsButton.setInteractive().on('pointerdown', this.onSettingsClick.bind(this));

    // Add buttons to container
    this.buttonContainer.add([singleplayerButton, multiplayerButton, settingsButton]);

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