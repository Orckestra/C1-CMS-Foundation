using System;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;
using Composite.Data;
using Composite.Data.Types;
using Composite.Logging;
using Composite.Security.Cryptography;
using Composite.Security.Plugins.LoginProvider;
using Composite.Transactions;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.StandardPlugins.Security.LoginProviderPlugins.DataBasedFormLoginProvider
{
    [ConfigurationElementType(typeof(DataBasedFormLoginProviderData))]
    internal sealed class DataBasedFormLoginProvider : IFormLoginProvider
	{
        public IEnumerable<string> AllUsernames
        {
            get 
            {
                return
                (from u in DataFacade.GetData<IUser>()
                 select u.Username).ToList();
            }
        }



        public bool CanSetUserPassword
        {
            get { return true; }
        }



        public bool CanAddNewUser
        {
            get { return true; }
        }



        public bool Validate(string username, string password)
        {
            string encryptedPasswrod = password.Encrypt();

            IQueryable<IUser> matchingUsers =
                from u in DataFacade.GetData<IUser>()
                 where string.Compare(u.Username, username, StringComparison.InvariantCultureIgnoreCase) == 0 
                       && u.EncryptedPassword == encryptedPasswrod
                 select u;

            return matchingUsers.Any();
        }


        public void SetUserPassword(string username, string password)
        {
            using (TransactionScope transactionScope = TransactionsFacade.CreateNewScope())
            {
                IUser user =
                    (from u in DataFacade.GetData<IUser>()
                     where u.Username == username
                     select u).FirstOrDefault();

                if (user == null) throw new InvalidOperationException(string.Format("The user '{0}' does not exists", username));

                user.EncryptedPassword = password.Encrypt();

                DataFacade.Update(user);

                transactionScope.Complete();
            }
        }


        public void AddNewUser(string userName, string password, string group)
        {
            IUser user = DataFacade.BuildNew<IUser>();

            user.Id = Guid.NewGuid();
            user.Username = userName;
            user.EncryptedPassword = password.Encrypt();
            user.Group = group;

            DataFacade.AddNew<IUser>(user);

            LoggingService.LogVerbose("DataBasedFormLoginProvider", string.Format("Added new user '{0}'", userName));
        }


        public bool UsersExists
        {
            get { return DataFacade.GetData<IUser>().Any(); }
        }
    }



    [Assembler(typeof(NonConfigurableLoginProviderAssembler))]
    internal sealed class DataBasedFormLoginProviderData : LoginProviderData
    {
    }
}
