/**
 * This class is never instantiated, we just need to borrow it's methods for other 
 * classes (as if this class belonged in the inheritance chain of these classes).
 * This hack is very javascriptish, but it helps us not to copypaste some code.
 * @see {StageDeckBinding}
 * @see {StageBinding}
 */
function StageBoxHandlerAbstraction () {

	/**
	 * @type {boolean}
	 */
	this.isSubPanelMaximized = false;
}

/**
 * Registering listeners for maximization and unmaximization of panels.
 */
StageBoxHandlerAbstraction.onBindingRegister = function () {

	this.addActionListener ( ControlBoxBinding.ACTION_MAXIMIZE, this );
	this.addActionListener ( ControlBoxBinding.ACTION_NORMALIZE, this );
	this.addActionListener ( StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED, this );
	this.addActionListener ( StageSplitPanelBinding.ACTION_LAYOUTUPDATE, this );
}

/**
 * @param {Action} action
 */
StageBoxHandlerAbstraction.handleAction = function ( action ) {
	
	var binding = action.target;
	
	switch ( action.type ) {
		case ControlBoxBinding.ACTION_MAXIMIZE :
		case ControlBoxBinding.ACTION_NORMALIZE :
			if ( binding instanceof StageSplitPanelBinding ) {
				StageBoxHandlerAbstraction.handleControlBoxAction.call ( this, action );
				action.consume ();
			}
			break;
		
		case StageBoxAbstraction.ACTION_HIDDENSTUFF_UPDATED :
			if ( this.isSubPanelMaximized ) {
				/*
				var filter = StageBoxHandlerAbstraction.unMaximizeFilter;
				*/
				this.iterateContainedStageBoxBindings ( StageCrawler.MODE_UNMAXIMIZE );
				this.isSubPanelMaximized = false;
			}
			action.consume ();
			break;
		
		/*
		 * see {StageBinding#handleAction}
		 */
		case StageSplitPanelBinding.ACTION_LAYOUTUPDATE :
		 	break;
	}
}

/**
 * Handle {@link ControlBoxBinding} actions.
 * @param {Action} action
 * @return {function}
 */
StageBoxHandlerAbstraction.handleControlBoxAction = function ( action ) {
	
	var mode = null;
	
	switch ( action.type ) {
		case ControlBoxBinding.ACTION_MAXIMIZE :
			if ( !this.isSubPanelMaximized ) {
				mode = StageCrawler.MODE_MAXIMIZE;
				this.isSubPanelMaximized = true;
			}
			break;
		case ControlBoxBinding.ACTION_NORMALIZE :
			if ( this.isSubPanelMaximized ) {
				mode = StageCrawler.MODE_UNMAXIMIZE;
				this.isSubPanelMaximized = false;
			}
			break;
	}
	if ( mode != null ) {
		this.iterateContainedStageBoxBindings ( mode );
	}
}