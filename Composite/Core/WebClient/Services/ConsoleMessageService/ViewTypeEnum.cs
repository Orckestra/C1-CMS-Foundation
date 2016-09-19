using System;

namespace Composite.Core.WebClient.Services.ConsoleMessageService
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public enum ViewType
    {
        /// <exclude />
        External = 6,

        /// <exclude />
        Main = 0,

        /// <exclude />
        ModalDialog = 1,

        /// <exclude />
        RightTop = 2,

        /// <exclude />
        RightBottom = 3,

        /// <exclude />
        BottomLeft = 4,

        /// <exclude />
        BottomRight = 5
    }

    internal static class InternalViewTypeConvertExtensions
    {
        internal static ViewType AsConsoleType( this Composite.C1Console.Events.ViewType internalViewType )
        {
            switch (internalViewType)
            {
                case Composite.C1Console.Events.ViewType.External:
                    return ViewType.External;
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
