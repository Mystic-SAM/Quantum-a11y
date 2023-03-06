class MenuButtonLinks {
    domNode: HTMLDivElement;
    buttonNode: HTMLButtonElement;
    menuNode: HTMLDivElement;
    menuitemNodes: HTMLDivElement[];
    firstMenuitem: HTMLDivElement;
    lastMenuitem: HTMLDivElement;
    firstChars: string[];
    isNotification: boolean = false;
    isAnnouncement: boolean = false;
    
    constructor(domNode) {
      this.domNode = domNode;
      this.buttonNode = domNode.querySelector("button");
      this.menuNode = domNode.querySelector('[role="menu"]');
      this.menuitemNodes = [];
      this.firstMenuitem = undefined;
      this.lastMenuitem = undefined;
      this.firstChars = [];
  
      this.buttonNode.addEventListener(
        "keydown",
        this.onButtonKeydown.bind(this)
      );
      this.buttonNode.addEventListener("click", this.onButtonClick.bind(this));
      this.buttonNode.addEventListener("mouseenter",this.openPopup.bind(this));   
      this.buttonNode.addEventListener("mouseleave",this.closePopup.bind(this));   
        
      
      var nodes: HTMLDivElement[] = domNode.querySelectorAll('[role="menuitem"]');
      for (let i = 0; i < nodes.length; i++) {
        var menuitem: HTMLDivElement = nodes[i];
        this.menuitemNodes.push(menuitem);
        menuitem.setAttribute("tabIndex", "-1"); 
        this.firstChars.push(menuitem.textContent.trim()[0].toLowerCase());
  
        menuitem.addEventListener("keydown", this.onMenuitemKeydown.bind(this));
  
        menuitem.addEventListener(
          "mouseover",
          this.onMenuitemMouseover.bind(this)
        );
  
        if (!this.firstMenuitem) {
          this.firstMenuitem = menuitem;
        }
        this.lastMenuitem = menuitem;
      }
  
      // domNode.addEventListener("focusin", this.onFocusin.bind(this));
      // domNode.addEventListener("focusout", this.onFocusout.bind(this));
  
  
      window.addEventListener(
        "mousedown",
        this.onBackgroundMousedown.bind(this),
        true
      );
  
      if (domNode.classList.contains("notification-menu")) {
        this.isNotification = true;
      }else if(domNode.classList.contains("announcement-menu")){
        this.isAnnouncement = true;
      }

    }
  
    setFocusToMenuitem(newMenuitem: HTMLDivElement):void {
      this.menuitemNodes.forEach( (item: HTMLDivElement):void => {
        if (item === newMenuitem) {
          item.tabIndex = 0;
          newMenuitem.focus();
        } else {
          item.tabIndex = -1;
        }
      });
    }
  
    setFocusToFirstMenuitem():void {
      this.setFocusToMenuitem(this.firstMenuitem);
    }
  
    setFocusToLastMenuitem():void {
      this.setFocusToMenuitem(this.lastMenuitem);
    }
  
    setFocusToPreviousMenuitem(currentMenuitem: HTMLDivElement):HTMLDivElement {
      var newMenuitem, index;
  
      if (currentMenuitem === this.firstMenuitem) {
        newMenuitem = this.lastMenuitem;
      } else {
        index = this.menuitemNodes.indexOf(currentMenuitem);
        newMenuitem = this.menuitemNodes[index - 1];
      }
  
      this.setFocusToMenuitem(newMenuitem);
  
      return newMenuitem;
    }
  
    setFocusToNextMenuitem(currentMenuitem: HTMLDivElement): HTMLDivElement {
      var newMenuitem, index;
  
      if (currentMenuitem === this.lastMenuitem) {
        newMenuitem = this.firstMenuitem;
      } else {
        index = this.menuitemNodes.indexOf(currentMenuitem);
        newMenuitem = this.menuitemNodes[index + 1];
      }
      this.setFocusToMenuitem(newMenuitem);
  
      return newMenuitem;
    }
  
    setFocusByFirstCharacter(currentMenuitem: HTMLDivElement, char: string):void {
      var start, index;
  
      if (char.length > 1) {
        return;
      }
  
      char = char.toLowerCase();
  
      // Get start index for search based on position of currentItem
      start = this.menuitemNodes.indexOf(currentMenuitem) + 1;
      if (start >= this.menuitemNodes.length) {
        start = 0;
      }
  
      // Check remaining slots in the menu
      index = this.firstChars.indexOf(char, start);
  
      // If not found in remaining slots, check from beginning
      if (index === -1) {
        index = this.firstChars.indexOf(char, 0);
      }
  
      // If match was found...
      if (index > -1) {
        this.setFocusToMenuitem(this.menuitemNodes[index]);
      }
    }
  
    // Popup menu methods
  
    openPopup(): void {
      if (this.isNotification) {
        notificationShow();
      }else if(this.isAnnouncement){
        announcementShow();
      }
      this.menuNode.style.display = "block";
      this.buttonNode.setAttribute("aria-expanded", "true");
    }
  
    closePopup(): void {
      if (this.isOpen()) {
        if (this.isNotification) {
          notificationHideCaller();
        }else if(this.isAnnouncement){
          announcementHideCaller();
        }
        this.buttonNode.removeAttribute("aria-expanded");
        // this.menuNode.style.display = "none";
      }
    }
  
    isOpen(): boolean {
      return this.buttonNode.getAttribute("aria-expanded") === "true";
    }

    onButtonKeydown(event): void {
      var key = event.key,
        flag = false;
  
      switch (key) {
        case " ":
        case "Enter":
        case "ArrowDown":
        case "Down":
          this.openPopup();
          this.setFocusToFirstMenuitem();
          flag = true;
          break;
  
        case "Esc":
        case "Escape":
          this.closePopup();
          this.buttonNode.focus();
          flag = true;
          break;
  
        case "Up":
        case "ArrowUp":
          this.openPopup();
          this.setFocusToLastMenuitem();
          flag = true;
          break;
  
        default:
          break;
      }
  
      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  
    onButtonClick(event) {
      if (this.isOpen()) {
        this.closePopup();
        this.buttonNode.focus();
      } else {
        this.openPopup();
        this.setFocusToFirstMenuitem();
      }
  
      event.stopPropagation();
      event.preventDefault();
    }
  
    onMenuitemKeydown(event): void {
      var tgt = event.currentTarget,
        key = event.key,
        flag = false;
  
      function isPrintableCharacter(str) {
        return str.length === 1 && str.match(/\S/);
      }
  
      if (event.ctrlKey || event.altKey || event.metaKey) {
        return;
      }
  
      if (event.shiftKey) {
        if (isPrintableCharacter(key)) {
          this.setFocusByFirstCharacter(tgt, key);
          flag = true;
        }
  
        if (event.key === "Tab") {
          this.buttonNode.focus();
          this.closePopup();
          flag = true;
        }
      } else {
        switch (key) {
          case " ":
            window.location.href = tgt.href;
            break;
  
          case "Esc":
          case "Escape":
            this.closePopup();
            this.buttonNode.focus();
            flag = true;
            break;
  
          case "Up":
          case "ArrowUp":
            this.setFocusToPreviousMenuitem(tgt);
            flag = true;
            break;
  
          case "ArrowDown":
          case "Down":
            this.setFocusToNextMenuitem(tgt);
            flag = true;
            break;
  
          case "Home":
          case "PageUp":
            this.setFocusToFirstMenuitem();
            flag = true;
            break;
  
          case "End":
          case "PageDown":
            this.setFocusToLastMenuitem();
            flag = true;
            break;
  
          // case "Tab":
          //   this.closePopup();
          //   break;
  
          default:
            if (isPrintableCharacter(key)) {
              this.setFocusByFirstCharacter(tgt, key);
              flag = true;
            }
            break;
        }
      }
  
      if (flag) {
        event.stopPropagation();
        event.preventDefault();
      }
    }
  
    onMenuitemMouseover(event): void {
      let tgt = event.currentTarget;
      tgt.focus();
    }
  
    onBackgroundMousedown(event): void {
      if (!this.domNode.contains(event.target)) {
        if (this.isOpen()) {
          this.closePopup();
          this.buttonNode.focus();
        }
      }
    }

  }