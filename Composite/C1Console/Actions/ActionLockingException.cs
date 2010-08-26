using System;


namespace Composite.C1Console.Actions
{
    internal sealed class ActionLockingException : Exception
	{
        public ActionLockingException(string message)
            : base(message)
        {
        }
	}
}
