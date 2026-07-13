      ******************************************************************
      *                                                                *
      * LICENSED MATERIALS - PROPERTY OF IBM                           *
      *                                                                *
      * "RESTRICTED MATERIALS OF IBM"                                  *
      *                                                                *
      * CB12                                                           *
      *                                                                *
      * (C) COPYRIGHT IBM CORP. 2011, 2013 ALL RIGHTS RESERVED         *
      *                                                                *
      * US GOVERNMENT USERS RESTRICTED RIGHTS - USE, DUPLICATION,      *
      * OR DISCLOSURE RESTRICTED BY GSA ADP SCHEDULE                   *
      * CONTRACT WITH IBM CORPORATION                                  *
      *                                                                *
      ******************************************************************
      *               COPYBOOK for Policy details                      *
      *                                                                *
      *   Structures to map values obtained from DB2 tables:           *
      *   Customer, Policy, Endowment, House and Motor.                *
      *                                                                *
      *   All lengths of policy fields will be defined here so that    *
      *   if any of the DB2 table contents change the lengths will     *
      *   only need to be changed here.                                *
      *                                                                *
      ******************************************************************
       01 WS-POLICY-LENGTHS.
          03 WS-CUSTOMER-LEN       PIC S9(4) COMP
                                                VALUE +62.
          03 WS-POLICY-LEN         PIC S9(4) COMP
                                                VALUE +72.
          03 WS-ENDOW-LEN          PIC S9(4) COMP
                                                VALUE +52.
          03 WS-HOUSE-LEN          PIC S9(4) COMP
                                                VALUE +58.
          03 WS-MOTOR-LEN          PIC S9(4) COMP
                                                VALUE +65.
          03 WS-COMM-LEN           PIC S9(4) COMP
                                                VALUE +1102.
          03 WS-CLAIM-LEN          PIC S9(4) COMP
                                                VALUE +546.
          03 WS-FULL-ENDOW-LEN     PIC S9(4) COMP
                                                VALUE +124.
          03 WS-FULL-HOUSE-LEN     PIC S9(4) COMP
                                                VALUE +130.
          03 WS-FULL-MOTOR-LEN     PIC S9(4) COMP
                                                VALUE +137.
          03 WS-FULL-COMM-LEN      PIC S9(4) COMP
                                                VALUE +1174.
          03 WS-FULL-CLAIM-LEN     PIC S9(4) COMP
                                                VALUE +618.
          03 WS-SUMRY-ENDOW-LEN    PIC S9(4) COMP
                                                VALUE +25.

       01 DB2-CUSTOMER.
          03 DB2-FIRSTNAME         PIC X(10).
          03 DB2-LASTNAME          PIC X(10).
          03 DB2-DATEOFBIRTH       PIC X(10).
          03 DB2-HOUSENAME         PIC X(20).
          03 DB2-HOUSENUMBER       PIC X(4).
          03 DB2-POSTCODE          PIC X(8).
          03 DB2-PHONE-MOBILE      PIC X(20).
          03 DB2-PHONE-HOME        PIC X(20).
          03 DB2-EMAIL-ADDRESS     PIC X(100).

       01 DB2-POLICY.
          03 DB2-POLICYTYPE        PIC X.
          03 DB2-POLICYNUMBER      PIC 9(10).
          03 DB2-POLICY-COMMON.
             05 DB2-ISSUEDATE      PIC X(10).
             05 DB2-EXPIRYDATE     PIC X(10).
             05 DB2-LASTCHANGED    PIC X(26).
             05 DB2-BROKERID       PIC 9(10).
             05 DB2-BROKERSREF     PIC X(10).
             05 DB2-PAYMENT        PIC 9(6).

       01 DB2-ENDOWMENT.
          03 DB2-ENDOW-FIXED.
             05 DB2-E-WITHPROFITS  PIC X.
             05 DB2-E-EQUITIES     PIC X.
             05 DB2-E-MANAGEDFUND  PIC X.
             05 DB2-E-FUNDNAME     PIC X(10).
             05 DB2-E-TERM         PIC 9(2).
             05 DB2-E-SUMASSURED   PIC 9(6).
             05 DB2-E-LIFEASSURED  PIC X(31).
          03 DB2-E-PADDINGDATA     PIC X(32611).

       01 DB2-HOUSE.
          03 DB2-H-PROPERTYTYPE    PIC X(15).
          03 DB2-H-BEDROOMS        PIC 9(3).
          03 DB2-H-VALUE           PIC 9(8).
          03 DB2-H-HOUSENAME       PIC X(20).
          03 DB2-H-HOUSENUMBER     PIC X(4).
          03 DB2-H-POSTCODE        PIC X(8).

       01 DB2-MOTOR.
          03 DB2-M-MAKE            PIC X(15).
          03 DB2-M-MODEL           PIC X(15).
          03 DB2-M-VALUE           PIC 9(6).
          03 DB2-M-REGNUMBER       PIC X(7).
          03 DB2-M-COLOUR          PIC X(8).
          03 DB2-M-CC              PIC 9(4).
          03 DB2-M-MANUFACTURED    PIC X(10).
          03 DB2-M-PREMIUM         PIC 9(6).
          03 DB2-M-ACCIDENTS       PIC 9(6).

       01 DB2-COMMERCIAL.
          03 DB2-B-ADDRESS         PIC X(255).
          03 DB2-B-POSTCODE        PIC X(8).
          03 DB2-B-LATITUDE        PIC X(11).
          03 DB2-B-LONGITUDE       PIC X(11).
          03 DB2-B-CUSTOMER        PIC X(255).
          03 DB2-B-PROPTYPE        PIC X(255).
          03 DB2-B-FIREPERIL       PIC 9(4).
          03 DB2-B-FIREPREMIUM     PIC 9(8).
          03 DB2-B-CRIMEPERIL      PIC 9(4).
          03 DB2-B-CRIMEPREMIUM    PIC 9(8).
          03 DB2-B-FLOODPERIL      PIC 9(4).
          03 DB2-B-FLOODPREMIUM    PIC 9(8).
          03 DB2-B-WEATHERPERIL    PIC 9(4).
          03 DB2-B-WEATHERPREMIUM  PIC 9(8).
          03 DB2-B-STATUS          PIC 9(4).
          03 DB2-B-REJECTREASON    PIC X(255).

       01 DB2-CLAIM.
          03 DB2-C-NUM             PIC 9(10).
          03 DB2-C-DATE            PIC X(10).
          03 DB2-C-PAID            PIC 9(8).
          03 DB2-C-VALUE           PIC 9(8).
          03 DB2-C-CAUSE           PIC X(255).
          03 DB2-C-OBSERVATIONS    PIC X(255).