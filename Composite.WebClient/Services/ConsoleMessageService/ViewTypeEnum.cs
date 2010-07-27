using System;

namespace Composite.WebClient.Services.ConsoleMessageService
{
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
        internal static ViewType AsConsoleType( this Composite.ConsoleEventSystem.ViewType internalViewType )
        {
            switch (internalViewType)
            {
                case Composite.ConsoleEventSystem.ViewType.Main:
                    return ViewType.Main;
                case Composite.ConsoleEventSystem.ViewType.ModalDialog:
                    return ViewType.ModalDialog;
                case Composite.ConsoleEventSystem.ViewType.RightTop:
                    return ViewType.RightTop;
                case Composite.ConsoleEventSystem.ViewType.RightBottom:
                    return ViewType.RightBottom;
                case Composite.ConsoleEventSystem.ViewType.BottomLeft:
                    return ViewType.BottomLeft;
                case Composite.ConsoleEventSystem.ViewType.BottomRight:
                    return ViewType.BottomRight;
                default:
                    throw new ArgumentException( "Unknown Composite.ConsoleEventSystem.ViewType " + internalViewType.ToString() );
            }
        }
    }
}
