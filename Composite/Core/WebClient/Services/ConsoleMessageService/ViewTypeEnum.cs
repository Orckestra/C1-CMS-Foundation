using System;

namespace Composite.Core.WebClient.Services.ConsoleMessageService
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum ViewType
    {
        Main,
        ModalDialog,
        RightTop,
        RightBottom,
        BottomLeft,
        BottomRight
    }

    internal static class InternalViewTypeConvertExtensions
    {
        internal static ViewType AsConsoleType( this Composite.C1Console.Events.ViewType internalViewType )
        {
            switch (internalViewType)
            {
                case Composite.C1Console.Events.ViewType.Main:
                    return ViewType.Main;
                case Composite.C1Console.Events.ViewType.ModalDialog:
                    return ViewType.ModalDialog;
                case Composite.C1Console.Events.ViewType.RightTop:
                    return ViewType.RightTop;
                case Composite.C1Console.Events.ViewType.RightBottom:
                    return ViewType.RightBottom;
                case Composite.C1Console.Events.ViewType.BottomLeft:
                    return ViewType.BottomLeft;
                case Composite.C1Console.Events.ViewType.BottomRight:
                    return ViewType.BottomRight;
                default:
                    throw new ArgumentException( "Unknown Composite.C1Console.Events.ViewType " + internalViewType.ToString() );
            }
        }
    }
}
