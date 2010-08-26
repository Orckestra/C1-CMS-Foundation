using System;
using Composite.Core.Extensions;


namespace Composite
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class Verify
	{
        /// <summary>
        /// Asserts that argument value is not null
        /// </summary>
        /// <param name="value">The argument's value.</param>
        /// <param name="paramName">The parameter's name.</param>
        /// <exception cref="ArgumentNullException"></exception>
        public static void ArgumentNotNull(object value, string paramName)
        {
            if(value == null)
            {                
               ThrowArgumentNullException(paramName);                
            }
        }

        /// <summary>
        /// Asserts that argument value is not null or emptry
        /// </summary>
        /// <param name="value">The argument's value.</param>
        /// <param name="paramName">The parameter's name.</param>
        /// <exception cref="ArgumentNullException"></exception>
        /// <exception cref="ArgumentException"></exception>
        public static void ArgumentNotNullOrEmpty(string value, string paramName)
        {
            if (string.IsNullOrEmpty(value))
            {
                if(value == null) {
                    ThrowArgumentNullException(paramName);
                }
                ThrowArgumentException("Value cannot be String.Empty", paramName);
            }
        }

        /// <summary>
        /// Checks a condition.
        /// </summary>
        /// <param name="condition">A condition to check.</param>
        /// <param name="paramName">Parameter name.</param>
        /// <param name="message">The message.</param>
        /// <exception cref="ArgumentException"></exception>
	    public static void ArgumentCondition(bool condition, string paramName, string message)
	    {
	        if(!condition)
	        {
                ThrowArgumentException(message, paramName);
	        }
        }

        /// <summary>
        /// If condition isn't true, throws an <see cref="InvalidOperationException"/> exception.
        /// </summary>
        /// <param name="condition"></param>
        /// <param name="message"></param>
        /// <exception cref="InvalidOperationException"></exception>
        public static void IsTrue(bool condition, string message)
        {
            if(!condition)
            {
                ThrowInvalidOperationException(message);
            }
        }

		/// <summary>
		/// If condition is true, throws an <see cref="InvalidOperationException"/> exception.
		/// </summary>
		/// <param name="condition"></param>
		/// <param name="message"></param>
		/// <exception cref="InvalidOperationException"></exception>
		public static void IsFalse(bool condition, string message)
		{
			if (condition)
			{
				ThrowInvalidOperationException(message);
			}
		}

        /// <summary>
        /// If condition isn't true, throws an <see cref="InvalidOperationException"/> exception.
        /// </summary>
        /// <param name="condition"></param>
        /// <param name="message"></param>
        /// <param name="formatArgs">Parameters for string.Format method.</param> 
        /// <exception cref="InvalidOperationException"></exception>

        public static void That(bool condition, string message, params object[] formatArgs)
        {
            if (!condition)
            {
                ThrowInvalidOperationException(string.Format(message, formatArgs));
            }
        }

        /// <summary>
        /// Checks that the value is null.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="message">The message to be an exception desctiption.</param>
        /// <exception cref="InvalidOperationException"></exception>
        public static void IsNull(object value, string message)
        {
            if(value != null)
                ThrowInvalidOperationException(message);
        }
        /// <summary>
        /// Checks that the value is not null.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="message">The message to be an exception desctiption.</param>
        /// <exception cref="InvalidOperationException"></exception>
        public static void IsNotNull(object value, string message)
        {
            if(value == null)
                ThrowInvalidOperationException(message);
        }

        /// <summary>
        /// Checks that the value is not null.
        /// </summary>
        /// <param name="value">The value.</param>
        /// <param name="message">The message to be an exception desctiption.</param>
        /// <param name="formattingArgs">Parameters for string.Format() method.</param>
        /// <exception cref="InvalidOperationException"></exception>
        public static void IsNotNull(object value, string message, params object[] formattingArgs)
        {
            if (value == null)
                ThrowInvalidOperationException(message.FormatWith(formattingArgs));
        }

        #region Exception throwing

        /// <exception cref="InvalidOperationException"></exception>
        public static void ThrowInvalidOperationException(string message)
        {
            throw new InvalidOperationException(message);
        }

        /// <summary>
        /// Throws an "ThrowArgumentNullException" exception.
        /// </summary>
        /// <param name="parameterName">The parameter's name</param>
        /// <exception cref="ArgumentNullException"></exception>
        public static void ThrowArgumentNullException(string parameterName)
        {
            throw new ArgumentNullException(parameterName);
        }

        /// <summary>
        /// Throws an "ThrowArgumentNullException" exception.
        /// </summary>
        /// <param name="parameterName">The parameter's name</param>
        /// <param name="message">The message.</param>
        /// <exception cref="ArgumentNullException"></exception>
        public static void ThrowArgumentException(string message, string parameterName)
        {
            throw new ArgumentException(message, parameterName);
        }

        public static T ResultNotNull<T>(T value) where T: class
        {
            return ResultNotNull<T>(value, "Result value should not be null");
        }

        public static T ResultNotNull<T>(T value, string errorMessageOnNull, params object[] formattingArgs) where T : class
        {
            if (value == null) ThrowInvalidOperationException(errorMessageOnNull.FormatWith(formattingArgs));
            return value;
        }

        public static string StringNotIsNullOrWhiteSpace(string value) 
        {
            return StringNotIsNullOrWhiteSpace(value, "Result string should not be null or empty");
        }

        public static string StringNotIsNullOrWhiteSpace(string value, string errorMessageOnNull, params object[] formattingArgs) 
        {
            if (String.IsNullOrWhiteSpace(value)) ThrowInvalidOperationException(errorMessageOnNull.FormatWith(formattingArgs));
            return value;
        }

        #endregion Exception throwing
    }
}
