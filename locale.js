/***********************************************************************************
/ Library:       locale.js
/
/ Description:   Set locale info depending on short code.
/
/ Compatibility: HTML4, all browsers
/
/ Written by Chris Mottram, ForSite Design
/
/ www.forsitedesign.com
/
/ This code is provided as-is with no warranty whatsoever.
/
/ Any bugs please let me know at chris.mottram@forsitedesign.com.
/
/ Notes:
/
/ Requires ForSite Design's general.js script file. Set scriptBase to point to the
/ location relative to your page.
/  
/***********************************************************************************/

var libLocaleIncluded = true;
var scriptBase = "LIBS";

// Include general.js if not already included
if (typeof(libGeneralIncluded) == "undefined")
{
    var thisScript = document.createElement("script");
    thisScript.setAttribute("type", "text/javascript");
    thisScript.setAttribute("src", scriptBase + "/general.js");
    
    document.getElementsByTagName("head")[0].appendChild(thisScript);
}

var localeRegion = function()
{
    // Sets region info

    this.localeCode = navigatorLanguage(); // ISO Culture Code
    this.EnglishName = ""; // Region Name in English
    this.displayName = "";
    this.nativeName = ""; // Region Name in native language
    this.ISO2Code = ""; // 2 digit ISO Code
    this.ISO3Code = ""; // 3 digit ISO Code
    
    var that=this;
    
    this.setRegion = function(localeCode)
    {
        // Set localeCode to browser code if not set
        if (typeof(localeCode) == "undefined") localeCode = navigatorLanguage();
        
        var regionInfo = localeRegions[localeCode]||localeRegions["en-US"];
        
        that.EnglishName = regionInfo[0];
        that.displayName = regionInfo[1]
        that.nativeName = regionInfo[2];
        that.ISO2Code = regionInfo[3];
        that.ISO3Code = regionInfo[4];
    }
}

var localeMonths = function()
{
    this.fullNames = [];
    this.shortNames = [];
    
    var that=this;
    
    this.setMonths = function(localeCode)
    {
        // Set localeCode to browser code if not set
        if (typeof(localeCode) == "undefined") localeCode = navigatorLanguage();
        
        var monthInfo = localeMonthNames[localeCode]||localeMonthNames["en-US"];
        
        for (var monthLoop=0; monthLoop<12; monthLoop++)
        {
            that.fullNames.push(monthInfo[monthLoop][0]);
            that.shortNames.push(monthInfo[monthLoop][1]);
        }
    }
}

var localeDays = function()
{
    this.fullNames = [];
    this.abbrNames = [];
    this.shortNames = [];
    this.shortestNames = [];
    
    var that=this;
    
    this.setDays = function(localeCode)
    {
        // Set localeCode to browser code if not set
        if (typeof(localeCode) == "undefined") localeCode = navigatorLanguage();
        
        var dayInfo = localeDayNames[localeCode]||localeDayNames["en-US"];
        
        for (var dayLoop=0; dayLoop<7; dayLoop++)
        {
            that.fullNames.push(dayInfo[dayLoop][0]);
            that.abbrNames.push(dayInfo[dayLoop][1]);
            that.shortNames.push(dayInfo[dayLoop][2]);
            that.shortestNames.push(dayInfo[dayLoop][3]);
        }
    }
}

var localeDatePattern = function()
{
    this.localeCode = navigatorLanguage(); // ISO Culture Code
    this.shortDate = "";
    this.longDate = "";
    this.fullDateTime = "";
    this.monthDay = "";
    this.yearMonth = "";
    this.dateSeparator = "";
    
    var that=this;
    
    this.setDatePattern = function(localeCode)
    {
        // Set localeCode to browser code if not set
        if (typeof(localeCode) == "undefined") localeCode = navigatorLanguage();
        
        var datePattern = localeDatePatterns[localeCode]||localeDatePatterns["en-US"];
        
        that.shortDate = datePattern[0];
        that.longDate = datePattern[1];
        that.fullDateTime = datePattern[2];
        that.monthDay = datePattern[3];
        that.yearMonth = datePattern[4];
        that.dateSeparator = datePattern[5];
    }
}

var localeTimePattern = function()
{
    this.localeCode = navigatorLanguage(); // ISO Culture Code
    this.shortTime = "";
    this.longTime = "";
    this.timeSeparator = "";
    this.AMDesignator = "";
    this.PMDesignator = "";
    
    var that = this;
    
    this.setTimePattern = function(localeCode)
    {
        // Set localeCode to browser code if not set
        if (typeof(localeCode) == "undefined") localeCode = navigatorLanguage();
        
        var timePattern = localeTimePatterns[localeCode]||localeTimePatterns["en-US"];
        
        that.shortTime = timePattern[0];
        that.longTime = timePattern[1];
        that.timeSeparator = timePattern[2];
        that.AMDesignator = timePattern[3];
        that.PMDesignator = timePattern[4];
    }
}

var localeLanguage = function()
{
    this.localeCode = navigatorLanguage(); // ISO Culture Code
    this.EnglishName = "";
    this.displayName = "";
    this.nativeName = "";
    
    var that=this;
    
    this.setLanguage = function(localeCode)
    {
        // Set localeCode to browser code if not set
        if (typeof(localeCode) == "undefined") localeCode = navigatorLanguage();
        
        var languageInfo = localeLanguages[localeCode]||localeLangiages["en-US"];
        
        that.EnglishName = languageInfo[0];
        that.displayName = languageInfo[1];
        that.nativeName = languageInfo[2];
    }
}

var localeCurrency = function()
{
    this.localeCode = navigatorLanguage(); // ISO Culture Code
    this.decimalDigitCount=2;
    this.decimalSeparator = "";
    this.groupSeparator = "";
    this.positivePattern = 0;
    this.negativePattern = 0;
    this.symbol = "";
    this.groupSizes = [3];
    
    var that=this;
    
    this.setCurrency = function(localeCode)
    {
        // Set localeCode to browser code if not set
        if (typeof(localeCode) == "undefined") localeCode = navigatorLanguage();
     
        var currencyInfo = localeCurrencyInfo[localeCode]||localeCurrencyInfo["en-US"];
        
        that.decimalDigitCount = parseInt(currencyInfo[0]);
        that.decimalSeparator = currencyInfo[1];
        that.groupSeparator = currencyInfo[2];
        that.positivePattern = localePositiveCurrencyPatterns[currencyInfo[3]]||localePositiveCurrencyPatterns[0];
        that.negativePattern = localeNegativeCurrencyPatterns[currencyInfo[4]]||localeNegativeCurrencyPatterns[0];
        that.symbol = currencyInfo[5];
        that.groupSizes = currencyInfo[6];
    }
}

var localeNumbers = function()
{
    this.localeCode = navigatorLanguage(); // ISO Culture Code
    this.digits = [];
    this.decimalSeparator = "";
    this.groupSeparator = "";
    this.negativePattern = 0;
    this.positiveSign = "";
    this.negativeSign = "";
    this.groupSizes = [3];

    var that=this;
    
    this.setNumbers = function(localeCode)
    {
        // Set localeCode to browser code if not set
        if (typeof(localeCode) == "undefined") localeCode = navigatorLanguage();
        
        var numberInfo = localeNumberInfo[localeCode]||localeNumberInfo["en-US"];
        
        // set the symbols used for each number
        for(var digitLoop=0; digitLoop<10 ; digitLoop++)
        {
            that.digits[digitLoop] = numberInfo[digitLoop];
        }
        
        that.decimalSeparator = numberInfo[10];
        that.groupSeparator = numberInfo[11];
        that.negativePattern = localeNegativeNumberPatterns[numberInfo[12]]||localeNegativeNumberPatterns[0];
        that.positiveSign = numberInfo[13];
        that.negativeSign = numberInfo[14];
        that.groupSizes = numberInfo[15];
    }
}

var localePercentage = function()
{
    this.localeCode = navigatorLanguage(); // ISO Culture Code
    this.symbol = "%";
    this.decimalSeparator = "";
    this.groupSeparator = "";
    this.positivePattern = 0;
    this.negativePattern = 0;
    this.groupSizes = [3];
    
    var that=this;
    
    this.setPercentage = function(localeCode)
    {
        // Set localeCode to browser code if not set
        if (typeof(localeCode) == "undefined") localeCode = navigatorLanguage();
        
        var percentageInfo = localePercentageInfo[localeCode]||localePercentageInfo["en-US"];
        
        that.symbol = percentageInfo[0];
        that.decimalSeparator = percentageInfo[1];
        that.groupSeparator = percentageInfo[2];
        that.positivePattern = localePositivePercentPatterns[percentageInfo[3]]||localePositivePercentPatterns[0];
        that.negativePattern = localeNegativePercentPatterns[percentageInfo[4]]||localeNegativePercentPatterns[0];
        that.groupSizes = percentageInfo[5];
    }
}

var localeTimeZone = function()
{
    this.standardName = "";
    this.displayName = "";
    this.UTCOffset=0;
    
    var that=this
    
}

function localeSettings()
{
    /*****************************************************************************
    /
    / localeSettings Class
    /
    / Usage example:
    /
    /   If you want to examine the locale settings for a specific locale:
    /
    /     var locale = new localeSettings();
    /
    /     locale.setLocale(localeCode);
    /     alert(locale.region.nativeName);
    /
    /   But if you just want to format numbers, dates or times for a locale you
    /   don't need to declare a locale var as the functions do this:
    /
    /     var x = -12345678.9012;
    /     alert(x.localise("bo-CN"));
    /     alert(x.formatNumber("en-GB"));
    / 
    /     var d = new Date();
    /     alert(d.formatStandardDate("D"));
    /
    /*****************************************************************************/
    
    this.localeCode = navigatorLanguage(); // ISO Culture Code (eg "en-GB")
    this.languageCode = this.localeCode.split("-")[0];
    this.regionCode = this.localeCode.split("-")[this.localeCode.split("-").length]; 
    this.region = new localeRegion();
    this.monthNames = new localeMonths();
    this.dayNames = new localeDays();
    this.datePattern = new localeDatePattern();
    this.timePattern = new localeTimePattern();
    this.language = new localeLanguage();
    this.currency = new localeCurrency();
    this.numbers = new localeNumbers();
    this.percentage = new localePercentage();
    this.dialingCode = "";
    
    var that=this;
    
    this.setLocale = function(localeCode)
    {
        // Set localeCode to browser code if not set
        if (typeof(localeCode) == "undefined") localeCode = navigatorLanguage();
        
        that.localeCode = localeCode;
        that.languageCode = localeCode.split("-")[0];
        that.regionCode = localeCode.split("-")[localeCode.split("-").length];
        that.region.setRegion(localeCode);
        that.monthNames.setMonths(localeCode);
        that.dayNames.setDays(localeCode);
        that.datePattern.setDatePattern(localeCode);
        that.timePattern.setTimePattern(localeCode);
        that.currency.setCurrency(localeCode);
        that.numbers.setNumbers(localeCode);
        that.percentage.setPercentage(localeCode);
        that.dialingCode = localeCountryDialingCodes[that.regionCode]||"";
    }
}

/*********************************************************************************
/
/ The following are locale enabled functions
/
/*********************************************************************************/

Number.prototype.localise = Number.prototype.localize = function(localeCode, locale)
{
    /*********************************************************************************
    / Localise number without groupings using locale specific characters to represent
    / digits and negative symbol.
    /
    / localeCode:   ISO culture code
    / locale:       Locale object
    /
    / Returns:      String containing formatted number
    /
    / Uses locale object if set, otherwise uses localeCode if set, otherwise uses
    / browser language.
    /
    /*********************************************************************************/
    
    var rtnVal = "";
    var unitDigits = "";
    var decDigits = "";
    var digitLoop = 0;
    var formattedNumber = "";
    var numberStr = [];
    var symPos = -1;
    var thisVal = Math.abs(this);
    
    if (typeof(locale) != "undefined")
    {
        localeCode = locale.localeCode;
    } else {
        if (typeof(localeCode) != "undefined")
        {
            locale = new localeSettings();
            locale.setLocale(localeCode);
        } else {
            localeCode = navigatorLanguage();
            locale = new localeSettings();
            locale.setLocale(localeCode);
        }
    }
    
    numberStr = thisVal.toString().split(".");
    
    unitDigits = numberStr[0];
    
    if (numberStr.length == 2) decDigits = numberStr[1];
   
    
    for (digitLoop=0; digitLoop < unitDigits.length; digitLoop++)
    {
        formattedNumber += locale.numbers.digits[unitDigits.substr(digitLoop,1)];
    }
    
    if (numberStr.length == 2)
    {
        formattedNumber = formattedNumber + locale.numbers.decimalSeparator;
        
        for (digitLoop=0; digitLoop < decDigits.length; digitLoop++)
        {
            formattedNumber += locale.numbers.digits[decDigits.substr(digitLoop,1)];
        }
    }
    
    rtnVal = this>=0?"n":locale.numbers.negativePattern;
    
    var symPos = rtnVal.indexOf("-");
    if (symPos != -1) rtnVal = rtnVal.replaceAt(symPos,1,locale.numbers.negativeSign);
    
    var symPos = rtnVal.indexOf("n");
    if (symPos != -1) rtnVal = rtnVal.replaceAt(symPos,1,formattedNumber);
    
    return(rtnVal);
}

function getLanguageFromLocale(localeCode)
{
    // Returns the language code part of the ISO code (usually first 2 chars)
    if (typeof(localCode) == "String")
    {
        return(localeCode.split("-")[0]);       
    }
}

Date.prototype.getDayName = function(localeCode)
{
    /**********************************************************************************
    / Adds a Day Name function to Date object.
    /
    / localeCode:   ISO culture code
    /
    / Returns:      String containing day name
    /
    / If localdCode isn't found, defaults to en-US.
    /
    /*********************************************************************************/

    if (typeof(localeCode) == "undefined") localeCode = navigatorLanguage();
    
    var weekDayNames = localeDayNames[localeCode];
    return(weekDayNames[this.getDay()]||localeDayNames["en-US"][this.getDay()]);
}

function WeekDayName(dayIndex, localeCode)
{
    /**********************************************************************************
    / Returns locale specific week day name for localCode.
    /
    / localeCode:   ISO culture code
    /
    / Returns:      String containing day name
    /
    / If localdCode isn't found, defaults to en-US.
    /
    /*********************************************************************************/
    
    if (typeof(localeCode) == "undefined") localeCode = navigatorLanguage();
    
    var weekDayNames = localeDayNames[localeCode];
    return(weekDayNames[dayIndex]||localeDayNames["en-US"][DayIndex]);
}

Date.prototype.getMonthName = function(localeCode)
{
    /**********************************************************************************
    / Adds a Month Name function to Date object.
    /
    / localeCode:   ISO culture code
    /
    / Returns:      String containing month name
    /
    / If localdCode isn't found, defaults to en-US.
    /
    /*********************************************************************************/

    if (typeof (localeCode) == "undefined") localeCode = navigatorLanguage();
    
    var monthNames = localeMonthNames[localeCode];
    return(monthNames[this.getMonth()]||localeMonthNames["en-US"][this.getMonth()]);
}

function MonthName(MonthIndex, localeCode)
{
    /**********************************************************************************
    / Returns locale specific month name for localCode.
    /
    / localeCode:   ISO culture code
    /
    / Returns:      String containing month name
    /
    / If localdCode isn't found, defaults to en-US.
    /
    /*********************************************************************************/

    if (typeof (localeCode) == "undefined") localeCode = navigatorLanguage();
    
    var monthNames = localeMonthNames[localeCode];
    return(monthNames[MonthIndex]||localeMonthNames["en-US"][MonthIndex]);
}

Date.prototype.formatDate = function(format, localeCode, locale)
{
    /**********************************************************************************
    / Format date to string depending on the contents of format, localeCode and locale.
    /
    / format:       Format of the returned date string
    / localeCode:   ISO culture code (eg "en-GB")
    / locale        Locale object
    /
    / Returns:      String containing the formatted date
    /
    / Uses locale object if set, otherwise uses localeCode if set, otherwise uses
    / browser language.
    /
    / Formats supported:
    /
    /   d       Day of the month (1-31)
    /   dd      Day of the month (01-31)
    /   h       Hours using 12 hour clock (1-12)
    /   hh      Hours using 12 hour clock (01-12)
    /   H       Hours using 24 hour clock (0-23)
    /   HH      Hours using 24 hour clock (0-23)
    /   m       Minutes (0-59)
    /   mm      Minutes (00-59)
    /   M       Month (1-12)
    /   MM      Month (01-12)
    /   MMM     Abbreviated Month Name
    /   MMMM    Full month name
    /   s       Seconds (1-59)
    /   ss      Seconds (01-59)
    /   t       First character of AM/PM designator
    /   tt      AM/PM desgnator
    /   w       Shortest weekday name
    /   ww      Short weekday name
    /   www     Abbreviated weekday name
    /   wwww    Full weekday name
    /   y       Year (1-99)
    /   yy      Year (01-99)
    /   yyyy    Full year
    /   z       Offet from UTC, no leading 0 (-11 to +11)
    /   zz      Offet from UTC, leading 0 if required (-11 to +11)
    /   ''      Literal (see below) 
    /
    /
    / Any string can be passed; Only characters that match the special characters are
    / replaced. This means any separator characters may be used as they will be
    / ignored. 
    /
    / Literals are strings enclosed in single quotes. For example, a format of:
    /
    /       wwww d 'de' MMMM 'de' yyyy hh:mm:ss tt
    /
    / will not replace the letter d in 'de' with the day of the month. Instead anything
    / enclosed in single quotes will be ignored, and the quotes will be removed.
    /
    / All occurrances of each of the special character blocks will be replaced.
    /
    /*********************************************************************************/
    
    var rtnVal = format;
    var origFormat = format;
    var Day = this.getDate();
    var Month = this.getMonth()+1;
    var Year = this.getFullYear();
    var Hours = this.getHours();
    var Hours12 = Hours>12?Hours-12:Hours;
    var Minutes = this.getMinutes();
    var Seconds = this.getSeconds();
    var WeekDay = this.getDay();
    var UTCOffset = -this.getTimezoneOffset()/60;
    var ProcessFormat = true;
    var insText = [];
    var locText = "";
    
    if (Hours12 == 0) Hours12 = 12;
    
    if (typeof(locale) != "undefined")
    {
        localeCode = locale.localeCode;
    } else {
        if (typeof(localeCode) == "string")
        {
            locale = new localeSettings();
            locale.setLocale(localeCode);
        } else {
            localeCode = navigatorLanguage();
            locale = new localeSettings();
            locale.setLocale(localeCode);
        }
    }
    
    if (typeof(format) == "string" && locale)
    {
        var locDay = Day.localise("",locale);
        var locMonth = Month.localise("",locale);
        var locYear = Year.localise("",locale);
        var locHours24 = Hours.localise("",locale);
        var locHours12 = Hours12.localise("",locale);
        var locMinutes = Minutes.localise("",locale);
        var locSeconds = Seconds.localise("",locale);
        var locUTCOffset = UTCOffset.localise("", locale);
        
        var partPos = 0;
        var endOfRun = -1;
        var partLength = -1;
        var ampmDesignator = "";
        var zeroChar = locale.numbers.digits[0];
        
        partPos = format.indexOf("'");
        while(partPos != -1)
        {
            endOfRun = format.indexOf("'", partPos+1);
            partLength = endOfRun - partPos+1;
            
            if (partLength > 0)
            {
                locText = format.substr(partPos+1, partLength-2);
                var replStr = fillString("x",partLength);
                format = format.replaceAt(partPos, partLength, replStr);
                
                insText.push([partPos,partLength,locText]);
                partPos = format.indexOf("'", partPos+1);
            }
        }

        partPos = format.indexOf("y");
        while(partPos != -1)
        {
            endOfRun = format.endOfRun("y", partPos);
            partLength = endOfRun - partPos+1;
            
            if (partLength > 3)
            {
                locText = locYear;
            } else
            {
                locText = locYear.right(2)
            }
            insText.push([partPos,partLength,locText]);
            partPos = format.indexOf("y", endOfRun+1);
        }
        
        partPos = format.indexOf("M");
        while (partPos != -1)
        {
            endOfRun = format.endOfRun("M", partPos);
            partLength = endOfRun - partPos+1;
            
            if (partLength > 3)
            {
                locText = locale.monthNames.fullNames[Month-1];
            } else
            {
                if (partLength > 2)
                {
                    locText = locale.monthNames.shortNames[Month-1];
                } else 
                {
                    if (partLength == 2)
                    {
                        locText = locMonth.padLeading(zeroChar,2);
                    } else 
                    {
                        locText = locMonth;
                    }
                }
            }
            insText.push([partPos,partLength,locText]);
            partPos = format.indexOf("M", endOfRun+1);
        }
        
        partPos = format.indexOf("w");
        while (partPos != -1)
        {
            endOfRun = format.endOfRun("w", partPos);
            partLength = endOfRun - partPos+1;
            
            if (partLength > 3)
            {
                locText = locale.dayNames.fullNames[WeekDay];
            } else
            {
                if (partLength > 2)
                {
                    locText = locale.dayNames.abbrNames[WeekDay];
                } else 
                {
                    if (partLength == 2)
                    {
                        locText = locale.dayNames.shortNames[WeekDay];
                    } else 
                    {
                        locText = locale.dayNames.shortestNames[WeekDay];
                    }
                }
            }
            insText.push([partPos,partLength,locText]);
            partPos = format.indexOf("w", endOfRun+1);
        }
                
        partPos = format.indexOf("d");
        while (partPos != -1)
        {
            endOfRun = format.endOfRun("d", partPos);
            partLength = endOfRun - partPos+1;

            if (partLength > 1)
            {
                locText = locDay.padLeading(zeroChar,2);
            } else 
            {
                locText = locDay;
            }
            insText.push([partPos,partLength,locText]);
            partPos = format.indexOf("d", endOfRun+1);
        }
        
        partPos = format.indexOf("h");
        while (partPos != -1)
        {
            endOfRun = format.endOfRun("h", partPos);
            partLength = endOfRun - partPos+1;

            if (partLength > 1)
            {
                locText = locHours12.padLeading(zeroChar,2);
            } else 
            {
                locText = locHours12;
            }
            insText.push([partPos,partLength,locText]);
            partPos = format.indexOf("h", endOfRun+1);
        }
        
        partPos = format.indexOf("H");
        while (partPos != -1)
        {
            endOfRun = format.endOfRun("H", partPos);
            partLength = endOfRun - partPos+1;

            if (partLength > 1)
            {
                locText = locHours24.padLeading(zeroChar,2);
            } else 
            {
                locText = locHours24;
            }
            insText.push([partPos,partLength,locText]);
            partPos = format.indexOf("H", endOfRun+1);
        }
        
        partPos = format.indexOf("m");
        while (partPos != -1)
        {
            endOfRun = format.endOfRun("m", partPos);
            partLength = endOfRun - partPos+1;

            if (partLength > 1)
            {
                locText = locMinutes.padLeading(zeroChar,2);
            } else 
            {
                locText = locMinutes;
            }
            insText.push([partPos,partLength,locText]);
            partPos = format.indexOf("m", endOfRun+1);
        }
        
        partPos = format.indexOf("s");
        while (partPos != -1)
        {
            endOfRun = format.endOfRun("s", partPos);
            partLength = endOfRun - partPos+1;

            if (partLength > 1)
            {
                locText = locSeconds.padLeading(zeroChar,2);
            } else 
            {
                locText = locSeconds;
            }
            insText.push([partPos,partLength,locText]);
            partPos = format.indexOf("s", endOfRun+1);
        }
        
        partPos = format.indexOf("z");
        while (partPos != -1)
        {
            endOfRun = format.endOfRun("z", partPos);
            partLength = endOfRun - partPos+1;

            if (partLength > 1)
            {
                locText = locUTCOffset.padLeading(zeroChar,2);
            } else 
            {
                locText = locUTCOffset;
            }
            insText.push([partPos,partLength,locText]);
            partPos = format.indexOf("z", endOfRun+1);
        }
        
        partPos = format.indexOf("t");
        while (partPos != -1)
        {
            ampmDesignator = this.getHours()*3600 < 43200?locale.timePattern.AMDesignator:locale.timePattern.PMDesignator;
            
            endOfRun = format.endOfRun("t", partPos);
            partLength = endOfRun - partPos+1;

            if (partLength > 1)
            {
                locText = ampmDesignator;
            } else 
            {
                locText = ampmDesignator.left(1);
            }
            insText.push([partPos,partLength,locText]);
            partPos = format.indexOf("t", endOfRun+1);
        }
    }
    
    insText.sort(function(a,b){return b[0]-a[0]});
    
    for (replLoop=0; replLoop<insText.length; replLoop++)
    {
        rtnVal = rtnVal.replaceAt(insText[replLoop][0],insText[replLoop][1],insText[replLoop][2]);
    }
    
    format = origFormat;
    return(rtnVal);
}

Date.prototype.formatStandardDate = function(formatSpecifier, localeCode, locale)
{
    /*******************************************************************************************
    / Format date to string depending on the contents of formatSpecifier, localeCode and locale.
    /
    / formatSpecifier:  Format of the returned date string
    / localeCode:       ISO culture code (eg "en-GB")
    / locale            Locale object
    /
    / Returns:          String containing the formatted date
    /
    / Uses locale object if set, otherwise uses localeCode if set, otherwise uses
    / browser language.
    /
    / Formats supported in formatSpecifier:
    /
    /    d  Short date
    /    D  Long date
    /    f  Full date but with short time
    /    F  Full date, long time
    /    g  General date, short time
    /    G  General date, long time
    /    m  Month and day
    /    M  Month and day 
    /    t  Short time
    /    T  Long time
    /    y  Year and month
    /    Y  Year and month
    /
    / Anything that doesn't match a supported format is passed to the formatDate function.
    /
    /*******************************************************************************************/
    
    var rtnVal = "";
    
    if (typeof(locale) != "undefined")
    {
        localeCode = locale.localeCode;
    } else {
        if (typeof(localeCode) != "undefined")
        {
            locale = new localeSettings();
            locale.setLocale(localeCode);
        } else {
            localeCode = navigatorLanguage();
            locale = new localeSettings();
            locale.setLocale(localeCode);
        }
    }
        
    switch (formatSpecifier)
    {
        case "d": // Short date
            rtnVal = this.formatDate(locale.datePattern.shortDate,"",locale);
            break;
            
        case "D": // Long date
            rtnVal = this.formatDate(locale.datePattern.longDate,"",locale);
            break;
            
        case "f": // Full date but with short time
            rtnVal = this.formatDate(locale.datePattern.longDate + " " + locale.timePattern.shortTime,"",locale);
            break;
            
        case "F": // Full date
            rtnVal = this.formatDate(locale.datePattern.fullDateTime,"",locale);
            break;
            
        case "g": // General date, short time
            rtnVal = this.formatDate(locale.datePattern.shortDate + " " + locale.timePattern.shortTime,"",locale);
            break;
            
        case "G": // General date, long time
            rtnVal = this.formatDate(locale.datePattern.shortDate + " " + locale.timePattern.longTime,"",locale);
            break;
            
        case "m": // Month and day
        case "M": 
            rtnVal = this.formatDate(locale.datePattern.monthDay,"",locale);
            break;
            
        case "t": // Short time
            rtnVal = this.formatDate(locale.timePattern.shortTime,"",locale);
            break;
            
        case "T": // Long time
            rtnVal = this.formatDate(locale.timePattern.longTime,"",locale);
            break;
            
        case "y": // Year and month
        case "Y":
            rtnVal = this.formatDate(locale.datePattern.yearMonth,"",locale);
            break;
            
        default: // Unsupported formatSpecifier so pass it to formatDate
            rtnVal = this.formatDate(formatSpecifier,"",locale);
    }
    
    return(rtnVal);
}

Date.prototype.isDate = function(testDateString, format, localeCode, locale)
{
    /*****************************************************************************
    / Validate a date string according to format, localeCode and locale.
    /
    / testDateString:   The date string being tested (eg "31/1/2010")
    / format:           Format to be compared against
    / localeCode:       ISO culture code (eg "en-GB")
    / locale            Locale object
    /
    / Returns:          Boolean; true if date is valid for the locale specified, 
    /                   false otherwise.
    /
    / Uses locale object if set, otherwise uses localeCode if set, otherwise uses
    / browser language.
    /
    / Place holders supported in format:
    /
    /    d  Day of the month
    /    M  Month 
    /    y  Year
    /
    / Anything else is considered to be a delimeter between the date parts.
    /
    / If format is omitted, defaults to locale short date format returned by
    / getLocaleDateFormat;
    /
    /*****************************************************************************/
    
    var thisFormat = "";
    
    if (typeof(locale) != "undefined")
    {
        localeCode = locale.localeCode;
    } else {
        if (typeof(localeCode) != "undefined")
        {
            locale = new localeSettings();
            locale.setLocale(localeCode);
        } else {
            localeCode = navigatorLanguage();
            locale = new localeSettings();
            locale.setLocale(localeCode);
        }
    }

    if (typeof(format) != "string")
        thisFormat = this.getLocaleDateFormat(localeCode,"d");
    else
        if (format != "")
            thisFormat = format;
        else
            thisFormat = this.getLocaleDateFormat(localeCode,"d");
            
    var YearPos = thisFormat.indexOf("y");
    var MonthPos = thisFormat.indexOf("M");
    var DayPos = thisFormat.indexOf("d");
    var YearendOfRun;
    var MonthendOfRun;
    var DayendOfRun;
    var Delim1 = "";
    var Delim2 = ""
    var PartsOrder = "";
    var partLength;
    var ThisDateStr1 = "";
    var ThisDateStr2 = "";
    
    var rtnVal = false;
    
    if (YearPos != -1 && MonthPos != -1 && DayPos != -1)
    {
        YearendOfRun = thisFormat.endOfRun("y", YearPos);    
        MonthendOfRun = thisFormat.endOfRun("M", MonthPos);    
        DayendOfRun = thisFormat.endOfRun("d", DayPos);    
        
        Year = Number(testDateString.substr(YearPos,YearendOfRun));
        Month = Number(testDateString.substr(MonthPos,MonthendOfRun));
        Day = Number(testDateString.substr(DayPos,DayendOfRun));
        
        if (!isNaN(Year) && !isNaN(Month) && !isNaN(Day))
        {
            if (Year < 100) Year += 2000;

            if (YearPos < MonthPos && YearPos < DayPos) {
                if (MonthPos < DayPos) {
                    Delim1 = thisFormat.substr(YearendOfRun + 1, MonthPos - YearendOfRun);
                    Delim2 = thisFormat.substr(MonthendOfRun + 1, DayPos - MonthendOfRun);
                    ThisDateStr1 = Year + Delim1 + Month + Delim2 + Day;
                    ThisDateStr2 = ThisDate.getFullYear() + Delim1 + ThisDate.getMonth() + Delim1 + ThisDate.getDate();
                } else {
                    Delim1 = thisFormat.substr(YearendOfRun + 1, DayPos - YearendOfRun);
                    Delim2 = thisFormat.substr(DayendOfRun + 1, MonthPos - DayendOfRun);
                    ThisDateStr1 = Year + Delim1 + Day + Delim2 + Month;
                    ThisDateStr2 = ThisDate.getFullYear() + Delim1 + ThisDate.getDate() + Delim1 + ThisDate.getMonth();
                }
            }

            if (MonthPos < YearPos && MonthPos < DayPos) {
                if (YearPos < DayPos) {
                    Delim1 = thisFormat.substr(MonthendOfRun + 1, YearPos - MonthendOfRun);
                    Delim2 = thisFormat.substr(YearendOfRun + 1, DayPos - YearendOfRun);
                    ThisDateStr1 = Month + Delim1 + Year + Delim2 + Day;
                    ThisDateStr2 = ThisDate.getMonth() + Delim1 + ThisDate.getFullYear() + Delim1 + ThisDate.getDate();
                } else {
                    Delim1 = thisFormat.substr(MonthendOfRun + 1, DayPos - MonthendOfRun);
                    Delim2 = thisFormat.substr(DayendOfRun + 1, YearPos - DayendOfRun);
                    ThisDateStr1 = Month + Delim1 + Day + Delim2 + Year;
                    ThisDateStr2 = ThisDate.getMonth() + Delim1 + ThisDate.getDate() + Delim1 + ThisDate.getFullYear();
                }
            }

            if (DayPos < MonthPos && DayPos < YearPos) {
                Part1 = Day;

                if (MonthPos < YearPos) {
                    Delim1 = thisFormat.substr(DayendOfRun + 1, MonthPos - DayendOfRun);
                    Delim2 = thisFormat.substr(MonthendOfRun + 1, YearPos - MonthendOfRun);
                    ThisDateStr1 = Day + Delim1 + Month + Delim2 + Year;
                    ThisDateStr2 = ThisDate.getDate() + Delim1 + ThisDate.getMonth() + Delim1 + ThisDate.getFullYear();
                } else {
                    Delim1 = thisFormat.substr(MonthendOfRun + 1, YearPos - MonthendOfRun);
                    Delim2 = thisFormat.substr(YearendOfRun + 1, MonthPos - YearendOfRun);
                    Part2 = Year;
                    Part3 = Month;

                }
            }

            var ThisDateStr1 = Part1 + Delim1 + Part2 + Delim2 + Year;

            var ThisDate = new Date(Year, Month, Day);
            var ThisDateStr2 = ThisDate.getDate() + Delim1 + ThisDate.getMonth() + Delim2 + ThisDate.getFullYear();

            if (ThisDateStr1 == ThisDateStr2) rtnVal = true;
        } else {
            rtnVal = false;
        }
    }
    return(rtnVal);
}

Date.prototype.getLocaleDateFormat = function(localeCode, formatSpecifier, locale)
{
    /*************************************************************************
    / Gets the default date format for a locale.
    /
    / localeCode:       ISO culture code (eg "en-GB")
    / formatSpecifier:  Format of the returned date string
    / locale            Locale object
    /
    / Returns:      String containing default date format.
    /
    / Uses locale object if set, otherwise uses localeCode if set, otherwise uses
    / browser language.
    /
    / Formats supported in formatSpecifier:
    /
    /    d  Short date
    /    D  Long date
    /    f  Full date but with short time
    /    F  Full date, long time
    /    g  General date, short time
    /    G  General date, long time
    /    m  Month and day
    /    M  Month and day 
    /    t  Short time
    /    T  Long time
    /    y  Year and month
    /    Y  Year and month
    /
    / Returns null if an unsupported formatSpecifier is provided.
    /
    /*************************************************************************/

    var rtnVal = "";

    if (typeof (locale) != "undefined") {
        localeCode = locale.localeCode;
    } else {
        if (typeof (localeCode) != "undefined") {
            locale = new localeSettings();
            locale.setLocale(localeCode);
        } else {
            localeCode = navigatorLanguage();
            locale = new localeSettings();
            locale.setLocale(localeCode);
        }
    }

    if (typeof formatSpecifier != "string") formatSpecifier = "d";

    switch (formatSpecifier) {
        case "d": // Short date
            rtnVal = locale.datePattern.shortDate;
            break;

        case "D": // Long date
            rtnVal = locale.datePattern.longDate;
            break;

        case "f": // Full date but with short time
            rtnVal = locale.datePattern.longDate + " " + locale.timePattern.shortTime;
            break;

        case "F": // Full date
            rtnVal = locale.datePattern.fullDateTime;
            break;

        case "g": // General date, short time
            rtnVal = locale.datePattern.shortDate + " " + locale.timePattern.shortTime;
            break;

        case "G": // General date, long time
            rtnVal = locale.datePattern.shortDate + " " + locale.timePattern.longTime;
            break;

        case "m": // Month and day
        case "M":
            rtnVal = locale.datePattern.monthDay;
            break;

        case "t": // Short time
            rtnVal = locale.timePattern.shortTime;
            break;

        case "T": // Long time
            rtnVal = locale.timePattern.longTime;
            break;

        case "y": // Year and month
        case "Y":
            rtnVal = locale.datePattern.yearMonth;
            break;

        default: // Unsupported formatSpecifier so return null
            rtnVal = null;
    }

    return (rtnVal);
}

Number.prototype.formatNumber = function(localeCode, locale)
{
    /*************************************************************************
    / Format a number according according to locale.
    /
    / localeCode:   ISO culture code (eg "en-GB")
    / locale        Locale object
    /
    / Returns:      String containing formatted number.
    /
    / Uses locale object if set, otherwise uses localeCode if set, otherwise uses
    / browser language.
    /
    /*************************************************************************/

    var rtnVal = "";
    var groupPos = 0;
    var charLoop = 0;
    var unitDigits = "";
    var decDigits = "";
    var formattedNumber = "";
    var numberStr = [];
    var symPos = -1;
    var thisVal = Math.abs(this);
    
    if (typeof (locale) != "undefined") {
        localeCode = locale.localeCode;
    } else {
        if (typeof (localeCode) != "undefined") {
            locale = new localeSettings();
            locale.setLocale(localeCode);
        } else {
            localeCode = navigatorLanguage();
            locale = new localeSettings();
            locale.setLocale(localeCode);
        }
    }

    numberStr = thisVal.toString().split(".");
    
    unitDigits = numberStr[0];
    decDigits = numberStr[1];

    activeGroupSize = locale.numbers.groupSizes[groupPos];
    for (charLoop=unitDigits.length-1; charLoop >= 0 ; charLoop--)
    {
        formattedNumber = locale.numbers.digits[unitDigits.substr(charLoop,1)] + formattedNumber;
        
        activeGroupSize--;
        
        if (activeGroupSize == 0)
        {
            if (charLoop > 0) formattedNumber = locale.numbers.groupSeparator + formattedNumber;
            groupPos++;
            
            if (groupPos = locale.numbers.groupSizes.length) groupPos--;
            activeGroupSize = locale.numbers.groupSizes[groupPos];
            if (activeGroupSize == 0 && charLoop >= 0)
            {
                for (digitLoop=0; digitLoop < charLoop; digitLoop++)
                {
                    formattedNumber = locale.numbers.digits[unitDigits.substr(digitLoop,1)] + formattedNumber;
                }
                break;
            }
        }
    }
    
    formattedNumber = formattedNumber + locale.numbers.decimalSeparator;
    
    for (digitLoop=0; digitLoop < decDigits.length; digitLoop++)
    {
        formattedNumber += locale.numbers.digits[decDigits.substr(digitLoop,1)];
    }
    
    rtnVal = this>=0?"n":locale.numbers.negativePattern;
    
    var symPos = rtnVal.indexOf("-");
    if (symPos != -1) rtnVal = rtnVal.replaceAt(symPos,1,locale.numbers.negativeSign);
    
    var symPos = rtnVal.indexOf("n");
    if (symPos != -1) rtnVal = rtnVal.replaceAt(symPos,1,formattedNumber);
    
    return(rtnVal);
}

Number.prototype.formatCurrency = function(localeCode, locale)
{
    /*************************************************************************
    / Format a number as Currency according according to locale.
    /
    / localeCode:   ISO culture code (eg "en-GB")
    / locale        Locale object
    /
    / Returns:      String containing formatted number.
    /
    / Uses locale object if set, otherwise uses localeCode if set, otherwise uses
    / browser language.
    /
    /*************************************************************************/

    var rtnVal = "";
    var groupPos = 0;
    var charLoop = 0;
    var unitDigits = "";
    var decDigits = "";
    var formattedNumber = "";
    var numberStr = [];
    var symPos = -1;
    var thisVal = Math.abs(this);
    var digitLoop = 0;
    
    if (typeof (locale) != "undefined") {
        localeCode = locale.localeCode;
    } else {
        if (typeof (localeCode) != "undefined") {
            locale = new localeSettings();
            locale.setLocale(localeCode);
        } else {
            localeCode = navigatorLanguage();
            locale = new localeSettings();
            locale.setLocale(localeCode);
        }
    }
    
    numberStr = thisVal.toString().split(".");
    
    unitDigits = numberStr[0];
    decDigits = numberStr[1];

    activeGroupSize = locale.currency.groupSizes[groupPos];
    for (charLoop=unitDigits.length-1; charLoop >= 0 ; charLoop--)
    {
        formattedNumber = unitDigits.substr(charLoop,1) + formattedNumber;
        
        activeGroupSize--;
        
        if (activeGroupSize == 0)
        {
            if (charLoop > 0) formattedNumber = locale.currency.groupSeparator + formattedNumber;
            groupPos++;
            
            if (groupPos = locale.currency.groupSizes.length) groupPos--;
            activeGroupSize = locale.currency.groupSizes[groupPos];
            if (activeGroupSize == 0 && charLoop >= 0)
            {
                for (digitLoop=0; digitLoop < charLoop; digitLoop++)
                {
                    formattedNumber = locale.numbers.digits[unitDigits.substr(digitLoop,1)] + formattedNumber;
                }
                break;
            }
        }
    }
    
    formattedNumber = formattedNumber + locale.currency.decimalSeparator;
    
    for (digitLoop=0; digitLoop < decDigits.length; digitLoop++)
    {
        formattedNumber += locale.numbers.digits[decDigits.substr(digitLoop,1)];
    }
    
    rtnVal = this>=0?locale.currency.positivePattern:locale.currency.negativePattern;
    
    var symPos = rtnVal.indexOf("-");
    if (symPos != -1) rtnVal = rtnVal.replaceAt(symPos,1,locale.numbers.negativeSign);
 
    var symPos = rtnVal.indexOf("$");
    if (symPos != -1) rtnVal = rtnVal.replaceAt(symPos,1,locale.currency.symbol);
    
    var symPos = rtnVal.indexOf("n");
    if (symPos != -1) rtnVal = rtnVal.replaceAt(symPos,1,formattedNumber);
    
    return(rtnVal);
}

Number.prototype.formatPercent = function(localeCode, locale)
{
    /*************************************************************************
    / Format a number as Percentage according according to locale.
    /
    / localeCode:   ISO culture code (eg "en-GB")
    / locale        Locale object
    /
    / Returns:      String containing formatted number.
    /
    / Uses locale object if set, otherwise uses localeCode if set, otherwise uses
    / browser language.
    /
    /*************************************************************************/

    var rtnVal = "";
    var groupPos = 0;
    var charLoop = 0;
    var unitDigits = "";
    var decDigits = "";
    var formattedNumber = "";
    var numberStr = [];
    var thisVal = Math.abs(this);
    var digitLoop = 0;
    
    if (typeof (locale) != "undefined") {
        localeCode = locale.localeCode;
    } else {
        if (typeof (localeCode) != "undefined") {
            locale = new localeSettings();
            locale.setLocale(localeCode);
        } else {
            localeCode = navigatorLanguage();
            locale = new localeSettings();
            locale.setLocale(localeCode);
        }
    }
    
    numberStr = thisVal.toString().split(".");
    
    unitDigits = numberStr[0];
    decDigits = numberStr[1];

    activeGroupSize = locale.percentage.groupSizes[groupPos];
    for (charLoop=unitDigits.length-1; charLoop >= 0 ; charLoop--)
    {
        formattedNumber = unitDigits.substr(charLoop,1) + formattedNumber;
        
        activeGroupSize--;
        
        if (activeGroupSize == 0)
        {
            if (charLoop > 0) formattedNumber = locale.percentage.groupSeparator + formattedNumber;
            groupPos++;
            
            if (groupPos = locale.percentage.groupSizes.length) groupPos--;
            activeGroupSize = locale.percentage.groupSizes[groupPos];
            if (activeGroupSize == 0 && charLoop >= 0)
            {
                for (digitLoop=0; digitLoop < charLoop; digitLoop++)
                {
                    formattedNumber = locale.numbers.digits[unitDigits.substr(digitLoop,1)] + formattedNumber;
                }
                break;
            }
        }
    }
    
    formattedNumber = formattedNumber + locale.percentage.decimalSeparator;
    
    for (digitLoop=0; digitLoop < decDigits.length; digitLoop++)
    {
        formattedNumber += locale.numbers.digits[decDigits.substr(digitLoop,1)];
    }
    
    rtnVal = this>=0?locale.percentage.positivePattern:locale.percentage.negativePattern;
    
    var symPos = rtnVal.indexOf("-");
    if (symPos != -1) rtnVal = rtnVal.replaceAt(symPos,1,locale.numbers.negativeSign);
 
    var symPos = rtnVal.indexOf("%");
    if (symPos != -1) rtnVal = rtnVal.replaceAt(symPos,1,locale.percentage.symbol);
    
    var nPos = rtnVal.indexOf("n");
    if (nPos != -1) rtnVal = rtnVal.replaceAt(nPos,1,formattedNumber);
    
    return(rtnVal);
}

/*********************************************************************************
/
/ The following are locale info structures
/
/*********************************************************************************/

var localeRegions={
     "af-ZA" : ["South Africa","South Africa","Suid-Afrika","ZA","ZAF"],
     "am-ET" : ["Ethiopia","Ethiopia","ኢትዮጵያ","ET","ETH"],
     "ar-AE" : ["U.A.E.","U.A.E.","الإمارات العربية المتحدة","AE","ARE"],
     "ar-BH" : ["Bahrain","Bahrain","البحرين","BH","BHR"],
     "ar-DZ" : ["Algeria","Algeria","الجزائر","DZ","DZA"],
     "ar-EG" : ["Egypt","Egypt","مصر","EG","EGY"],
     "ar-IQ" : ["Iraq","Iraq","العراق","IQ","IRQ"],
     "ar-JO" : ["Jordan","Jordan","الأردن","JO","JOR"],
     "ar-KW" : ["Kuwait","Kuwait","الكويت","KW","KWT"],
     "ar-LB" : ["Lebanon","Lebanon","لبنان","LB","LBN"],
     "ar-LY" : ["Libya","Libya","ليبيا","LY","LBY"],
     "ar-MA" : ["Morocco","Morocco","المملكة المغربية","MA","MAR"],
     "ar-OM" : ["Oman","Oman","عمان","OM","OMN"],
     "ar-QA" : ["Qatar","Qatar","قطر","QA","QAT"],
     "ar-SA" : ["Saudi Arabia","Saudi Arabia","المملكة العربية السعودية","SA","SAU"],
     "ar-SY" : ["Syria","Syria","سوريا","SY","SYR"],
     "ar-TN" : ["Tunisia","Tunisia","تونس","TN","TUN"],
     "ar-YE" : ["Yemen","Yemen","اليمن","YE","YEM"],
     "arn-CL" : ["Chile","Chile","Chile","CL","CHL"],
     "as-IN" : ["India","India","ভাৰত","IN","IND"],
     "az-Cyrl-AZ" : ["Azerbaijan","Azerbaijan","Азәрбајҹан","AZ","AZE"],
     "az-Latn-AZ" : ["Azerbaijan","Azerbaijan","Azərbaycan","AZ","AZE"],
     "ba-RU" : ["Russia","Russia","Рәсәй","RU","RUS"],
     "be-BY" : ["Belarus","Belarus","Беларусь","BY","BLR"],
     "bg-BG" : ["Bulgaria","Bulgaria","България","BG","BGR"],
     "bn-BD" : ["Bangladesh","Bangladesh","বাংলাদেশ","BD","BGD"],
     "bn-IN" : ["India","India","ভারত","IN","IND"],
     "bo-CN" : ["China","People's Republic of China","ཀྲུང་ཧྭ་མི་དམངས་སྤྱི་མཐུན་རྒྱལ་ཁབ།","CN","CHN"],
     "br-FR" : ["France","France","Frañs","FR","FRA"],
     "bs-Cyrl-BA" : ["Bosnia and Herzegovina","Bosnia and Herzegovina","Босна и Херцеговина","BA","BIH"],
     "bs-Latn-BA" : ["Bosnia and Herzegovina","Bosnia and Herzegovina","Bosna i Hercegovina","BA","BIH"],
     "ca-ES" : ["Spain","Spain","Espanya","ES","ESP"],
     "ca-ES-valencia" : ["Spain","Spain","Espanya","ES","ESP"],
     "chr-Cher-US" : ["United States","United States","United States","US","USA"],
     "co-FR" : ["France","France","Francia","FR","FRA"],
     "cs-CZ" : ["Czech Republic","Czech Republic","Česká republika","CZ","CZE"],
     "cy-GB" : ["United Kingdom","United Kingdom","Y Deyrnas Unedig","GB","GBR"],
     "da-DK" : ["Denmark","Denmark","Danmark","DK","DNK"],
     "de-AT" : ["Austria","Austria","Österreich","AT","AUT"],
     "de-CH" : ["Switzerland","Switzerland","Schweiz","CH","CHE"],
     "de-DE" : ["Germany","Germany","Deutschland","DE","DEU"],
     "de-LI" : ["Liechtenstein","Liechtenstein","Liechtenstein","LI","LIE"],
     "de-LU" : ["Luxembourg","Luxembourg","Luxemburg","LU","LUX"],
     "dsb-DE" : ["Germany","Germany","Nimska","DE","DEU"],
     "dv-MV" : ["Maldives","Maldives","ދިވެހި ރާއްޖެ","MV","MDV"],
     "el-GR" : ["Greece","Greece","Ελλάδα","GR","GRC"],
     "en-029" : ["Caribbean","Caribbean","Caribbean","029","029"],
     "en-AU" : ["Australia","Australia","Australia","AU","AUS"],
     "en-BZ" : ["Belize","Belize","Belize","BZ","BLZ"],
     "en-CA" : ["Canada","Canada","Canada","CA","CAN"],
     "en-GB" : ["United Kingdom","United Kingdom","United Kingdom","GB","GBR"],
     "en-HK" : ["Hong Kong","Hong Kong S.A.R.","Hong Kong","HK","HKG"],
     "en-IE" : ["Ireland","Ireland","Ireland","IE","IRL"],
     "en-IN" : ["India","India","India","IN","IND"],
     "en-JM" : ["Jamaica","Jamaica","Jamaica","JM","JAM"],
     "en-MY" : ["Malaysia","Malaysia","Malaysia","MY","MYS"],
     "en-NZ" : ["New Zealand","New Zealand","New Zealand","NZ","NZL"],
     "en-PH" : ["Philippines","Philippines","Philippines","PH","PHL"],
     "en-SG" : ["Singapore","Singapore","Singapore","SG","SGP"],
     "en-TT" : ["Trinidad and Tobago","Trinidad and Tobago","Trinidad and Tobago","TT","TTO"],
     "en-US" : ["United States","United States","United States","US","USA"],
     "en-ZA" : ["South Africa","South Africa","South Africa","ZA","ZAF"],
     "en-ZW" : ["Zimbabwe","Zimbabwe","Zimbabwe","ZW","ZWE"],
     "es-419" : ["Latin America","Latinoamérica","Latinoamérica","419","419"],
     "es-AR" : ["Argentina","Argentina","Argentina","AR","ARG"],
     "es-BO" : ["Bolivia","Bolivia","Bolivia","BO","BOL"],
     "es-CL" : ["Chile","Chile","Chile","CL","CHL"],
     "es-CO" : ["Colombia","Colombia","Colombia","CO","COL"],
     "es-CR" : ["Costa Rica","Costa Rica","Costa Rica","CR","CRI"],
     "es-DO" : ["Dominican Republic","Dominican Republic","República Dominicana","DO","DOM"],
     "es-EC" : ["Ecuador","Ecuador","Ecuador","EC","ECU"],
     "es-ES" : ["Spain","Spain","España","ES","ESP"],
     "es-GT" : ["Guatemala","Guatemala","Guatemala","GT","GTM"],
     "es-HN" : ["Honduras","Honduras","Honduras","HN","HND"],
     "es-MX" : ["Mexico","Mexico","México","MX","MEX"],
     "es-NI" : ["Nicaragua","Nicaragua","Nicaragua","NI","NIC"],
     "es-PA" : ["Panama","Panama","Panamá","PA","PAN"],
     "es-PE" : ["Peru","Peru","Perú","PE","PER"],
     "es-PR" : ["Puerto Rico","Puerto Rico","Puerto Rico","PR","PRI"],
     "es-PY" : ["Paraguay","Paraguay","Paraguay","PY","PRY"],
     "es-SV" : ["El Salvador","El Salvador","El Salvador","SV","SLV"],
     "es-US" : ["United States","United States","Estados Unidos","US","USA"],
     "es-UY" : ["Uruguay","Uruguay","Uruguay","UY","URY"],
     "es-VE" : ["Bolivarian Republic of Venezuela","Bolivarian Republic of Venezuela","Republica Bolivariana de Venezuela","VE","VEN"],
     "et-EE" : ["Estonia","Estonia","Eesti","EE","EST"],
     "eu-ES" : ["Spain","Spain","Espainia","ES","ESP"],
     "fa-IR" : ["Iran","Iran","ایران","IR","IRN"],
     "ff-Latn-SN" : ["Senegal","Senegal","Sénégal","SN","SEN"],
     "fi-FI" : ["Finland","Finland","Suomi","FI","FIN"],
     "fil-PH" : ["Philippines","Philippines","Pilipinas","PH","PHL"],
     "fo-FO" : ["Faroe Islands","Faroe Islands","Føroyar","FO","FRO"],
     "fr-BE" : ["Belgium","Belgium","Belgique","BE","BEL"],
     "fr-CA" : ["Canada","Canada","Canada","CA","CAN"],
     "fr-CD" : ["Congo [DRC]","Congo [RDC]","Congo [RDC]","CD","COD"],
     "fr-CH" : ["Switzerland","Switzerland","Suisse","CH","CHE"],
     "fr-CI" : ["Ivory Coast","Côte d’Ivoire","Côte d’Ivoire","CI","CIV"],
     "fr-CM" : ["Cameroon","Cameroun","Cameroun","CM","CMR"],
     "fr-FR" : ["France","France","France","FR","FRA"],
     "fr-HT" : ["Haiti","Haïti","Haïti","HT","HTI"],
     "fr-LU" : ["Luxembourg","Luxembourg","Luxembourg","LU","LUX"],
     "fr-MA" : ["Morocco","Morocco","Maroc","MA","MAR"],
     "fr-MC" : ["Principality of Monaco","Principality of Monaco","Principauté de Monaco","MC","MCO"],
     "fr-ML" : ["Mali","Mali","Mali","ML","MLI"],
     "fr-RE" : ["Réunion","Réunion","Réunion","RE","REU"],
     "fr-SN" : ["Senegal","Senegal","Sénégal","SN","SEN"],
     "fy-NL" : ["Netherlands","Netherlands","Nederlân","NL","NLD"],
     "ga-IE" : ["Ireland","Ireland","Éire","IE","IRL"],
     "gd-GB" : ["United Kingdom","United Kingdom","An Rìoghachd Aonaichte","GB","GBR"],
     "gl-ES" : ["Spain","Spain","España","ES","ESP"],
     "gn-PY" : ["Paraguay","Paraguay","Paraguái","PY","PRY"],
     "gsw-FR" : ["France","France","Frànkrisch","FR","FRA"],
     "gu-IN" : ["India","India","ભારત","IN","IND"],
     "ha-Latn-NG" : ["Nigeria","Nigeria","Nijeriya","NG","NGA"],
     "haw-US" : ["United States","United States","ʻAmelika","US","USA"],
     "he-IL" : ["Israel","Israel","ישראל","IL","ISR"],
     "hi-IN" : ["India","India","भारत","IN","IND"],
     "hr-BA" : ["Bosnia and Herzegovina","Bosnia and Herzegovina","Bosna i Hercegovina","BA","BIH"],
     "hr-HR" : ["Croatia","Croatia","Hrvatska","HR","HRV"],
     "hsb-DE" : ["Germany","Germany","Němska","DE","DEU"],
     "hu-HU" : ["Hungary","Hungary","Magyarország","HU","HUN"],
     "hy-AM" : ["Armenia","Armenia","Հայաստան","AM","ARM"],
     "id-ID" : ["Indonesia","Indonesia","Indonesia","ID","IDN"],
     "ig-NG" : ["Nigeria","Nigeria","Nigeria","NG","NGA"],
     "ii-CN" : ["China","People's Republic of China","ꍏꉸꏓꂱꇭꉼꇩ","CN","CHN"],
     "is-IS" : ["Iceland","Iceland","Ísland","IS","ISL"],
     "it-CH" : ["Switzerland","Switzerland","Svizzera","CH","CHE"],
     "it-IT" : ["Italy","Italy","Italia","IT","ITA"],
     "iu-Cans-CA" : ["Canada","Canada","ᑲᓇᑕ","CA","CAN"],
     "iu-Latn-CA" : ["Canada","Canada","Kanata","CA","CAN"],
     "ja-JP" : ["Japan","Japan","日本","JP","JPN"],
     "jv-Latn-ID" : ["Indonesia","Indonesia","Indonesia","ID","IDN"],
     "ka-GE" : ["Georgia","Georgia","საქართველო","GE","GEO"],
     "kk-KZ" : ["Kazakhstan","Kazakhstan","Қазақстан","KZ","KAZ"],
     "kl-GL" : ["Greenland","Greenland","Kalaallit Nunaat","GL","GRL"],
     "km-KH" : ["Cambodia","Cambodia","កម្ពុជា","KH","KHM"],
     "kn-IN" : ["India","India","ಭಾರತ","IN","IND"],
     "ko-KR" : ["Korea","Korea","대한민국","KR","KOR"],
     "kok-IN" : ["India","India","भारत","IN","IND"],
     "ku-Arab-IQ" : ["Iraq","Iraq","کوردستان","IQ","IRQ"],
     "ky-KG" : ["Kyrgyzstan","Kyrgyzstan","Кыргызстан","KG","KGZ"],
     "lb-LU" : ["Luxembourg","Luxembourg","Lëtzebuerg","LU","LUX"],
     "lo-LA" : ["Lao PDR","Lao P.D.R.","ສປປ ລາວ","LA","LAO"],
     "lt-LT" : ["Lithuania","Lithuania","Lietuva","LT","LTU"],
     "lv-LV" : ["Latvia","Latvia","Latvija","LV","LVA"],
     "mg-MG" : ["Indonesia","Indonesia","Indonesia","ID","IDN"],
     "mi-NZ" : ["New Zealand","New Zealand","Aotearoa","NZ","NZL"],
     "mk-MK" : ["Macedonia (Former Yugoslav Republic of Macedonia)","Macedonia (FYROM)","Македонија","MK","MKD"],
     "ml-IN" : ["India","India","ഭാരതം","IN","IND"],
     "mn-MN" : ["Mongolia","Mongolia","Монгол улс","MN","MNG"],
     "mn-Mong-CN" : ["China","People's Republic of China","ᠪᠦᠭᠦᠳᠡ ᠨᠠᠢᠷᠠᠮᠳᠠᠬᠤ ᠳᠤᠮᠳᠠᠳᠤ ᠠᠷᠠᠳ ᠣᠯᠣᠰ","CN","CHN"],
     "mn-Mong-MN" : ["Mongolia","Mongolia","ᠮᠤᠨᠭᠭᠤᠯ ᠣᠯᠣᠰ","MN","MNG"],
     "moh-CA" : ["Canada","Canada","Canada","CA","CAN"],
     "mr-IN" : ["India","India","भारत","IN","IND"],
     "ms-BN" : ["Brunei Darussalam","Brunei Darussalam","Brunei Darussalam","BN","BRN"],
     "ms-MY" : ["Malaysia","Malaysia","Malaysia","MY","MYS"],
     "mt-MT" : ["Malta","Malta","Malta","MT","MLT"],
     "my-MM" : ["Myanmar","မြန်မာ","မြန်မာ","MM","MMR"],
     "nb-NO" : ["Norway","Norway","Norge","NO","NOR"],
     "ne-IN" : ["India","India","भारत","IN","IND"],
     "ne-NP" : ["Nepal","Nepal","नेपाल","NP","NPL"],
     "nl-BE" : ["Belgium","Belgium","België","BE","BEL"],
     "nl-NL" : ["Netherlands","Netherlands","Nederland","NL","NLD"],
     "nn-NO" : ["Norway","Norway","Noreg","NO","NOR"],
     "nqo-GN" : ["Indonesia","Indonesia","Indonesia","ID","IDN"],
     "nso-ZA" : ["South Africa","South Africa","Afrika Borwa","ZA","ZAF"],
     "oc-FR" : ["France","France","França","FR","FRA"],
     "om-ET" : ["Ethiopia","Ethiopia","Itoophiyaa","ET","ETH"],
     "or-IN" : ["India","India","ଭାରତ","IN","IND"],
     "pa-Arab-PK" : ["Pakistan","Islamic Republic of Pakistan","پاکستان","PK","PAK"],
     "pa-IN" : ["India","India","ਭਾਰਤ","IN","IND"],
     "pl-PL" : ["Poland","Poland","Polska","PL","POL"],
     "prs-AF" : ["Afghanistan","Afghanistan","افغانستان","AF","AFG"],
     "ps-AF" : ["Afghanistan","Afghanistan","افغانستان","AF","AFG"],
     "pt-AO" : ["Indonesia","Indonesia","Indonesia","ID","IDN"],
     "pt-BR" : ["Brazil","Brazil","Brasil","BR","BRA"],
     "pt-PT" : ["Portugal","Portugal","Portugal","PT","PRT"],
     "qut-GT" : ["Guatemala","Guatemala","Guatemala","GT","GTM"],
     "quz-BO" : ["Bolivia","Bolivia","Bolivia Suyu","BO","BOL"],
     "quz-EC" : ["Ecuador","Ecuador","Ecuador Suyu","EC","ECU"],
     "quz-PE" : ["Peru","Peru","Peru","PE","PER"],
     "rm-CH" : ["Switzerland","Switzerland","Svizra","CH","CHE"],
     "ro-MD" : ["Moldova","Republica Moldova","Republica Moldova","MD","MDA"],
     "ro-RO" : ["Romania","Romania","România","RO","ROU"],
     "ru-RU" : ["Russia","Russia","Россия","RU","RUS"],
     "rw-RW" : ["Rwanda","Rwanda","Rwanda","RW","RWA"],
     "sa-IN" : ["India","India","भारतम्","IN","IND"],
     "sah-RU" : ["Russia","Russia","Россия","RU","RUS"],
     "sd-Arab-PK" : ["Pakistan","Islamic Republic of Pakistan","پاکستان","PK","PAK"],
     "se-FI" : ["Finland","Finland","Suopma","FI","FIN"],
     "se-NO" : ["Norway","Norway","Norga","NO","NOR"],
     "se-SE" : ["Sweden","Sweden","Ruoŧŧa","SE","SWE"],
     "si-LK" : ["Sri Lanka","Sri Lanka","ශ්‍රී ලංකා","LK","LKA"],
     "sk-SK" : ["Slovakia","Slovakia","Slovenská republika","SK","SVK"],
     "sl-SI" : ["Slovenia","Slovenia","Slovenija","SI","SVN"],
     "sma-NO" : ["Norway","Norway","Nöörje","NO","NOR"],
     "sma-SE" : ["Sweden","Sweden","Sveerje","SE","SWE"],
     "smj-NO" : ["Norway","Norway","Vuodna","NO","NOR"],
     "smj-SE" : ["Sweden","Sweden","Svierik","SE","SWE"],
     "smn-FI" : ["Finland","Finland","Suomâ","FI","FIN"],
     "sms-FI" : ["Finland","Finland","Lää´ddjânnam","FI","FIN"],
     "sn-Latn-ZW" : ["Indonesia","Indonesia","Indonesia","ID","IDN"],
     "so-SO" : ["Somalia","Soomaaliya","Soomaaliya","SO","SOM"],
     "sq-AL" : ["Albania","Albania","Shqipëria","AL","ALB"],
     "sr-Cyrl-BA" : ["Bosnia and Herzegovina","Bosnia and Herzegovina","Босна и Херцеговина","BA","BIH"],
     "sr-Cyrl-CS" : ["Serbia and Montenegro (Former)","Serbia and Montenegro (Former)","Србија и Црна Гора (Бивша)","CS","SCG"],
     "sr-Cyrl-ME" : ["Montenegro","Montenegro","Црна Гора","ME","MNE"],
     "sr-Cyrl-RS" : ["Serbia","Serbia","Србија","RS","SRB"],
     "sr-Latn-BA" : ["Bosnia and Herzegovina","Bosnia and Herzegovina","Bosna i Hercegovina","BA","BIH"],
     "sr-Latn-CS" : ["Serbia and Montenegro (Former)","Serbia and Montenegro (Former)","Srbija i Crna Gora (Bivša)","CS","SCG"],
     "sr-Latn-ME" : ["Montenegro","Montenegro","Crna Gora","ME","MNE"],
     "sr-Latn-RS" : ["Serbia","Serbia","Srbija","RS","SRB"],
     "st-ZA" : ["South Africa","South Africa","South Africa","ZA","ZAF"],
     "sv-FI" : ["Finland","Finland","Finland","FI","FIN"],
     "sv-SE" : ["Sweden","Sweden","Sverige","SE","SWE"],
     "sw-KE" : ["Kenya","Kenya","Kenya","KE","KEN"],
     "syr-SY" : ["Syria","Syria","ܣܘܪܝܐ","SY","SYR"],
     "ta-IN" : ["India","India","இந்தியா","IN","IND"],
     "ta-LK" : ["Sri Lanka","Sri Lanka","இலங்கை","LK","LKA"],
     "te-IN" : ["India","India","భారత దేశం","IN","IND"],
     "tg-Cyrl-TJ" : ["Tajikistan","Tajikistan","Тоҷикистон","TJ","TAJ"],
     "th-TH" : ["Thailand","Thailand","ไทย","TH","THA"],
     "ti-ER" : ["Eritrea","Eritrea","ኤርትራ","ER","ERI"],
     "ti-ET" : ["Ethiopia","Ethiopia","ኢትዮጵያ","ET","ETH"],
     "tk-TM" : ["Turkmenistan","Turkmenistan","Türkmenistan","TM","TKM"],
     "tn-BW" : ["Botswana","Botswana","Botswana","BW","BWA"],
     "tn-ZA" : ["South Africa","South Africa","Aforika Borwa","ZA","ZAF"],
     "tr-TR" : ["Turkey","Turkey","Türkiye","TR","TUR"],
     "ts-ZA" : ["South Africa","South Africa","South Africa","ZA","ZAF"],
     "tt-RU" : ["Russia","Russia","Россия","RU","RUS"],
     "tzm-Latn-DZ" : ["Algeria","Algeria","Djazaïr","DZ","DZA"],
     "tzm-Tfng-MA" : ["Morocco","Morocco","ⵍⵎⵖⵔⵉⴱ","MA","MAR"],
     "ug-CN" : ["China","People's Republic of China","جۇڭخۇا خەلق جۇمھۇرىيىتى","CN","CHN"],
     "uk-UA" : ["Ukraine","Ukraine","Україна","UA","UKR"],
     "ur-IN" : ["India","India","بھارت","IN","IND"],
     "ur-PK" : ["Pakistan","Islamic Republic of Pakistan","پاکستان","PK","PAK"],
     "uz-Cyrl-UZ" : ["Uzbekistan","Uzbekistan","Ўзбекистон Республикаси","UZ","UZB"],
     "uz-Latn-UZ" : ["Uzbekistan","Uzbekistan","O'zbekiston Respublikasi","UZ","UZB"],
     "vi-VN" : ["Vietnam","Vietnam","Việt Nam","VN","VNM"],
     "wo-SN" : ["Senegal","Senegal","Senegaal","SN","SEN"],
     "xh-ZA" : ["South Africa","South Africa","uMzantsi Afrika","ZA","ZAF"],
     "yo-NG" : ["Nigeria","Nigeria","Nigeria","NG","NGA"],
     "zgh-Tfng-MA" : ["Indonesia","Indonesia","Indonesia","ID","IDN"],
     "zh-CN" : ["China","People's Republic of China","中华人民共和国","CN","CHN"],
     "zh-HK" : ["Hong Kong SAR","Hong Kong S.A.R.","香港特別行政區","HK","HKG"],
     "zh-MO" : ["Macao SAR","Macao S.A.R.","澳門特別行政區","MO","MAC"],
     "zh-SG" : ["Singapore","Singapore","新加坡","SG","SGP"],
     "zh-TW" : ["Taiwan","Taiwan","台灣","TW","TWN"],
     "zu-ZA" : ["South Africa","South Africa","iNingizimu Afrika","ZA","ZAF"]
}

var localeMonthNames={
     "af-ZA" : [["Januarie","Jan"],["Februarie","Feb"],["Maart","Mar"],["April","Apr"],["Mei","Mei"],["Junie","Jun"],["Julie","Jul"],["Augustus","Aug"],["September","Sep"],["Oktober","Okt"],["November","Nov"],["Desember","Des"]],
     "am-ET" : [["ጥር","ጥር"],["የካቲት","የካ."],["መጋቢት","መጋ."],["ሚያዚያ","ሚያ."],["ግንቦት","ግን."],["ሰኔ","ሰኔ"],["ሐምሌ","ሐም."],["ነሐሴ","ነሐ."],["መስከረም","መስ."],["ጥቅምት","ጥቅ."],["ህዳር","ህዳ."],["ታህሳስ","ታህ."]],
     "ar-AE" : [["يناير","يناير"],["فبراير","فبراير"],["مارس","مارس"],["أبريل","أبريل"],["مايو","مايو"],["يونيو","يونيو"],["يوليه","يوليه"],["أغسطس","أغسطس"],["سبتمبر","سبتمبر"],["أكتوبر","أكتوبر"],["نوفمبر","نوفمبر"],["ديسمبر","ديسمبر"]],
     "ar-BH" : [["يناير","يناير"],["فبراير","فبراير"],["مارس","مارس"],["أبريل","ابريل"],["مايو","مايو"],["يونيو","يونيو"],["يوليه","يوليو"],["أغسطس","اغسطس"],["سبتمبر","سبتمبر"],["أكتوبر","اكتوبر"],["نوفمبر","نوفمبر"],["ديسمبر","ديسمبر"]],
     "ar-DZ" : [["جانفييه","جانفييه"],["فيفرييه","فيفرييه"],["مارس","مارس"],["أفريل","أفريل"],["مي","مي"],["جوان","جوان"],["جوييه","جوييه"],["أوت","أوت"],["سبتمبر","سبتمبر"],["أكتوبر","أكتوبر"],["نوفمبر","نوفمبر"],["ديسمبر","ديسمبر"]],
     "ar-EG" : [["يناير","يناير"],["فبراير","فبراير"],["مارس","مارس"],["أبريل","أبريل"],["مايو","مايو"],["يونيو","يونيو"],["يوليه","يوليه"],["أغسطس","أغسطس"],["سبتمبر","سبتمبر"],["أكتوبر","أكتوبر"],["نوفمبر","نوفمبر"],["ديسمبر","ديسمبر"]],
     "ar-IQ" : [["كانون الثاني","كانون الثاني"],["شباط","شباط"],["آذار","آذار"],["نيسان","نيسان"],["أيار","أيار"],["حزيران","حزيران"],["تموز","تموز"],["آب","آب"],["أيلول","أيلول"],["تشرين الأول","تشرين الأول"],["تشرين الثاني","تشرين الثاني"],["كانون الأول","كانون الأول"]],
     "ar-JO" : [["كانون الثاني","كانون الثاني"],["شباط","شباط"],["آذار","آذار"],["نيسان","نيسان"],["أيار","أيار"],["حزيران","حزيران"],["تموز","تموز"],["آب","آب"],["أيلول","أيلول"],["تشرين الأول","تشرين الأول"],["تشرين الثاني","تشرين الثاني"],["كانون الأول","كانون الأول"]],
     "ar-KW" : [["يناير","يناير"],["فبراير","فبراير"],["مارس","مارس"],["أبريل","أبريل"],["مايو","مايو"],["يونيو","يونيو"],["يوليه","يوليه"],["أغسطس","أغسطس"],["سبتمبر","سبتمبر"],["أكتوبر","أكتوبر"],["نوفمبر","نوفمبر"],["ديسمبر","ديسمبر"]],
     "ar-LB" : [["كانون الثاني","كانون الثاني"],["شباط","شباط"],["آذار","آذار"],["نيسان","نيسان"],["أيار","أيار"],["حزيران","حزيران"],["تموز","تموز"],["آب","آب"],["أيلول","أيلول"],["تشرين الأول","تشرين الأول"],["تشرين الثاني","تشرين الثاني"],["كانون الأول","كانون الأول"]],
     "ar-LY" : [["يناير","يناير"],["فبراير","فبراير"],["مارس","مارس"],["أبريل","أبريل"],["مايو","مايو"],["يونيو","يونيو"],["يوليه","يوليه"],["أغسطس","أغسطس"],["سبتمبر","سبتمبر"],["أكتوبر","أكتوبر"],["نوفمبر","نوفمبر"],["ديسمبر","ديسمبر"]],
     "ar-MA" : [["يناير","يناير"],["فبراير","فبراير"],["مارس","مارس"],["أبريل","أبريل"],["ماي","ماي"],["يونيو","يونيو"],["يوليوز","يوليوز"],["غشت","غشت"],["شتنبر","شتنبر"],["أكتوبر","أكتوبر"],["نونبر","نونبر"],["دجنبر","دجنبر"]],
     "ar-OM" : [["يناير","يناير"],["فبراير","فبراير"],["مارس","مارس"],["أبريل","أبريل"],["مايو","مايو"],["يونيو","يونيو"],["يوليه","يوليه"],["أغسطس","أغسطس"],["سبتمبر","سبتمبر"],["أكتوبر","أكتوبر"],["نوفمبر","نوفمبر"],["ديسمبر","ديسمبر"]],
     "ar-QA" : [["يناير","يناير"],["فبراير","فبراير"],["مارس","مارس"],["أبريل","أبريل"],["مايو","مايو"],["يونيو","يونيو"],["يوليه","يوليه"],["أغسطس","أغسطس"],["سبتمبر","سبتمبر"],["أكتوبر","أكتوبر"],["نوفمبر","نوفمبر"],["ديسمبر","ديسمبر"]],
     "ar-SA" : [["محرم","محرم"],["صفر","صفر"],["ربيع الأول","ربيع الأول"],["ربيع الثاني","ربيع الثاني"],["جمادى الأولى","جمادى الأولى"],["جمادى الثانية","جمادى الثانية"],["رجب","رجب"],["شعبان","شعبان"],["رمضان","رمضان"],["شوال","شوال"],["ذو القعدة","ذو القعدة"],["ذو الحجة","ذو الحجة"]],
     "ar-SY" : [["كانون الثاني","كانون الثاني"],["شباط","شباط"],["آذار","آذار"],["نيسان","نيسان"],["أيار","أيار"],["حزيران","حزيران"],["تموز","تموز"],["آب","آب"],["أيلول","أيلول"],["تشرين الأول","تشرين الأول"],["تشرين الثاني","تشرين الثاني"],["كانون الأول","كانون الأول"]],
     "ar-TN" : [["جانفييه","جانفييه"],["فيفرييه","فيفرييه"],["مارس","مارس"],["أفريل","أفريل"],["مي","مي"],["جوان","جوان"],["جوييه","جوييه"],["أوت","أوت"],["سبتمبر","سبتمبر"],["أكتوبر","أكتوبر"],["نوفمبر","نوفمبر"],["ديسمبر","ديسمبر"]],
     "ar-YE" : [["يناير","يناير"],["فبراير","فبراير"],["مارس","مارس"],["أبريل","أبريل"],["مايو","مايو"],["يونيو","يونيو"],["يوليه","يوليه"],["أغسطس","أغسطس"],["سبتمبر","سبتمبر"],["أكتوبر","أكتوبر"],["نوفمبر","نوفمبر"],["ديسمبر","ديسمبر"]],
     "arn-CL" : [["Kiñe Tripantu","Kiñe Tripantu"],["Epu","Epu"],["Kila","Kila"],["Meli","Meli"],["Kechu","Kechu"],["Cayu","Cayu"],["Regle","Regle"],["Purha","Purha"],["Aiya","Aiya"],["Marhi","Marhi"],["Marhi Kiñe","Marhi Kiñe"],["Marhi Epu","Marhi Epu"]],
     "as-IN" : [["জানুৱাৰী","জানু"],["ফেব্রুৱাৰী","ফেব্রু"],["মার্চ","মার্চ"],["এপ্রিল","এপ্রিল"],["মে","মে"],["জুন","জুন"],["জুলাই","জুলাই"],["আগষ্ট","আগষ্ট"],["চেপ্টেম্বৰ","চেপ্টে"],["অক্টোবৰ","অক্টো"],["নবেম্বৰ","নবে"],["ডিচেম্বৰ","ডিচে"]],
     "az-Cyrl-AZ" : [["jанвар","Јан"],["феврал","Фев"],["март","Мар"],["апрел","Апр"],["мај","Мај"],["ијун","Ијун"],["ијул","Ијул"],["август","Авг"],["сентјабр","Сен"],["октјабр","Окт"],["нојабр","Ноя"],["декабр","Дек"]],
     "az-Latn-AZ" : [["yanvar","Yan"],["fevral","Fev"],["mart","Mar"],["aprel","Apr"],["may","May"],["iyun","İyun"],["iyul","İyul"],["avgust","Avg"],["sentyabr","Sen"],["oktyabr","Okt"],["noyabr","Noy"],["dekabr","Dek"]],
     "ba-RU" : [["ғинуар","ғин"],["февраль","фев"],["март","мар"],["апрель","апр"],["май","май"],["июнь","июн"],["июль","июл"],["август","авг"],["сентябрь","сен"],["октябрь","окт"],["ноябрь","ноя"],["декабрь","дек"]],
     "be-BY" : [["студзень","студз"],["люты","лют"],["сакавік","сак"],["красавік","крас"],["май","май"],["чэрвень","чэрв"],["ліпень","ліп"],["жнівень","жн"],["верасень","вер"],["кастрычнік","кастр"],["лістапад","ліст"],["снежань","снеж"]],
     "bg-BG" : [["януари","яну"],["февруари","фев"],["март","мар"],["април","апр"],["май","май"],["юни","юни"],["юли","юли"],["август","авг"],["септември","сеп"],["октомври","окт"],["ноември","ное"],["декември","дек"]],
     "bn-BD" : [["জানুয়ারী","জানু."],["ফেব্রুয়ারী","ফেব্রু."],["মার্চ","মার্চ"],["এপ্রিল","এপ্রিল"],["মে","মে"],["জুন","জুন"],["জুলাই","জুলাই"],["আগস্ট","আগ."],["সেপ্টেম্বর","সেপ্টে."],["অক্টোবর","অক্টো."],["নভেম্বর","নভে."],["ডিসেম্বর","ডিসে."]],
     "bn-IN" : [["জানুয়ারী","জানু."],["ফেব্রুয়ারী","ফেব্রু."],["মার্চ","মার্চ"],["এপ্রিল","এপ্রিল"],["মে","মে"],["জুন","জুন"],["জুলাই","জুলাই"],["আগস্ট","আগ."],["সেপ্টেম্বর","সেপ্টে."],["অক্টোবর","অক্টো."],["নভেম্বর","নভে."],["ডিসেম্বর","ডিসে."]],
     "bo-CN" : [["སྤྱི་ཟླ་དང་པོ།","ཟླ་ ༡"],["སྤྱི་ཟླ་གཉིས་པ།","ཟླ་ ༢"],["སྤྱི་ཟླ་གསུམ་པ།","ཟླ་ ༣"],["སྤྱི་ཟླ་བཞི་པ།","ཟླ་ ༤"],["སྤྱི་ཟླ་ལྔ་པ།","ཟླ་ ༥"],["སྤྱི་ཟླ་དྲུག་པ།","ཟླ་ ༦"],["སྤྱི་ཟླ་བདུན་པ།","ཟླ་ ༧"],["སྤྱི་ཟླ་བརྒྱད་པ།","ཟླ་ ༨"],["སྤྱི་ཟླ་དགུ་པ།","ཟླ་ ༩"],["སྤྱི་ཟླ་བཅུ་པ།","ཟླ་ ༡༠"],["སྤྱི་ཟླ་བཅུ་གཅིག་པ།","ཟླ་ ༡༡"],["སྤྱི་ཟླ་བཅུ་གཉིས་པ།","ཟླ་ ༡༢"]],
     "br-FR" : [["Genver","Gen."],["C'hwevrer","C'hwe."],["Meurzh","Meur."],["Ebrel","Ebr."],["Mae","Mae"],["Mezheven","Mezh."],["Gouere","Goue."],["Eost","Eost"],["Gwengolo","Gwen."],["Here","Here"],["Du","Du"],["Kerzu","Kzu"]],
     "bs-Cyrl-BA" : [["јануар","јан"],["фебруар","феб"],["март","мар"],["април","апр"],["мај","мај"],["јун","јун"],["јул","јул"],["август","авг"],["септембар","сеп"],["октобар","окт"],["новембар","нов"],["децембар","дец"]],
     "bs-Latn-BA" : [["januar","jan"],["februar","feb"],["mart","mar"],["april","apr"],["maj","maj"],["juni","jun"],["juli","jul"],["august","aug"],["septembar","sep"],["oktobar","okt"],["novembar","nov"],["decembar","dec"]],
     "ca-ES" : [["gener","gen."],["febrer","febr."],["març","març"],["abril","abr."],["maig","maig"],["juny","juny"],["juliol","jul."],["agost","ag."],["setembre","set."],["octubre","oct."],["novembre","nov."],["desembre","des."]],
     "ca-ES-valencia" : [["gener","gen."],["febrer","febr."],["març","març"],["abril","abr."],["maig","maig"],["juny","juny"],["juliol","jul."],["agost","ag."],["setembre","set."],["octubre","oct."],["novembre","nov."],["desembre","des."]],
     "chr-Cher-US" : [["ᎤᏃᎸᏔᏅ","ᎤᏃᎸ"],["ᎧᎦᎵ","ᎧᎦᎵ"],["ᎠᏅᏱ","ᎠᏅᏱ"],["ᏝᏬᏂ","ᏝᏬᏂ"],["ᎠᏂᏍᎬᏘ","ᎠᏂᏍ"],["ᏕᎭᎷᏱ","ᏕᎭᎷ"],["ᎫᏰᏉᏂ","ᎫᏰᏉ"],["ᎦᎶᏂ","ᎦᎶᏂ"],["ᏚᎵᏍᏗ","ᏚᎵᏍ"],["ᏚᏂᏅᏗ","ᏚᏂᏅ"],["ᏅᏓᏕᏆ","ᏅᏓᏕ"],["ᎤᏍᎩᏱ","ᎤᏍᎩ"]],
     "co-FR" : [["ghjennaghju","ghje"],["ferraghju","ferr"],["marzu","marz"],["aprile","apri"],["maghju","magh"],["ghjunghju","ghju"],["lugliu","lugl"],["aostu","aost"],["settembre","sett"],["ottobre","otto"],["nuvembre","nuve"],["dicembre","dice"]],
     "cs-CZ" : [["leden","I"],["únor","II"],["březen","III"],["duben","IV"],["květen","V"],["červen","VI"],["červenec","VII"],["srpen","VIII"],["září","IX"],["říjen","X"],["listopad","XI"],["prosinec","XII"]],
     "cy-GB" : [["Ionawr","Ion"],["Chwefror","Chwef"],["Mawrth","Maw"],["Ebrill","Ebr"],["Mai","Mai"],["Mehefin","Meh"],["Gorffennaf","Gorff"],["Awst","Awst"],["Medi","Medi"],["Hydref","Hyd"],["Tachwedd","Tach"],["Rhagfyr","Rhag"]],
     "da-DK" : [["januar","jan"],["februar","feb"],["marts","mar"],["april","apr"],["maj","maj"],["juni","jun"],["juli","jul"],["august","aug"],["september","sep"],["oktober","okt"],["november","nov"],["december","dec"]],
     "de-AT" : [["Jänner","Jän"],["Februar","Feb"],["März","Mär"],["April","Apr"],["Mai","Mai"],["Juni","Jun"],["Juli","Jul"],["August","Aug"],["September","Sep"],["Oktober","Okt"],["November","Nov"],["Dezember","Dez"]],
     "de-CH" : [["Januar","Jan"],["Februar","Feb"],["März","Mrz"],["April","Apr"],["Mai","Mai"],["Juni","Jun"],["Juli","Jul"],["August","Aug"],["September","Sep"],["Oktober","Okt"],["November","Nov"],["Dezember","Dez"]],
     "de-DE" : [["Januar","Jan"],["Februar","Feb"],["März","Mrz"],["April","Apr"],["Mai","Mai"],["Juni","Jun"],["Juli","Jul"],["August","Aug"],["September","Sep"],["Oktober","Okt"],["November","Nov"],["Dezember","Dez"]],
     "de-LI" : [["Januar","Jan"],["Februar","Feb"],["März","Mrz"],["April","Apr"],["Mai","Mai"],["Juni","Jun"],["Juli","Jul"],["August","Aug"],["September","Sep"],["Oktober","Okt"],["November","Nov"],["Dezember","Dez"]],
     "de-LU" : [["Januar","Jan"],["Februar","Feb"],["März","Mrz"],["April","Apr"],["Mai","Mai"],["Juni","Jun"],["Juli","Jul"],["August","Aug"],["September","Sep"],["Oktober","Okt"],["November","Nov"],["Dezember","Dez"]],
     "dsb-DE" : [["januar","jan"],["februar","feb"],["měrc","měr"],["apryl","apr"],["maj","maj"],["junij","jun"],["julij","jul"],["awgust","awg"],["september","sep"],["oktober","okt"],["nowember","now"],["december","dec"]],
     "dv-MV" : [["ޖަނަވަރީ","ޖަނަވަރީ"],["ފެބްރުއަރީ","ފެބްރުއަރީ"],["މާރޗް","މާރޗް"],["އޭޕްރިލް","އޭޕްރިލް"],["މެއި","މެއި"],["ޖޫން","ޖޫން"],["ޖުލައި","ޖުލައި"],["އޮގަސްޓް","އޮގަސްޓް"],["ސެޕްޓެމްބަރ","ސެޕްޓެމްބަރ"],["އޮކްޓޯބަރ","އޮކްޓޯބަރ"],["ނޮވެމްބަރ","ނޮވެމްބަރ"],["ޑިސެމްބަރ","ޑިސެމްބަރ"]],
     "el-GR" : [["Ιανουάριος","Ιαν"],["Φεβρουάριος","Φεβ"],["Μάρτιος","Μαρ"],["Απρίλιος","Απρ"],["Μάιος","Μαϊ"],["Ιούνιος","Ιουν"],["Ιούλιος","Ιουλ"],["Αύγουστος","Αυγ"],["Σεπτέμβριος","Σεπ"],["Οκτώβριος","Οκτ"],["Νοέμβριος","Νοε"],["Δεκέμβριος","Δεκ"]],
     "en-029" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-AU" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-BZ" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-CA" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-GB" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-HK" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-IE" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-IN" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-JM" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-MY" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-NZ" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-PH" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-SG" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-TT" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-US" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-ZA" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "en-ZW" : [["January","Jan"],["February","Feb"],["March","Mar"],["April","Apr"],["May","May"],["June","Jun"],["July","Jul"],["August","Aug"],["September","Sep"],["October","Oct"],["November","Nov"],["December","Dec"]],
     "es-419" : [["enero","ene"],["febrero","feb"],["marzo","mar"],["abril","abr"],["mayo","mayo"],["junio","jun"],["julio","jul"],["agosto","ago"],["septiembre","sep"],["octubre","oct"],["noviembre","nov"],["diciembre","dic"]],
     "es-AR" : [["enero","ene"],["febrero","feb"],["marzo","mar"],["abril","abr"],["mayo","may"],["junio","jun"],["julio","jul"],["agosto","ago"],["septiembre","sep"],["octubre","oct"],["noviembre","nov"],["diciembre","dic"]],
     "es-BO" : [["enero","ene"],["febrero","feb"],["marzo","mar"],["abril","abr"],["mayo","may"],["junio","jun"],["julio","jul"],["agosto","ago"],["septiembre","sep"],["octubre","oct"],["noviembre","nov"],["diciembre","dic"]],
     "es-CL" : [["enero","ene"],["febrero","feb"],["marzo","mar"],["abril","abr"],["mayo","may"],["junio","jun"],["julio","jul"],["agosto","ago"],["septiembre","sep"],["octubre","oct"],["noviembre","nov"],["diciembre","dic"]],
     "es-CO" : [["enero","ene."],["febrero","feb."],["marzo","mar."],["abril","abr."],["mayo","may."],["junio","jun."],["julio","jul."],["agosto","ago."],["septiembre","sep."],["octubre","oct."],["noviembre","nov."],["diciembre","dic."]],
     "es-CR" : [["enero","ene"],["febrero","feb"],["marzo","mar"],["abril","abr"],["mayo","may"],["junio","jun"],["julio","jul"],["agosto","ago"],["septiembre","sep"],["octubre","oct"],["noviembre","nov"],["diciembre","dic"]],
     "es-DO" : [["enero","ene."],["febrero","feb."],["marzo","mar."],["abril","abr."],["mayo","may."],["junio","jun."],["julio","jul."],["agosto","ago."],["septiembre","sep."],["octubre","oct."],["noviembre","nov."],["diciembre","dic."]],
     "es-EC" : [["enero","ene"],["febrero","feb"],["marzo","mar"],["abril","abr"],["mayo","may"],["junio","jun"],["julio","jul"],["agosto","ago"],["septiembre","sep"],["octubre","oct"],["noviembre","nov"],["diciembre","dic"]],
     "es-ES" : [["enero","ene."],["febrero","feb."],["marzo","mar."],["abril","abr."],["mayo","may."],["junio","jun."],["julio","jul."],["agosto","ago."],["septiembre","sep."],["octubre","oct."],["noviembre","nov."],["diciembre","dic."]],
     "es-GT" : [["enero","ene."],["febrero","feb."],["marzo","mar."],["abril","abr."],["mayo","may."],["junio","jun."],["julio","jul."],["agosto","ago."],["septiembre","sep."],["octubre","oct."],["noviembre","nov."],["diciembre","dic."]],
     "es-HN" : [["enero","ene."],["febrero","feb."],["marzo","mar."],["abril","abr."],["mayo","may."],["junio","jun."],["julio","jul."],["agosto","ago."],["septiembre","sept."],["octubre","oct."],["noviembre","nov."],["diciembre","dic."]],
     "es-MX" : [["enero","ene."],["febrero","feb."],["marzo","mar."],["abril","abr."],["mayo","may."],["junio","jun."],["julio","jul."],["agosto","ago."],["septiembre","sep."],["octubre","oct."],["noviembre","nov."],["diciembre","dic."]],
     "es-NI" : [["enero","ene"],["febrero","feb"],["marzo","mar"],["abril","abr"],["mayo","may"],["junio","jun"],["julio","jul"],["agosto","ago"],["septiembre","sep"],["octubre","oct"],["noviembre","nov"],["diciembre","dic"]],
     "es-PA" : [["enero","ene."],["febrero","feb."],["marzo","mar."],["abril","abr."],["mayo","may."],["junio","jun."],["julio","jul."],["agosto","ago."],["septiembre","sep."],["octubre","oct."],["noviembre","nov."],["diciembre","dic."]],
     "es-PE" : [["enero","ene"],["febrero","feb"],["marzo","mar"],["abril","abr"],["mayo","may"],["junio","jun"],["julio","jul"],["agosto","ago"],["septiembre","sep"],["octubre","oct"],["noviembre","nov"],["diciembre","dic"]],
     "es-PR" : [["enero","ene"],["febrero","feb"],["marzo","mar"],["abril","abr"],["mayo","may"],["junio","jun"],["julio","jul"],["agosto","ago"],["septiembre","sep"],["octubre","oct"],["noviembre","nov"],["diciembre","dic"]],
     "es-PY" : [["enero","ene"],["febrero","feb"],["marzo","mar"],["abril","abr"],["mayo","may"],["junio","jun"],["julio","jul"],["agosto","ago"],["septiembre","sep"],["octubre","oct"],["noviembre","nov"],["diciembre","dic"]],
     "es-SV" : [["enero","ene"],["febrero","feb"],["marzo","mar"],["abril","abr"],["mayo","may"],["junio","jun"],["julio","jul"],["agosto","ago"],["septiembre","sep"],["octubre","oct"],["noviembre","nov"],["diciembre","dic"]],
     "es-US" : [["enero","ene"],["febrero","feb"],["marzo","mar"],["abril","abr"],["mayo","may"],["junio","jun"],["julio","jul"],["agosto","ago"],["septiembre","sep"],["octubre","oct"],["noviembre","nov"],["diciembre","dic"]],
     "es-UY" : [["enero","ene"],["febrero","feb"],["marzo","mar"],["abril","abr"],["mayo","may"],["junio","jun"],["julio","jul"],["agosto","ago"],["septiembre","set"],["octubre","oct"],["noviembre","nov"],["diciembre","dic"]],
     "es-VE" : [["enero","ene"],["febrero","feb"],["marzo","mar"],["abril","abr"],["mayo","may"],["junio","jun"],["julio","jul"],["agosto","ago"],["septiembre","sep"],["octubre","oct"],["noviembre","nov"],["diciembre","dic"]],
     "et-EE" : [["jaanuar","jaan"],["veebruar","veebr"],["märts","märts"],["aprill","apr"],["mai","mai"],["juuni","juuni"],["juuli","juuli"],["august","aug"],["september","sept"],["oktoober","okt"],["november","nov"],["detsember","dets"]],
     "eu-ES" : [["urtarrila","urt."],["otsaila","ots."],["martxoa","mar."],["apirila","api."],["maiatza","mai."],["ekaina","eka."],["uztaila","uzt."],["abuztua","abu."],["iraila","ira."],["urria","urr."],["azaroa","aza."],["abendua","abe."]],
     "fa-IR" : [["ژانويه","ژانويه"],["فوريه","فوريه"],["مارس","مارس"],["آوريل","آوريل"],["مه","مه"],["ژوئن","ژوئن"],["ژوئيه","ژوئيه"],["اوت","اوت"],["سپتامبر","سپتامبر"],["اُكتبر","اُكتبر"],["نوامبر","نوامبر"],["دسامبر","دسامبر"]],
     "ff-Latn-SN" : [["samwiee","samw"],["feeburyee","feeb"],["marsa","mar"],["awril","awr"],["me","me"],["suyeŋ","suy"],["sulyee","sul"],["ut","ut"],["satambara","sat"],["oktoobar","okt"],["nowamburu","now"],["deesamburu","dees"]],
     "fi-FI" : [["tammikuu","tammi"],["helmikuu","helmi"],["maaliskuu","maalis"],["huhtikuu","huhti"],["toukokuu","touko"],["kesäkuu","kesä"],["heinäkuu","heinä"],["elokuu","elo"],["syyskuu","syys"],["lokakuu","loka"],["marraskuu","marras"],["joulukuu","joulu"]],
     "fil-PH" : [["Enero","Ene"],["Pebrero","Peb"],["Marso","Mar"],["Abril","Abr"],["Mayo","Mayo"],["Hunyo","Hun"],["Hulyo","Hul"],["Agosto","Ago"],["Setyembre","Set"],["Oktubre","Okt"],["Nobyembre","Nob"],["Disyembre","Dis"]],
     "fo-FO" : [["januar","jan"],["februar","feb"],["mars","mar"],["apríl","apr"],["mai","mai"],["juni","jun"],["juli","jul"],["august","aug"],["september","sep"],["oktober","okt"],["november","nov"],["desember","des"]],
     "fr-BE" : [["janvier","janv."],["février","févr."],["mars","mars"],["avril","avr."],["mai","mai"],["juin","juin"],["juillet","juil."],["août","août"],["septembre","sept."],["octobre","oct."],["novembre","nov."],["décembre","déc."]],
     "fr-CA" : [["janvier","janv."],["février","févr."],["mars","mars"],["avril","avr."],["mai","mai"],["juin","juin"],["juillet","juil."],["août","août"],["septembre","sept."],["octobre","oct."],["novembre","nov."],["décembre","déc."]],
     "fr-CD" : [["janvier","janv."],["février","févr."],["mars","mars"],["avril","avr."],["mai","mai"],["juin","juin"],["juillet","juil."],["août","août"],["septembre","sept."],["octobre","oct."],["novembre","nov."],["décembre","déc."]],
     "fr-CH" : [["janvier","janv."],["février","févr."],["mars","mars"],["avril","avr."],["mai","mai"],["juin","juin"],["juillet","juil."],["août","août"],["septembre","sept."],["octobre","oct."],["novembre","nov."],["décembre","déc."]],
     "fr-CI" : [["janvier","janv."],["février","févr."],["mars","mars"],["avril","avr."],["mai","mai"],["juin","juin"],["juillet","juil."],["août","août"],["septembre","sept."],["octobre","oct."],["novembre","nov."],["décembre","déc."]],
     "fr-CM" : [["janvier","janv."],["février","févr."],["mars","mars"],["avril","avr."],["mai","mai"],["juin","juin"],["juillet","juil."],["août","août"],["septembre","sept."],["octobre","oct."],["novembre","nov."],["décembre","déc."]],
     "fr-FR" : [["janvier","janv."],["février","févr."],["mars","mars"],["avril","avr."],["mai","mai"],["juin","juin"],["juillet","juil."],["août","août"],["septembre","sept."],["octobre","oct."],["novembre","nov."],["décembre","déc."]],
     "fr-HT" : [["janvier","janv."],["février","févr."],["mars","mars"],["avril","avr."],["mai","mai"],["juin","juin"],["juillet","juil."],["août","août"],["septembre","sept."],["octobre","oct."],["novembre","nov."],["décembre","déc."]],
     "fr-LU" : [["janvier","janv."],["février","févr."],["mars","mars"],["avril","avr."],["mai","mai"],["juin","juin"],["juillet","juil."],["août","août"],["septembre","sept."],["octobre","oct."],["novembre","nov."],["décembre","déc."]],
     "fr-MA" : [["janvier","janv."],["février","févr."],["mars","mars"],["avril","avr."],["mai","mai"],["juin","juin"],["juillet","juil."],["août","août"],["septembre","sept."],["octobre","oct."],["novembre","nov."],["décembre","déc."]],
     "fr-MC" : [["janvier","janv."],["février","févr."],["mars","mars"],["avril","avr."],["mai","mai"],["juin","juin"],["juillet","juil."],["août","août"],["septembre","sept."],["octobre","oct."],["novembre","nov."],["décembre","déc."]],
     "fr-ML" : [["janvier","janv."],["février","févr."],["mars","mars"],["avril","avr."],["mai","mai"],["juin","juin"],["juillet","juil."],["août","août"],["septembre","sept."],["octobre","oct."],["novembre","nov."],["décembre","déc."]],
     "fr-RE" : [["janvier","janv."],["février","févr."],["mars","mars"],["avril","avr."],["mai","mai"],["juin","juin"],["juillet","juil."],["août","août"],["septembre","sept."],["octobre","oct."],["novembre","nov."],["décembre","déc."]],
     "fr-SN" : [["janvier","janv."],["février","févr."],["mars","mars"],["avril","avr."],["mai","mai"],["juin","juin"],["juillet","juil."],["août","août"],["septembre","sept."],["octobre","oct."],["novembre","nov."],["décembre","déc."]],
     "fy-NL" : [["jannewaris","jan"],["febrewaris","feb"],["maart","mrt"],["april","apr"],["maaie","maa"],["juny","jun"],["july","jul"],["augustus","aug"],["septimber","sep"],["oktober","okt"],["novimber","nov"],["desimber","des"]],
     "ga-IE" : [["Eanáir","Ean"],["Feabhra","Feabh"],["Márta","Már"],["Aibreán","Aib"],["Bealtaine","Bealt"],["Meitheamh","Meith"],["Iúil","Iúil"],["Lúnasa","Lún"],["Meán Fómhair","M.Fómh"],["Deireadh Fómhair","D.Fómh"],["Samhain","Samh"],["Nollaig","Noll"]],
     "gd-GB" : [["Am Faoilleach","Faoi"],["An Gearran","Gear"],["Am Màrt","Màrt"],["An Giblean","Gibl"],["An Cèitean","Cèit"],["An t-Ògmhios","Ògmh"],["An t-Iuchar","Iuch"],["An Lùnastal","Lùn"],["An t-Sultain","Sult"],["An Dàmhair","Dàmh"],["An t-Samhain","Samh"],["An Dùbhlachd","Dùbh"]],
     "gl-ES" : [["xaneiro","xan"],["febreiro","feb"],["marzo","mar"],["abril","abr"],["maio","maio"],["xuño","xuño"],["xullo","xul"],["agosto","ago"],["setembro","set"],["outubro","out"],["novembro","nov"],["decembro","dec"]],
     "gn-PY" : [["jasyteĩ","jteĩ"],["jasykõi","jkõi"],["jasyapy","japy"],["jasyrundy","jrun"],["jasypo","jpo"],["jasypoteĩ","jpot"],["jasypokõi","jpok"],["jasypoapy","jpoa"],["jasyporundy","jpor"],["jasypa","jpa"],["jasypateĩ","jpat"],["jasypakõi","jpak"]],
     "gsw-FR" : [["Jänner","Jän."],["Feverje","Fev."],["März","März"],["Àpril","Apr."],["Mai","Mai"],["Jüni","Jüni"],["Jüli","Jüli"],["Augscht","Aug."],["September","Sept."],["Oktower","Okt."],["Nowember","Now."],["Dezember","Dez."]],
     "gu-IN" : [["જાન્યુઆરી","જાન્યુ"],["ફેબ્રુઆરી","ફેબ્રુ"],["માર્ચ","માર્ચ"],["એપ્રિલ","એપ્રિલ"],["મે","મે"],["જૂન","જૂન"],["જુલાઈ","જુલાઈ"],["ઑગસ્ટ","ઑગ"],["સપ્ટેમ્બર","સપ્ટે"],["ઑક્ટોબર","ઑક્ટો"],["નવેમ્બર","નવે"],["ડિસેમ્બર","ડિસે"]],
     "ha-Latn-NG" : [["Janairu","Jan"],["Fabrairu","Fab"],["Maris","Mar"],["Afrilu","Afr"],["Mayu","May"],["Yuni","Yun"],["Yuli","Yul"],["Agusta","Agu"],["Satumba","Sat"],["Oktoba","Okt"],["Nuwamba","Nuw"],["Disamba","Dis"]],
     "haw-US" : [["Ianuali","Ian"],["Pepeluali","Pep"],["Malaki","Mal"],["ʻApelila","ʻAp"],["Mei","Mei"],["Iune","Iun"],["Iulai","Iul"],["ʻAukake","ʻAuk"],["Kepakemapa","Kep"],["ʻOkakopa","ʻOk"],["Nowemapa","Now"],["Kekemapa","Kek"]],
     "he-IL" : [["ינואר","ינו"],["פברואר","פבר"],["מרץ","מרץ"],["אפריל","אפר"],["מאי","מאי"],["יוני","יונ"],["יולי","יול"],["אוגוסט","אוג"],["ספטמבר","ספט"],["אוקטובר","אוק"],["נובמבר","נוב"],["דצמבר","דצמ"]],
     "hi-IN" : [["जनवरी","जनवरी"],["फरवरी","फरवरी"],["मार्च","मार्च"],["अप्रैल","अप्रैल"],["मई","मई"],["जून","जून"],["जुलाई","जुलाई"],["अगस्त","अगस्त"],["सितम्बर","सितम्बर"],["अक्तूबर","अक्तूबर"],["नवम्बर","नवम्बर"],["दिसम्बर","दिसम्बर"]],
     "hr-BA" : [["siječanj","sij"],["veljača","vlj"],["ožujak","ožu"],["travanj","tra"],["svibanj","svi"],["lipanj","lip"],["srpanj","srp"],["kolovoz","kol"],["rujan","ruj"],["listopad","lis"],["studeni","stu"],["prosinac","pro"]],
     "hr-HR" : [["siječanj","sij"],["veljača","vlj"],["ožujak","ožu"],["travanj","tra"],["svibanj","svi"],["lipanj","lip"],["srpanj","srp"],["kolovoz","kol"],["rujan","ruj"],["listopad","lis"],["studeni","stu"],["prosinac","pro"]],
     "hsb-DE" : [["januar","jan"],["februar","feb"],["měrc","měr"],["apryl","apr"],["meja","mej"],["junij","jun"],["julij","jul"],["awgust","awg"],["september","sep"],["oktober","okt"],["nowember","now"],["december","dec"]],
     "hu-HU" : [["január","jan."],["február","febr."],["március","márc."],["április","ápr."],["május","máj."],["június","jún."],["július","júl."],["augusztus","aug."],["szeptember","szept."],["október","okt."],["november","nov."],["december","dec."]],
     "hy-AM" : [["Հունվար","Հնվ"],["Փետրվար","Փտվ"],["Մարտ","Մրտ"],["Ապրիլ","Ապր"],["Մայիս","Մյս"],["Հունիս","Հնս"],["Հուլիս","Հլս"],["Օգոստոս","Օգս"],["Սեպտեմբեր","Սպտ"],["Հոկտեմբեր","Հկտ"],["Նոյեմբեր","Նյմ"],["Դեկտեմբեր","Դկտ"]],
     "id-ID" : [["Januari","Jan"],["Februari","Feb"],["Maret","Mar"],["April","Apr"],["Mei","Mei"],["Juni","Jun"],["Juli","Jul"],["Agustus","Agu"],["September","Sep"],["Oktober","Okt"],["November","Nov"],["Desember","Des"]],
     "ig-NG" : [["Jenụwarị","Jen"],["Febụwarị","Feb"],["Machị","Mac"],["Eprelu","Epr"],["Mey","Mey"],["Juun","Jun"],["Julaị","Jul"],["Ọgọst","Ọgọ"],["Septemba","Sep"],["Ọcktọba","Ọkt"],["Nọvemba","Nọv"],["Disemba","Dis"]],
     "ii-CN" : [["ꋍꆪ","ꋍꆪ"],["ꑍꆪ","ꑍꆪ"],["ꌕꆪ","ꌕꆪ"],["ꇖꆪ","ꇖꆪ"],["ꉬꆪ","ꉬꆪ"],["ꃘꆪ","ꃘꆪ"],["ꏃꆪ","ꏃꆪ"],["ꉆꆪ","ꉆꆪ"],["ꈬꆪ","ꈬꆪ"],["ꊰꆪ","ꊰꆪ"],["ꊯꊪꆪ","ꊯꊪꆪ"],["ꊰꑋꆪ","ꊰꑋꆪ"]],
     "is-IS" : [["janúar","jan."],["febrúar","feb."],["mars","mar."],["apríl","apr."],["maí","maí"],["júní","jún."],["júlí","júl."],["ágúst","ágú."],["september","sep."],["október","okt."],["nóvember","nóv."],["desember","des."]],
     "it-CH" : [["gennaio","gen"],["febbraio","feb"],["marzo","mar"],["aprile","apr"],["maggio","mag"],["giugno","giu"],["luglio","lug"],["agosto","ago"],["settembre","set"],["ottobre","ott"],["novembre","nov"],["dicembre","dic"]],
     "it-IT" : [["gennaio","gen"],["febbraio","feb"],["marzo","mar"],["aprile","apr"],["maggio","mag"],["giugno","giu"],["luglio","lug"],["agosto","ago"],["settembre","set"],["ottobre","ott"],["novembre","nov"],["dicembre","dic"]],
     "iu-Cans-CA" : [["ᔮᓐᓄᐊᕆ","ᔮᓐᓄ"],["ᕖᕝᕗᐊᕆ","ᕖᕝᕗ"],["ᒫᑦᓯ","ᒫᑦᓯ"],["ᐄᐳᕆ","ᐄᐳᕆ"],["ᒪᐃ","ᒪᐃ"],["ᔫᓂ","ᔫᓂ"],["ᔪᓚᐃ","ᔪᓚᐃ"],["ᐋᒡᒌᓯ","ᐋᒡᒌ"],["ᓯᑎᐱᕆ","ᓯᑎᐱ"],["ᐅᑐᐱᕆ","ᐅᑐᐱ"],["ᓄᕕᐱᕆ","ᓄᕕᐱ"],["ᑎᓯᐱᕆ","ᑎᓯᐱ"]],
     "iu-Latn-CA" : [["Jaannuari","Jan"],["Viivvuari","Viv"],["Maatsi","Mas"],["Iipuri","Ipu"],["Mai","Mai"],["Juuni","Jun"],["Julai","Jul"],["Aaggiisi","Agi"],["Sitipiri","Sii"],["Utupiri","Uut"],["Nuvipiri","Nuv"],["Tisipiri","Tis"]],
     "ja-JP" : [["1月","1"],["2月","2"],["3月","3"],["4月","4"],["5月","5"],["6月","6"],["7月","7"],["8月","8"],["9月","9"],["10月","10"],["11月","11"],["12月","12"]],
     "jv-Latn-ID" : [["Januari","Jan"],["Februari","Feb"],["Maret","Mar"],["April","Apr"],["Mei","Mei"],["Juni","Jun"],["Juli","Jul"],["Agustus","Agust"],["September","Sep"],["Oktober","Okt"],["November","Nov"],["Desember","Des"]],
     "ka-GE" : [["იანვარი","იან"],["თებერვალი","თებ"],["მარტი","მარ"],["აპრილი","აპრ"],["მაისი","მაის"],["ივნისი","ივნ"],["ივლისი","ივლ"],["აგვისტო","აგვ"],["სექტემბერი","სექ"],["ოქტომბერი","ოქტ"],["ნოემბერი","ნოემ"],["დეკემბერი","დეკ"]],
     "kk-KZ" : [["қаңтар","қаң"],["ақпан","ақп"],["наурыз","нау"],["сәуір","сәу"],["мамыр","мам"],["маусым","мау"],["шілде","шіл"],["тамыз","там"],["қыркүйек","қыр"],["қазан","қаз"],["қараша","қар"],["желтоқсан","жел"]],
     "kl-GL" : [["januaari","jan"],["februaari","feb"],["marsi","mar"],["apriili","apr"],["maaji","mai"],["juuni","jun"],["juuli","jul"],["aggusti","aug"],["septembari","sep"],["oktobari","okt"],["novembari","nov"],["decembari","dec"]],
     "km-KH" : [["មករា","១"],["កុម្ភៈ","២"],["មិនា","៣"],["មេសា","៤"],["ឧសភា","៥"],["មិថុនា","៦"],["កក្កដា","៧"],["សីហា","៨"],["កញ្ញា","៩"],["តុលា","១០"],["វិច្ឆិកា","១១"],["ធ្នូ","១២"]],
     "kn-IN" : [["ಜನವರಿ","ಜನವರಿ"],["ಫೆಬ್ರವರಿ","ಫೆಬ್ರವರಿ"],["ಮಾರ್ಚ್","ಮಾರ್ಚ್"],["ಏಪ್ರೀಲ್","ಎಪ್ರಿಲ್"],["ಮೇ","ಮೇ"],["ಜೂನ್","ಜೂನ್"],["ಜುಲೈ","ಜುಲೈ"],["ಆಗಸ್ಟ್","ಆಗಸ್ಟ್"],["ಸೆಪ್ಟಂಬರ್","ಸೆಪ್ಟಂಬರ್"],["ಅಕ್ಟೋಬರ್","ಅಕ್ಟೋಬರ್"],["ನವೆಂಬರ್","ನವೆಂಬರ್"],["ಡಿಸೆಂಬರ್","ಡಿಸೆಂಬರ್"]],
     "ko-KR" : [["1월","1"],["2월","2"],["3월","3"],["4월","4"],["5월","5"],["6월","6"],["7월","7"],["8월","8"],["9월","9"],["10월","10"],["11월","11"],["12월","12"]],
     "kok-IN" : [["जानेवारी","जाने"],["फेब्रुवारी","फेब्रु"],["मार्च","मार्च"],["एप्रिल","एप्रिल"],["मे","मे"],["जून","जून"],["जुलै","जुलै"],["ऑगस्ट","ऑग."],["सप्टेंबर","सप्टें."],["ऑक्टोबर","ऑक्टो."],["नोवेम्बर","नोवे."],["डिसेंबर","डिसें"]],
     "ku-Arab-IQ" : [["کانوونی دووەم","کانوونی دووەم"],["شوبات","شوبات"],["ئازار","ئازار"],["نیسان","نیسان"],["ئایار","ئایار"],["حوزەیران","حوزەیران"],["تەمووز","تەمووز"],["ئاب","ئاب"],["ئەیلوول","ئەیلوول"],["تشرینی یەکەم","تشرینی یەکەم"],["تشرینی دووەم","تشرینی دووەم"],["کانونی یەکەم","کانونی یەکەم"]],
     "ky-KG" : [["январь","янв"],["февраль","фев"],["март","мар"],["апрель","апр"],["май","май"],["июнь","июн"],["июль","июл"],["август","авг"],["сентябрь","сен"],["октябрь","окт"],["ноябрь","ноя"],["декабрь","дек"]],
     "lb-LU" : [["Januar","Jan"],["Februar","Feb"],["Mäerz","Mäe"],["Abrëll","Abr"],["Mee","Mee"],["Juni","Jun"],["Juli","Jul"],["August","Aug"],["September","Sep"],["Oktober","Okt"],["November","Nov"],["Dezember","Dez"]],
     "lo-LA" : [["ມັງກອນ","ມ.ກ"],["ກຸມພາ","ກ.ພ"],["ມີນາ","ມິ.ນ"],["ເມສາ","ມ.ສ"],["ພຶດສະພາ","ພ.ພ"],["ມິຖຸນາ","ມິ.ຖ"],["ກໍລະກົດ","ກ.ລ"],["ສິງຫາ","ສ.ຫ"],["ກັນຍາ","ກ.ຍ"],["ຕຸລາ","ຕ.ລ"],["ພະຈິກ","ພ.ຈ"],["ທັນວາ","ທ.ວ"]],
     "lt-LT" : [["sausis","Sau"],["vasaris","Vas"],["kovas","Kov"],["balandis","Bal"],["gegužė","Geg"],["birželis","Bir"],["liepa","Lie"],["rugpjūtis","Rgp"],["rugsėjis","Rgs"],["spalis","Spl"],["lapkritis","Lap"],["gruodis","Grd"]],
     "lv-LV" : [["janvāris","jan"],["februāris","feb"],["marts","mar"],["aprīlis","apr"],["maijs","mai"],["jūnijs","jūn"],["jūlijs","jūl"],["augusts","aug"],["septembris","sep"],["oktobris","okt"],["novembris","nov"],["decembris","dec"]],
     "mg-MG" : [["Janoary","Jan"],["Febroary","Feb"],["Martsa","Mar"],["Aprily","Apr"],["Mey","Mey"],["Jona","Jon"],["Jolay","Jol"],["Aogositra","Aog"],["Septambra","Sep"],["Oktobra","Okt"],["Novambra","Nov"],["Desambra","Des"]],
     "mi-NZ" : [["Kohitātea","Kohi"],["Huitanguru","Hui"],["Poutūterangi","Pou"],["Paengawhāwhā","Pae"],["Haratua","Hara"],["Pipiri","Pipi"],["Hōngongoi","Hōngo"],["Hereturikōkā","Here"],["Mahuru","Mahu"],["Whiringa ā-nuku","Nuku"],["Whiringa ā-rangi","Rangi"],["Hakihea","Haki"]],
     "mk-MK" : [["јануари","јан"],["февруари","фев"],["март","мар"],["април","апр"],["мај","мај"],["јуни","јун"],["јули","јул"],["август","авг"],["септември","сеп"],["октомври","окт"],["ноември","ное"],["декември","дек"]],
     "ml-IN" : [["ജനുവരി","ജനുവരി"],["ഫെബ്രുവരി","ഫെബ്രുവരി"],["മാര്‍‌ച്ച്","മാര്‍‌ച്ച്"],["ഏപ്രില്‍","ഏപ്രില്‍"],["മെയ്","മെയ്"],["ജൂണ്‍","ജൂണ്‍"],["ജൂലൈ","ജൂലൈ"],["ആഗസ്റ്റ്","ആഗസ്റ്റ്"],["സെപ്‌റ്റംബര്‍","സെപ്‌റ്റംബര്‍"],["ഒക്‌ടോബര്‍","ഒക്‌ടോബര്‍"],["നവംബര്‍","നവംബര്‍"],["ഡിസംബര്‍","ഡിസംബര്‍"]],
     "mn-MN" : [["1 дүгээр сар","1-р сар"],["2 дугаар сар","2-р сар"],["3 дугаар сар","3-р сар"],["4 дүгээр сар","4-р сар"],["5 дугаар сар","5-р сар"],["6 дугаар сар","6-р сар"],["7 дугаар сар","7-р сар"],["8 дугаар сар","8-р сар"],["9 дүгээр сар","9-р сар"],["10 дугаар сар","10-р сар"],["11 дүгээр сар","11-р сар"],["12 дугаар сар","12-р сар"]],
     "mn-Mong-CN" : [["ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ"],["ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"],["ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"],["ᠲᠦᠷᠪᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠦᠷᠪᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ"],["ᠲᠠᠪᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠠᠪᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"],["ᠵᠢᠷᠭᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠵᠢᠷᠭᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"],["ᠲᠤᠯᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠤᠯᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"],["ᠨᠠᠢᠮᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠨᠠᠢᠮᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"],["ᠶᠢᠰᠦᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠶᠢᠰᠦᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ"],["ᠠᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"],["ᠠᠷᠪᠠᠨ ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ"],["ᠠᠷᠪᠠᠨ ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"]],
     "mn-Mong-MN" : [["ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ"],["ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"],["ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠭᠤᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"],["ᠲᠦᠷᠪᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠦᠷᠪᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ"],["ᠲᠠᠪᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠠᠪᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"],["ᠵᠢᠷᠭᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠵᠢᠷᠭᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"],["ᠲᠤᠯᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠲᠤᠯᠤᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"],["ᠨᠠᠢᠮᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠨᠠᠢᠮᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"],["ᠶᠢᠰᠦᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠶᠢᠰᠦᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ"],["ᠠᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"],["ᠠᠷᠪᠠᠨ ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠨᠢᠭᠡᠳᠦᠭᠡᠷ ᠰᠠᠷ᠎ᠠ"],["ᠠᠷᠪᠠᠨ ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ","ᠠᠷᠪᠠᠨ ᠬᠤᠶ᠋ᠠᠳᠤᠭᠠᠷ ᠰᠠᠷ᠎ᠠ"]],
     "moh-CA" : [["Tsothohrkó:Wa","Jan"],["Enniska","Feb"],["Enniskó:Wa","Mar"],["Onerahtókha","Apr"],["Onerahtohkó:Wa","May"],["Ohiari:Ha","Jun"],["Ohiarihkó:Wa","Jul"],["Seskéha","Aug"],["Seskehkó:Wa","Sep"],["Kenténha","Oct"],["Kentenhkó:Wa","Nov"],["Tsothóhrha","Dec"]],
     "mr-IN" : [["जानेवारी","जाने."],["फेब्रुवारी","फेब्रु."],["मार्च","मार्च"],["एप्रिल","एप्रि"],["मे","मे"],["जून","जून"],["जुलै","जुलै"],["ऑगस्ट","ऑग."],["सप्टेंबर","सप्टें."],["ऑक्टोबर","ऑक्टो."],["नोव्हेंबर","नोव्हें."],["डिसेंबर","डिसें."]],
     "ms-BN" : [["Januari","Jan"],["Februari","Feb"],["Mac","Mac"],["April","Apr"],["Mei","Mei"],["Jun","Jun"],["Julai","Jul"],["Ogos","Ogos"],["September","Sept"],["Oktober","Okt"],["November","Nov"],["Disember","Dis"]],
     "ms-MY" : [["Januari","Jan"],["Februari","Feb"],["Mac","Mac"],["April","Apr"],["Mei","Mei"],["Jun","Jun"],["Julai","Jul"],["Ogos","Ogos"],["September","Sept"],["Oktober","Okt"],["November","Nov"],["Disember","Dis"]],
     "mt-MT" : [["Jannar","Jan"],["Frar","Fra"],["Marzu","Mar"],["April","Apr"],["Mejju","Mej"],["Ġunju","Ġun"],["Lulju","Lul"],["Awwissu","Aww"],["Settembru","Set"],["Ottubru","Ott"],["Novembru","Nov"],["Diċembru","Diċ"]],
     "my-MM" : [["ဇန်နဝါရီ","ဇန်"],["ဖေဖော်ဝါရီ","ဖေ"],["မတ်","မတ်"],["ဧပြီ","ဧပြီ"],["မေ","မေ"],["ဇွန်","ဇွန်"],["ဇူလိုင်","ဇူ"],["ဩဂုတ်","ဩဂု"],["စက်တင်ဘာ","စက်တ"],["အောက်တိုဘာ","အောက်"],["နိုဝင်ဘာ","နိုဝင်"],["ဒီဇင်ဘာ","ဒီဇင်"]],
     "nb-NO" : [["januar","jan"],["februar","feb"],["mars","mar"],["april","apr"],["mai","mai"],["juni","jun"],["juli","jul"],["august","aug"],["september","sep"],["oktober","okt"],["november","nov"],["desember","des"]],
     "ne-IN" : [["जनवरी","जन"],["फरवरी","फेब"],["मार्च","मार्च"],["अप्रेल","अप्रि"],["मई","मे"],["जुन","जुन"],["जुलाई","जुला"],["अगस्त","अग"],["सेप्टेम्बर","सेप्ट"],["अक्टोबर","अक्टो"],["नोभेम्बर","नोभे"],["दिसम्बर","डिसे"]],
     "ne-NP" : [["जनवरी","जन"],["फेब्रुअरी","फेब"],["मार्च","मार्च"],["अप्रिल","अप्रिल"],["मे","मे"],["जून","जून"],["जुलाई","जुलाई"],["अगस्त","अग"],["सेप्टेम्बर","सेप्ट"],["अक्टोबर","अक्ट"],["नोभेम्बर","नोभ"],["डिसेम्बर","डिस"]],
     "nl-BE" : [["januari","jan"],["februari","feb"],["maart","mrt"],["april","apr"],["mei","mei"],["juni","jun"],["juli","jul"],["augustus","aug"],["september","sep"],["oktober","okt"],["november","nov"],["december","dec"]],
     "nl-NL" : [["januari","jan"],["februari","feb"],["maart","mrt"],["april","apr"],["mei","mei"],["juni","jun"],["juli","jul"],["augustus","aug"],["september","sep"],["oktober","okt"],["november","nov"],["december","dec"]],
     "nn-NO" : [["januar","jan"],["februar","feb"],["mars","mar"],["april","apr"],["mai","mai"],["juni","jun"],["juli","jul"],["august","aug"],["september","sep"],["oktober","okt"],["november","nov"],["desember","des"]],
     "nqo-GN" : [["ߓߌ߲ߠߊߥߎߟߋ߲","ߓߌ߲ߠ"],["ߞߏ߲ߞߏߜߍ","ߞߏ߲ߞ"],["ߕߙߊߓߊ","ߕߙߊ"],["ߞߏ߲ߞߏߘߌ߬ߓߌ","ߞߏ߲ߘ"],["ߘߓߊ߬ߕߊ","ߘߓߕ"],["ߥߊ߬ߛߌߥߊ߬ߙߊ","ߥߊ߬ߛ"],["ߞߊ߬ߙߌߝߐ߭","ߞߊ߬ߙ"],["ߘߓߊ߬ߓߌߟߊ","ߘߓߊ߬"],["ߕߎߟߊߝߌ߲","ߕߎߟ"],["ߞߏ߲ߓߌߕߌ߮","ߞߏ߲ߓ"],["ߣߍߣߍߓߊ","ߣߍߣ"],["ߞߏ߬ߟߌ߲߬ߞߏߟߌ߲","ߞߏ߬ߟ"]],
     "nso-ZA" : [["Janaware","Jan"],["Feberware","Feb"],["Matšhe","Matš"],["Aprele","Apr"],["Mei","Mei"],["June","June"],["Julae","Julae"],["Agostose","Agost"],["Setemere","Set"],["Oktoboro","Oky"],["Nofemere","Nof"],["Disemere","Dis"]],
     "oc-FR" : [["genièr","gen."],["febrièr","feb."],["març","març"],["abril","abr."],["mai","mai"],["junh","junh"],["julhet","julh"],["agost","ag."],["setembre","set."],["octobre","oct."],["novembre","nov."],["decembre","dec."]],
     "om-ET" : [["Amajjii","Ama"],["Guraandhala","Gur"],["Bitooteessa","Bit"],["Elba","Elb"],["Caamsa","Cam"],["Waxabajjii","Wax"],["Adooleessa","Ado"],["Hagayya","Hag"],["Fuulbana","Ful"],["Onkololeessa","Onk"],["Sadaasa","Sad"],["Muddee","Mud"]],
     "or-IN" : [["ଜାନୁୟାରୀ","ଜାନୁୟାରୀ"],["ଫେବୃଆରୀ","ଫେବୃଆରୀ"],["ମାର୍ଚ୍ଚ","ମାର୍ଚ୍ଚ"],["ଏପ୍ରିଲ୍‌","ଏପ୍ରିଲ୍‌"],["ମେ","ମେ"],["ଜୁନ୍‌","ଜୁନ୍‌"],["ଜୁଲାଇ","ଜୁଲାଇ"],["ଅଗଷ୍ଟ","ଅଗଷ୍ଟ"],["ସେପ୍ଟେମ୍ବର","ସେପ୍ଟେମ୍ବର"],["ଅକ୍ଟୋବର","ଅକ୍ଟୋବର"],["ନଭେମ୍ବର","ନଭେମ୍ବର"],["ଡିସେମ୍ବର","ଡିସେମ୍ବର"]],
     "pa-Arab-PK" : [["جنوری","جنوری"],["فروری","فروری"],["مارچ","مارچ"],["اپریل","اپریل"],["مئی","مئی"],["جون","جون"],["جولائی","جولائی"],["اگست","اگست"],["ستمبر","ستمبر"],["اکتوبر","اکتوبر"],["نومبر","نومبر"],["دسمبر","دسمبر"]],
     "pa-IN" : [["ਜਨਵਰੀ","ਜਨਵਰੀ"],["ਫ਼ਰਵਰੀ","ਫ਼ਰਵਰੀ"],["ਮਾਰਚ","ਮਾਰਚ"],["ਅਪ੍ਰੈਲ","ਅਪ੍ਰੈਲ"],["ਮਈ","ਮਈ"],["ਜੂਨ","ਜੂਨ"],["ਜੁਲਾਈ","ਜੁਲਾਈ"],["ਅਗਸਤ","ਅਗਸਤ"],["ਸਤੰਬਰ","ਸਤੰਬਰ"],["ਅਕਤੂਬਰ","ਅਕਤੂਬਰ"],["ਨਵੰਬਰ","ਨਵੰਬਰ"],["ਦਸੰਬਰ","ਦਸੰਬਰ"]],
     "pl-PL" : [["styczeń","sty"],["luty","lut"],["marzec","mar"],["kwiecień","kwi"],["maj","maj"],["czerwiec","cze"],["lipiec","lip"],["sierpień","sie"],["wrzesień","wrz"],["październik","paź"],["listopad","lis"],["grudzień","gru"]],
     "prs-AF" : [["محرّم","محرّم"],["صفر","صفر"],["ربيع الأوّل","ربيع الأوّل"],["ربيع الثاني","ربيع الثاني"],["جمادى الأول","جمادى الأول"],["جمادى الثاني","جمادى الثاني"],["رجب","رجب"],["شعبان","شعبان"],["رمضان","رمضان"],["شوّال","شوّال"],["ذو القعدة","ذو القعدة"],["ذو الحجّة","ذو الحجّة"]],
     "ps-AF" : [["محرم","محرم"],["صفر","صفر"],["ربيع الأوّل","ربيع الأوّل"],["ربيع الثاني","ربيع الثاني"],["جمادى الأول","جمادى الأول"],["جمادى الثانى","جمادى الثانى"],["رجب","رجب"],["شعبان","شعبان"],["رمضان","رمضان"],["شوّال","شوّال"],["ذو القعدة","ذو القعدة"],["ذو الحجّة","ذو الحجّة"]],
     "pt-AO" : [["janeiro","jan"],["fevereiro","fev"],["março","mar"],["abril","abr"],["maio","mai"],["junho","jun"],["julho","jul"],["agosto","ago"],["setembro","set"],["outubro","out"],["novembro","nov"],["dezembro","dez"]],
     "pt-BR" : [["janeiro","jan"],["fevereiro","fev"],["março","mar"],["abril","abr"],["maio","mai"],["junho","jun"],["julho","jul"],["agosto","ago"],["setembro","set"],["outubro","out"],["novembro","nov"],["dezembro","dez"]],
     "pt-PT" : [["janeiro","jan"],["fevereiro","fev"],["março","mar"],["abril","abr"],["maio","mai"],["junho","jun"],["julho","jul"],["agosto","ago"],["setembro","set"],["outubro","out"],["novembro","nov"],["dezembro","dez"]],
     "qut-GT" : [["nab'e ik'","nab'e"],["ukab' ik'","ukab'"],["urox ik'","urox"],["ukaj ik'","ukaj"],["uro ik'","uro"],["uwaq ik'","uwaq"],["uwuq ik'","uwuq"],["uwajxaq ik'","uwajxaq"],["ub'elej ik'","ub'elej"],["ulaj ik'","ulaj"],["ujulaj ik'","ujulaj"],["ukab'laj ik'","ukab'laj"]],
     "quz-BO" : [["Qulla puquy","Qul"],["Hatun puquy","Hat"],["Pauqar waray","Pau"],["ayriwa","ayr"],["Aymuray","Aym"],["Inti raymi","Int"],["Anta Sitwa","Ant"],["Qhapaq Sitwa","Qha"],["Uma raymi","Uma"],["Kantaray","Kan"],["Ayamarq'a","Aya"],["Kapaq Raymi","Kap"]],
     "quz-EC" : [["kulla","kull"],["panchi","pan"],["pawkar","paw"],["ayriwa","ayr"],["aymuray","aym"],["raymi","ray"],["sitwa","sit"],["karwa","kar"],["kuski","kus"],["wayru","way"],["sasi","sas"],["kapak","kap"]],
     "quz-PE" : [["Qulla puquy","Qul"],["Hatun puquy","Hat"],["Pauqar waray","Pau"],["ayriwa","ayr"],["Aymuray","Aym"],["Inti raymi","Int"],["Anta Sitwa","Ant"],["Qhapaq Sitwa","Qha"],["Uma raymi","Uma"],["Kantaray","Kan"],["Ayamarq'a","Aya"],["Kapaq Raymi","Kap"]],
     "rm-CH" : [["schaner","schan."],["favrer","favr."],["mars","mars"],["avrigl","avr."],["matg","matg"],["zercladur","zercl."],["fanadur","fan."],["avust","avust"],["settember","sett."],["october","oct."],["november","nov."],["december","dec."]],
     "ro-MD" : [["ianuarie","ian."],["februarie","feb."],["martie","mar."],["aprilie","apr."],["mai","mai"],["iunie","iun."],["iulie","iul."],["august","aug."],["septembrie","sept."],["octombrie","oct."],["noiembrie","nov."],["decembrie","dec."]],
     "ro-RO" : [["ianuarie","ian."],["februarie","feb."],["martie","mar."],["aprilie","apr."],["mai","mai."],["iunie","iun."],["iulie","iul."],["august","aug."],["septembrie","sep."],["octombrie","oct."],["noiembrie","nov."],["decembrie","dec."]],
     "ru-RU" : [["Январь","янв"],["Февраль","фев"],["Март","мар"],["Апрель","апр"],["Май","май"],["Июнь","июн"],["Июль","июл"],["Август","авг"],["Сентябрь","сен"],["Октябрь","окт"],["Ноябрь","ноя"],["Декабрь","дек"]],
     "rw-RW" : [["Mutarama","Mut"],["Gashyantare","Gas"],["Werurwe","Wer"],["Mata","Mat"],["Gicurasi","Gic"],["Kamena","Kam"],["Nyakanga","Nyak"],["Kanama","Kan"],["Nzeli","Nze"],["Ukwakira","Ukwak"],["Ugushyingo","Ugus"],["Ukuboza","Ukub"]],
     "sa-IN" : [["जान्युअरी","जान्युअरी"],["फेब्रुअरी","फेब्रुअरी"],["मार्च","मार्च"],["एप्रिल","एप्रिल"],["मे","मे"],["जून","जुन"],["जुलै","जुलै"],["ऑगस्ट","ऑगस्ट"],["सप्टेंबर","सप्टेंबर"],["ऑक्टोबर","ऑक्टोबर"],["नोव्हेंबर","नोव्हेंबर"],["डिसेंबर","डिसेंबर"]],
     "sah-RU" : [["Тохсунньу","Тхс"],["Олунньу","Олн"],["Кулун тутар","Клн"],["Муус устар","Мсу"],["Ыам ыйа","Ыам"],["Бэс ыйа","Бэс"],["От ыйа","Оты"],["Атырдьах ыйа","Атр"],["Балаҕан ыйа","Блҕ"],["Алтынньы","Алт"],["Сэтинньи","Сэт"],["Ахсынньы","Ахс"]],
     "sd-Arab-PK" : [["جنوري","جنوري"],["فروري","فروري"],["مارچ","مارچ"],["اپريل","اپريل"],["مٔي","مٔي"],["جون","جون"],["جولاءِ","جولاءِ"],["آگست","آگست"],["ستمبر","ستمبر"],["آکتوبر","آکتوبر"],["نومبر","نومبر"],["ڊسمبر","ڊسمبر"]],
     "se-FI" : [["ođđajagemánu","ođđj"],["guovvamánnu","guov"],["njukčamánnu","njuk"],["cuoŋománnu","cuoŋ"],["miessemánnu","mies"],["geassemánnu","geas"],["suoidnemánnu","suoi"],["borgemánnu","borg"],["čakčamánnu","čakč"],["golggotmánnu","golg"],["skábmamánnu","skáb"],["juovlamánnu","juov"]],
     "se-NO" : [["ođđajagemánnu","ođđj"],["guovvamánnu","guov"],["njukčamánnu","njuk"],["cuoŋománnu","cuoŋ"],["miessemánnu","mies"],["geassemánnu","geas"],["suoidnemánnu","suoi"],["borgemánnu","borg"],["čakčamánnu","čakč"],["golggotmánnu","golg"],["skábmamánnu","skáb"],["juovlamánnu","juov"]],
     "se-SE" : [["ođđajagemánnu","ođđj"],["guovvamánnu","guov"],["njukčamánnu","njuk"],["cuoŋománnu","cuoŋ"],["miessemánnu","mies"],["geassemánnu","geas"],["suoidnemánnu","suoi"],["borgemánnu","borg"],["čakčamánnu","čakč"],["golggotmánnu","golg"],["skábmamánnu","skáb"],["juovlamánnu","juov"]],
     "si-LK" : [["ජනවාරි","ජන."],["පෙබරවාරි","පෙබ."],["මාර්තු","මාර්තු."],["අ‌ප්‍රේල්","අප්‍රේල්."],["මැයි","මැයි"],["ජූනි","ජූනි"],["ජූලි","ජූලි"],["අ‌ගෝස්තු","අගෝ."],["සැප්තැම්බර්","සැප්."],["ඔක්තෝබර්","ඔක්."],["නොවැම්බර්","නොවැ."],["දෙසැම්බර්","දෙසැ."]],
     "sk-SK" : [["január","1"],["február","2"],["marec","3"],["apríl","4"],["máj","5"],["jún","6"],["júl","7"],["august","8"],["september","9"],["október","10"],["november","11"],["december","12"]],
     "sl-SI" : [["januar","jan"],["februar","feb"],["marec","mar"],["april","apr"],["maj","maj"],["junij","jun"],["julij","jul"],["avgust","avg"],["september","sep"],["oktober","okt"],["november","nov"],["december","dec"]],
     "sma-NO" : [["tsïengele","tsïen"],["goevte","goevt"],["njoktje","njok"],["voerhtje","voer"],["suehpede","sueh"],["ruffie","ruff"],["snjaltje","snja"],["mïetske","mïet"],["skïerede","skïer"],["golke","golk"],["rahka","rahk"],["goeve","goev"]],
     "sma-SE" : [["tsïengele","tsïen"],["goevte","goevt"],["njoktje","njok"],["voerhtje","voer"],["suehpede","sueh"],["ruffie","ruff"],["snjaltje","snja"],["mïetske","mïet"],["skïerede","skïer"],["golke","golk"],["rahka","rahk"],["goeve","goev"]],
     "smj-NO" : [["ådåjakmánno","ådåj"],["guovvamánno","guov"],["sjnjuktjamánno","snju"],["vuoratjismánno","vuor"],["moarmesmánno","moar"],["biehtsemánno","bieh"],["sjnjilltjamánno","snji"],["bårggemánno","bårg"],["ragátmánno","ragá"],["gålgådismánno","gålg"],["basádismánno","basá"],["javllamánno","javl"]],
     "smj-SE" : [["ådåjakmánno","ådåj"],["guovvamánno","guov"],["sjnjuktjamánno","snju"],["vuoratjismánno","vuor"],["moarmesmánno","moar"],["biehtsemánno","bieh"],["sjnjilltjamánno","snji"],["bårggemánno","bårg"],["ragátmánno","ragá"],["gålgådismánno","gålg"],["basádismánno","basá"],["javllamánno","javl"]],
     "smn-FI" : [["uđđâivemáánu","uđiv"],["kuovâmáánu","kuov"],["njuhčâmáánu","njuh"],["cuáŋuimáánu","cuáŋ"],["vyesimáánu","vyes"],["kesimáánu","kesi"],["syeinimáánu","syei"],["porgemáánu","porg"],["čohčâmáánu","čohč"],["roovvâdmáánu","roov"],["skammâmáánu","skam"],["juovlâmáánu","juov"]],
     "sms-FI" : [["ođđee´jjmään","ođđee´jjmään"],["tä´lvvmään","tä´lvvmään"],["pâ´zzlâšttam-mään","pâ´zzlâšttam-mään"],["njuhččmään","njuhččmään"],["vue´ssmään","vue´ssmään"],["ǩie´ssmään","ǩie´ssmään"],["suei´nnmään","suei´nnmään"],["på´rǧǧmään","på´rǧǧmään"],["čõhččmään","čõhččmään"],["kålggmään","kålggmään"],["skamm-mään","skamm-mään"],["rosttovmään","rosttovmään"]],
     "sn-Latn-ZW" : [["Ndira","Ndi"],["Kukadzi","Kuk"],["Kurume","Kur"],["Kubvumbi","Kub"],["Chivabvu","Chv"],["Chikumi","Chk"],["Chikunguru","Chg"],["Nyamavhuvhu","Nya"],["Gunyana","Gun"],["Gumiguru","Gum"],["Mbudzi","Mb"],["Zvita","Zvi"]],
     "so-SO" : [["Bisha Koobaad","Kob"],["Bisha Labaad","Lab"],["Bisha Saddexaad","Sad"],["Bisha Afraad","Afr"],["Bisha Shanaad","Sha"],["Bisha Lixaad","Lix"],["Bisha Todobaad","Tod"],["Bisha Sideedaad","Sid"],["Bisha Sagaalaad","Sag"],["Bisha Tobnaad","Tob"],["Bisha Kow iyo Tobnaad","KIT"],["Bisha Laba iyo Tobnaad","LIT"]],
     "sq-AL" : [["janar","Jan"],["shkurt","Shk"],["mars","Mar"],["prill","Pri"],["maj","Maj"],["qershor","Qer"],["korrik","Krr"],["gusht","Gsh"],["shtator","Sht"],["tetor","Tet"],["nëntor","Nën"],["dhjetor","Dhj"]],
     "sr-Cyrl-BA" : [["јануар","јан"],["фебруар","феб"],["март","мар"],["април","апр"],["мај","мај"],["јуни","јун"],["јули","јул"],["август","авг"],["септембар","сеп"],["октобар","окт"],["новембар","нов"],["децембар","дец"]],
     "sr-Cyrl-CS" : [["јануар","јан."],["фебруар","феб."],["март","март"],["април","апр."],["мај","мај"],["јун","јун"],["јул","јул"],["август","авг."],["септембар","септ."],["октобар","окт."],["новембар","нов."],["децембар","дец."]],
     "sr-Cyrl-ME" : [["јануар","јан"],["фебруар","феб"],["март","мар"],["април","апр"],["мај","мај"],["јун","јун"],["јул","јул"],["август","авг"],["септембар","сеп"],["октобар","окт"],["новембар","нов"],["децембар","дец"]],
     "sr-Cyrl-RS" : [["јануар","јан."],["фебруар","феб."],["март","март"],["април","апр."],["мај","мај"],["јун","јун"],["јул","јул"],["август","авг."],["септембар","септ."],["октобар","окт."],["новембар","нов."],["децембар","дец."]],
     "sr-Latn-BA" : [["januar","jan."],["februar","feb."],["mart","mar."],["april","apr."],["maj","maj."],["jun","jun."],["jul","jul."],["avgust","avg."],["septembar","sep."],["oktobar","okt."],["novembar","nov."],["decembar","dec."]],
     "sr-Latn-CS" : [["januar","jan."],["februar","feb."],["mart","mart"],["april","apr."],["maj","maj"],["jun","jun"],["jul","jul"],["avgust","avg."],["septembar","sept."],["oktobar","okt."],["novembar","nov."],["decembar","dec."]],
     "sr-Latn-ME" : [["januar","jan"],["februar","feb"],["mart","mar"],["april","apr"],["maj","maj"],["jun","jun"],["jul","jul"],["avgust","avg"],["septembar","sep"],["oktobar","okt"],["novembar","nov"],["decembar","dec"]],
     "sr-Latn-RS" : [["januar","jan."],["februar","feb."],["mart","mart"],["april","apr."],["maj","maj"],["jun","jun"],["jul","jul"],["avgust","avg."],["septembar","sept."],["oktobar","okt."],["novembar","nov."],["decembar","dec."]],
     "st-ZA" : [["Phesekgong","Phe"],["Hlakola","Kol"],["Hlakubele","Ube"],["Mmese","Mme"],["Motsheanong","Mot"],["Phupjane","Jan"],["Phupu","Upu"],["Phata","Pha"],["Leotshe","Leo"],["Mphalane","Mph"],["Pundungwane","Pun"],["Tshitwe","Tsh"]],
     "sv-FI" : [["januari","jan"],["februari","feb"],["mars","mar"],["april","apr"],["maj","maj"],["juni","jun"],["juli","jul"],["augusti","aug"],["september","sep"],["oktober","okt"],["november","nov"],["december","dec"]],
     "sv-SE" : [["januari","jan"],["februari","feb"],["mars","mar"],["april","apr"],["maj","maj"],["juni","jun"],["juli","jul"],["augusti","aug"],["september","sep"],["oktober","okt"],["november","nov"],["december","dec"]],
     "sw-KE" : [["Januari","Jan"],["Februari","Feb"],["Machi","Mac"],["Aprili","Apr"],["Mei","Mei"],["Juni","Jun"],["Julai","Jul"],["Agosti","Ago"],["Septemba","Sep"],["Oktoba","Okt"],["Novemba","Nov"],["Desemba","Dec"]],
     "syr-SY" : [["ܟܢܘܢ ܐܚܪܝ","܏ܟܢ ܏ܒ"],["ܫܒܛ","ܫܒܛ"],["ܐܕܪ","ܐܕܪ"],["ܢܝܣܢ","ܢܝܣܢ"],["ܐܝܪ","ܐܝܪ"],["ܚܙܝܪܢ","ܚܙܝܪܢ"],["ܬܡܘܙ","ܬܡܘܙ"],["ܐܒ","ܐܒ"],["ܐܝܠܘܠ","ܐܝܠܘܠ"],["ܬܫܪܝ ܩܕܝܡ","܏ܬܫ ܏ܐ"],["ܬܫܪܝ ܐܚܪܝ","܏ܬܫ ܏ܒ"],["ܟܢܘܢ ܩܕܝܡ","܏ܟܢ ܏ܐ"]],
     "ta-IN" : [["ஜனவரி","ஜனவரி"],["பிப்ரவரி","பிப்ரவரி"],["மார்ச்","மார்ச்"],["ஏப்ரல்","ஏப்ரல்"],["மே","மே"],["ஜூன்","ஜூன்"],["ஜூலை","ஜூலை"],["ஆகஸ்ட்","ஆகஸ்ட்"],["செப்டம்பர்","செப்டம்பர்"],["அக்டோபர்","அக்டோபர்"],["நவம்பர்","நவம்பர்"],["டிசம்பர்","டிசம்பர்"]],
     "ta-LK" : [["ஜனவரி","ஜன."],["பெப்ரவரி","பெப்."],["மார்ச்","மார்."],["ஏப்ரல்","ஏப்"],["மே","மே"],["ஜூன்","ஜூன்"],["ஜூலை","ஜூலை"],["ஓகஸ்ட்","ஓக."],["செப்ரம்பர்","செப்."],["ஒக்ரோபர்","ஒக்."],["நவம்பர்","நவ."],["டிசம்பர்","டிச."]],
     "te-IN" : [["జనవరి","జనవరి"],["ఫిబ్రవరి","ఫిబ్రవరి"],["మార్చి","మార్చి"],["ఏప్రిల్","ఏప్రిల్"],["మే","మే"],["జూన్","జూన్"],["జూలై","జూలై"],["ఆగస్టు","ఆగస్టు"],["సెప్టెంబర్","సెప్టెంబర్"],["అక్టోబర్","అక్టోబర్"],["నవంబర్","నవంబర్"],["డిసెంబర్","డిసెంబర్"]],
     "tg-Cyrl-TJ" : [["январ","янв"],["феврал","фев"],["март","мар"],["апрел","апр"],["май","май"],["июн","июн"],["июл","июл"],["август","авг"],["сентябр","сен"],["октябр","окт"],["ноябр","ноя"],["декабр","дек"]],
     "th-TH" : [["มกราคม","ม.ค."],["กุมภาพันธ์","ก.พ."],["มีนาคม","มี.ค."],["เมษายน","เม.ย."],["พฤษภาคม","พ.ค."],["มิถุนายน","มิ.ย."],["กรกฎาคม","ก.ค."],["สิงหาคม","ส.ค."],["กันยายน","ก.ย."],["ตุลาคม","ต.ค."],["พฤศจิกายน","พ.ย."],["ธันวาคม","ธ.ค."]],
     "ti-ER" : [["ጥሪ","ጥሪ"],["ለካቲት","የካቲት"],["መጋቢት","መጋቢት"],["ሚያዝያ","ሚያዝያ"],["ግንቦት","ግንቦት"],["ሰነ","ሰነ"],["ሓምለ","ሓምለ"],["ነሓሰ","ነሓሰ"],["መስከረም","መስከረም"],["ጥቅምቲ","ጥቅምቲ"],["ሕዳር","ሕዳር"],["ታሕሳስ","ታሕሳስ"]],
     "ti-ET" : [["ጥሪ","ጥሪ"],["ለካቲት","ለካቲት"],["መጋቢት","መጋቢት"],["ሚያዝያ","ሚያዝያ"],["ግንቦት","ግንቦት"],["ሰነ","ሰነ"],["ሓምለ","ሓምለ"],["ነሓሰ","ነሓሰ"],["መስከረም","መስከረም"],["ጥቅምቲ","ጥቅምቲ"],["ሕዳር","ሕዳር"],["ታሕሳስ","ታሕሳስ"]],
     "tk-TM" : [["Ýanwar","Ýan"],["Fewral","Few"],["Mart","Mart"],["Aprel","Apr"],["Maý","Maý"],["lýun","lýun"],["lýul","lýul"],["Awgust","Awg"],["Sentýabr","Sen"],["Oktýabr","Okt"],["Noýabr","Noý"],["Dekabr","Dek"]],
     "tn-BW" : [["Ferikgong","Fer."],["Tlhakole","Tlh."],["Mopitlwe","Mop."],["Moranang","Mor."],["Motsheganong","Motsh."],["Seetebosigo","Seet."],["Phukwi","Phk."],["Phatwe","Pht."],["Lwetse","Lwetse."],["Diphalane","Diph."],["Ngwanatsele","Ngwn."],["Sedimothole","Sed."]],
     "tn-ZA" : [["Ferikgong","Fer."],["Tlhakole","Tlh."],["Mopitlwe","Mop."],["Moranang","Mor."],["Motsheganong","Motsh."],["Seetebosigo","Seet."],["Phukwi","Phk."],["Phatwe","Pht."],["Lwetse","Lwetse."],["Diphalane","Diph."],["Ngwanatsele","Ngwn."],["Sedimothole","Sed."]],
     "tr-TR" : [["Ocak","Oca"],["Şubat","Şub"],["Mart","Mar"],["Nisan","Nis"],["Mayıs","May"],["Haziran","Haz"],["Temmuz","Tem"],["Ağustos","Ağu"],["Eylül","Eyl"],["Ekim","Eki"],["Kasım","Kas"],["Aralık","Ara"]],
     "ts-ZA" : [["Sunguti","Sun"],["Nyenyenyani","Yan"],["Nyenyankulu","Kul"],["Dzivamisoko","Dzi"],["Mudyaxihi","Mud"],["Khotavuxika","Kho"],["Mawuwani","Maw"],["Mhawuri","Mha"],["Ndzhati","Ndz"],["Nhlangula","Nhl"],["Hukuri","Huk"],["N'wendzamhala","N'w"]],
     "tt-RU" : [["гыйнвар","гыйн."],["февраль","фев."],["март","мар."],["апрель","апр."],["май","май"],["июнь","июнь"],["июль","июль"],["август","авг."],["сентябрь","сен."],["октябрь","окт."],["ноябрь","нояб."],["декабрь","дек."]],
     "tzm-Latn-DZ" : [["Yennayer","Yen"],["Furar","Fur"],["Meghres","Megh"],["Yebrir","Yeb"],["Magu","May"],["Yunyu","Yun"],["Yulyu","Yul"],["Ghuct","Ghu"],["Cutenber","Cut"],["Tuber","Tub"],["Nunember","Nun"],["Dujanbir","Duj"]],
     "tzm-Tfng-MA" : [["ⵉⵏⵏⴰⵢⵔ","ⵏⵢⵔ"],["ⴱⵕⴰⵢⵕ","ⴱⵕⵢ"],["ⵎⴰⵕⵚ","ⵎⵕⵚ"],["ⵉⴱⵔⵉⵔ","ⴱⵔⵔ"],["ⵎⴰⵢⵢⵓ","ⵎⵢⵢ"],["ⵢⵓⵏⵢⵓ","ⵢⵏⵢ"],["ⵢⵓⵍⵢⵓⵣ","ⵢⵍⵢ"],["ⵖⵓⵛⵜ","ⵖⵛⵜ"],["ⵛⵓⵜⴰⵏⴱⵉⵔ","ⵛⵜⵏ"],["ⴽⵜⵓⴱⵕ","ⴽⵜⴱ"],["ⵏⵓⵡⴰⵏⴱⵉⵔ","ⵏⵡⴱ"],["ⴷⵓⵊⴰⵏⴱⵉⵔ","ⴷⵊⵏ"]],
     "ug-CN" : [["يانۋار","1-ئاي"],["فېۋرال","2-ئاي"],["مارت","3-ئاي"],["ئاپرېل","4-ئاي"],["ماي","5-ئاي"],["ئىيۇن","6-ئاي"],["ئىيۇل","7-ئاي"],["ئاۋغۇست","8-ئاي"],["سېنتەبىر","9-ئاي"],["ئۆكتەبىر","10-ئاي"],["نويابىر","11-ئاي"],["دېكابىر","12-ئاي"]],
     "uk-UA" : [["Січень","Січ"],["Лютий","Лют"],["Березень","Бер"],["Квітень","Кві"],["Травень","Тра"],["Червень","Чер"],["Липень","Лип"],["Серпень","Сер"],["Вересень","Вер"],["Жовтень","Жов"],["Листопад","Лис"],["Грудень","Гру"]],
     "ur-IN" : [["جنوری","جنوری"],["فروری","فروری"],["مارچ","مارچ"],["اپریل","اپریل"],[" مئی"," مئی"],["جون","جون"],[" جولائی"," جولائی"],["اگست","اگست"],["ستمبر","ستمبر"],["اکتوبر","اکتوبر"],["نومبر","نومبر"],["دسمبر","دسمبر"]],
     "ur-PK" : [["جنوری","جنوری"],["فروری","فروری"],["مارچ","مارچ"],["اپریل","اپریل"],["مئی","مئی"],["جون","جون"],["جولائی","جولائی"],["اگست","اگست"],["ستمبر","ستمبر"],["اکتوبر","اکتوبر"],["نومبر","نومبر"],["دسمبر","دسمبر"]],
     "uz-Cyrl-UZ" : [["январ","Янв"],["феврал","Фев"],["март","Мар"],["апрел","Апр"],["май","Май"],["июн","Июн"],["июл","Июл"],["август","Авг"],["сентябр","Сен"],["октябр","Окт"],["ноябр","Ноя"],["декабр","Дек"]],
     "uz-Latn-UZ" : [["yanvar","Yan"],["fevral","Fev"],["mart","Mar"],["aprel","Apr"],["may","May"],["iyun","Iyn"],["iyul","Iyl"],["avgust","Avg"],["sentyabr","Sen"],["oktyabr","Okt"],["noyabr","Noy"],["dekabr","Dek"]],
     "vi-VN" : [["Tháng Giêng","Thg1"],["Tháng Hai","Thg2"],["Tháng Ba","Thg3"],["Tháng Tư","Thg4"],["Tháng Năm","Thg5"],["Tháng Sáu","Thg6"],["Tháng Bảy","Thg7"],["Tháng Tám","Thg8"],["Tháng Chín","Thg9"],["Tháng Mười","Thg10"],["Tháng Mười Một","Thg11"],["Tháng Mười Hai","Thg12"]],
     "wo-SN" : [["Samwiye","Sam."],["Fewriye","Few."],["Maars","Maa"],["Awril","Awr."],["Me","Me"],["Suwe","Suw"],["Sullet","Sul."],["Ut","Ut"],["Septàmbar","Sept."],["Oktoobar","Okt."],["Noowàmbar","Now."],["Desàmbar","Des."]],
     "xh-ZA" : [["uJanuwari","uJan."],["uFebuwari","uFeb."],["uMatshi","uMat."],["uAprili","uEpr."],["uMeyi","uMey."],["uJuni","uJun."],["uJulayi","uJul."],["uAgasti","uAg."],["uSeptemba","uSep."],["uOktobha","uOkt."],["uNovemba","uNov."],["uDisemba","uDis."]],
     "yo-NG" : [["Oṣu Muharram","Oṣu Muharram"],["Oṣu Safar","Oṣu Safar"],["Oṣu R Awwal","Oṣu R Awwal"],["Oṣu R Aakhir","Oṣu R Aakhir"],["Oṣu J Awwal","Oṣu J Awwal"],["Oṣu J Aakhira","Oṣu J Aakhira"],["Oṣu Rajab","Oṣu Rajab"],["Oṣu Sha'baan","Oṣu Sha'baan"],["Oṣu Ramadhan","Oṣu Ramadhan"],["Oṣu Shawwal","Oṣu Shawwal"],["Oṣu Dhul Qa'dah","Oṣu Dhul Qa'dah"],["Oṣu Dhul Hijjah","Oṣu Dhul Hijjah"]],
     "zgh-Tfng-MA" : [["ⵉⵏⵏⴰⵢⵔ","ⵏⵢⵔ"],["ⴱⵕⴰⵢⵕ","ⴱⵕⵢ"],["ⵎⴰⵕⵚ","ⵎⵕⵚ"],["ⵉⴱⵔⵉⵔ","ⴱⵔⵔ"],["ⵎⴰⵢⵢⵓ","ⵎⵢⵢ"],["ⵢⵓⵏⵢⵓ","ⵢⵏⵢ"],["ⵢⵓⵍⵢⵓⵣ","ⵢⵍⵢ"],["ⵖⵓⵛⵜ","ⵖⵛⵜ"],["ⵛⵓⵜⴰⵏⴱⵉⵔ","ⵛⵜⵏ"],["ⴽⵜⵓⴱⵕ","ⴽⵜⴱ"],["ⵏⵓⵡⴰⵏⴱⵉⵔ","ⵏⵡⴱ"],["ⴷⵓⵊⴰⵏⴱⵉⵔ","ⴷⵊⵏ"]],
     "zh-CN" : [["一月","1月"],["二月","2月"],["三月","3月"],["四月","4月"],["五月","5月"],["六月","6月"],["七月","7月"],["八月","8月"],["九月","9月"],["十月","10月"],["十一月","11月"],["十二月","12月"]],
     "zh-HK" : [["一月","一月"],["二月","二月"],["三月","三月"],["四月","四月"],["五月","五月"],["六月","六月"],["七月","七月"],["八月","八月"],["九月","九月"],["十月","十月"],["十一月","十一月"],["十二月","十二月"]],
     "zh-MO" : [["一月","一月"],["二月","二月"],["三月","三月"],["四月","四月"],["五月","五月"],["六月","六月"],["七月","七月"],["八月","八月"],["九月","九月"],["十月","十月"],["十一月","十一月"],["十二月","十二月"]],
     "zh-SG" : [["一月","一月"],["二月","二月"],["三月","三月"],["四月","四月"],["五月","五月"],["六月","六月"],["七月","七月"],["八月","八月"],["九月","九月"],["十月","十月"],["十一月","十一月"],["十二月","十二月"]],
     "zh-TW" : [["一月","一月"],["二月","二月"],["三月","三月"],["四月","四月"],["五月","五月"],["六月","六月"],["七月","七月"],["八月","八月"],["九月","九月"],["十月","十月"],["十一月","十一月"],["十二月","十二月"]],
     "zu-ZA" : [["Januwari","Jan"],["Febhuwari","Feb"],["Mashi","Mas"],["Ephreli","Eph"],["Meyi","Mey"],["Juni","Jun"],["Julayi","Jul"],["Agasti","Agas"],["Septemba","Sep"],["Okthoba","Okt"],["Novemba","Nov"],["Disemba","Dis"]]
}

var localeDayNames={
     "af-ZA" : [["Sondag","Son","So","So"],["Maandag","Maan","Ma","Ma"],["Dinsdag","Dins","Di","Di"],["Woensdag","Woen","Wo","Wo"],["Donderdag","Dond","Do","Do"],["Vrydag","Vry","Vr","Vr"],["Saterdag","Sat","Sa","Sa"]],
     "am-ET" : [["እሑድ","እሑድ","እሑ","እሑ"],["ሰኞ","ሰኞ","ሰኞ","ሰኞ"],["ማክሰኞ","ማክሰ","ማክ","ማክ"],["ረቡዕ","ረቡዕ","ረቡ","ረቡ"],["ሐሙስ","ሐሙስ","ሐሙ","ሐሙ"],["ዓርብ","ዓርብ","ዓር","ዓር"],["ቅዳሜ","ቅዳሜ","ቅዳ","ቅዳ"]],
     "ar-AE" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-BH" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-DZ" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-EG" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-IQ" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-JO" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-KW" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-LB" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-LY" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-MA" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-OM" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-QA" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-SA" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-SY" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-TN" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "ar-YE" : [["الأحد","الأحد","ح","ح"],["الإثنين","الإثنين","ن","ن"],["الثلاثاء","الثلاثاء","ث","ث"],["الأربعاء","الأربعاء","ر","ر"],["الخميس","الخميس","خ","خ"],["الجمعة","الجمعة","ج","ج"],["السبت","السبت","س","س"]],
     "arn-CL" : [["Kiñe Ante","Kiñe","kñ","kñ"],["Epu Ante","Epu","ep","ep"],["Kila Ante","Kila","kl","kl"],["Meli Ante","Meli","me","me"],["Kechu Ante","Kechu","ke","ke"],["Cayu Ante","Cayu","ca","ca"],["Regle Ante","Regle","re","re"]],
     "as-IN" : [["ৰবিবাৰ","ৰবি.","ৰ","ৰ"],["সোমবাৰ","সোম.","সো","সো"],["মঙ্গলবাৰ","মঙ্গল.","ম","ম"],["বুধবাৰ","বুধ.","বু","বু"],["বৃহস্পতিবাৰ","বৃহ.","বৃ","বৃ"],["শুক্রবাৰ","শুক্র.","শু","শু"],["শনিবাৰ","শনি.","শ","শ"]],
     "az-Cyrl-AZ" : [["базар","Б","Б","Б"],["базар ертәси","Бе","Бе","Бе"],["чәршәнбә ахшамы","Ча","Ча","Ча"],["чәршәнбә","Ч","Ч","Ч"],["ҹүмә ахшамы","Ҹа","Ҹа","Ҹа"],["ҹүмә","Ҹ","Ҹ","Ҹ"],["шәнбә","Ш","Ш","Ш"]],
     "az-Latn-AZ" : [["bazar","B","B","B"],["Bazar ertəsi","Be","Be","Be"],["çərşənbə axşamı","Ça","Ça","Ça"],["çərşənbə","Ç","Ç","Ç"],["Cümə axşamı","Ca","Ca","Ca"],["Cümə","C","C","C"],["şənbə","Ş","Ş","Ş"]],
     "ba-RU" : [["Йәкшәмбе","Йш","Йш","Йш"],["Дүшәмбе","Дш","Дш","Дш"],["Шишәмбе","Шш","Шш","Шш"],["Шаршамбы","Шр","Шр","Шр"],["Кесаҙна","Кс","Кс","Кс"],["Йома","Йм","Йм","Йм"],["Шәмбе","Шб","Шб","Шб"]],
     "be-BY" : [["нядзеля","нд","нд","нд"],["панядзелак","пн","пн","пн"],["аўторак","аўт","аў","аў"],["серада","ср","ср","ср"],["чацвер","чц","чц","чц"],["пятніца","пт","пт","пт"],["субота","сб","сб","сб"]],
     "bg-BG" : [["неделя","нед","нд","нд"],["понеделник","пон","пн","пн"],["вторник","вт","вт","вт"],["сряда","ср","ср","ср"],["четвъртък","четв","чт","чт"],["петък","пет","пт","пт"],["събота","съб","сб","сб"]],
     "bn-BD" : [["রবিবার","রবি.","র","র"],["সোমবার","সোম.","সো","সো"],["মঙ্গলবার","মঙ্গল.","ম","ম"],["বুধবার","বুধ.","বু","বু"],["বৃহস্পতিবার","বৃহ.","বৃ","বৃ"],["শুক্রবার","শুক্র.","শু","শু"],["শনিবার","শনি.","শ","শ"]],
     "bn-IN" : [["রবিবার","রবি.","র","র"],["সোমবার","সোম.","স","স"],["মঙ্গলবার","মঙ্গল.","ম","ম"],["বুধবার","বুধ.","বু","বু"],["বৃহস্পতিবার","বৃহস্পতি.","বৃ","বৃ"],["শুক্রবার","শুক্র.","শু","শু"],["শনিবার","শনি.","শ","শ"]],
     "bo-CN" : [["གཟའ་ཉི་མ།","ཉི་མ།","ཉི།","ཉི།"],["གཟའ་ཟླ་བ།","ཟླ་བ།","ཟླ།","ཟླ།"],["གཟའ་མིག་དམར།","མིག་དམར།","དམར།","དམར།"],["གཟའ་ལྷག་པ།","ལྷག་པ།","ལྷག","ལྷག"],["གཟའ་ཕུར་བུ།","ཕུར་བུ།","ཕུར།","ཕུར།"],["གཟའ་པ་སངས།","པ་སངས།","སངས།","སངས།"],["གཟའ་སྤེན་པ།","སྤེན་པ།","སྤེན།","སྤེན།"]],
     "br-FR" : [["Sul","Sul","Su","Su"],["Lun","Lun","L","L"],["Meurzh","Meu.","Mz","Mz"],["Merc'her","Mer.","Mc","Mc"],["Yaou","Yaou","Y","Y"],["Gwener","Gwe.","G","G"],["Sadorn","Sad.","Sa","Sa"]],
     "bs-Cyrl-BA" : [["недјеља","нед","н","н"],["понедјељак","пон","п","п"],["уторак","уто","у","у"],["сриједа","сре","с","с"],["четвртак","чет","ч","ч"],["петак","пет","п","п"],["субота","суб","с","с"]],
     "bs-Latn-BA" : [["nedjelja","ned","ne","ne"],["ponedjeljak","pon","po","po"],["utorak","uto","ut","ut"],["srijeda","sri","sr","sr"],["četvrtak","čet","če","če"],["petak","pet","pe","pe"],["subota","sub","su","su"]],
     "ca-ES" : [["diumenge","dg.","dg","dg"],["dilluns","dl.","dl","dl"],["dimarts","dt.","dt","dt"],["dimecres","dc.","dc","dc"],["dijous","dj.","dj","dj"],["divendres","dv.","dv","dv"],["dissabte","ds.","ds","ds"]],
     "ca-ES-valencia" : [["diumenge","dg.","dg","dg"],["dilluns","dl.","dl","dl"],["dimarts","dt.","dt","dt"],["dimecres","dc.","dc","dc"],["dijous","dj.","dj","dj"],["divendres","dv.","dv","dv"],["dissabte","ds.","ds","ds"]],
     "chr-Cher-US" : [["ᎤᎾᏙᏓᏆᏍᎬ","ᏆᏍᎬ","ᏆᏍ","ᏆᏍ"],["ᎤᎾᏙᏓᏉᏅᎯ","ᏉᏅᎯ","ᏉᏅ","ᏉᏅ"],["ᏔᎵᏁᎢᎦ","ᏔᎵᏁ","ᏔᎵ","ᏔᎵ"],["ᏦᎢᏁᎢᎦ","ᏦᎢᏁ","ᏦᎢ","ᏦᎢ"],["ᏅᎩᏁᎢᎦ","ᏅᎩᏁ","ᏅᎩ","ᏅᎩ"],["ᏧᎾᎩᎶᏍᏗ","ᏧᎾᎩ","ᏧᎾ","ᏧᎾ"],["ᎤᎾᏙᏓᏈᏕᎾ","ᏈᏕᎾ","ᏈᏕ","ᏈᏕ"]],
     "co-FR" : [["dumenica","dum.","du","du"],["luni","lun.","lu","lu"],["marti","mar.","ma","ma"],["mercuri","mer.","me","me"],["ghjovi","ghj.","gh","gh"],["venneri","ven.","ve","ve"],["sabbatu","sab.","sa","sa"]],
     "cs-CZ" : [["neděle","ne","ne","ne"],["pondělí","po","po","po"],["úterý","út","út","út"],["středa","st","st","st"],["čtvrtek","čt","čt","čt"],["pátek","pá","pá","pá"],["sobota","so","so","so"]],
     "cy-GB" : [["Dydd Sul","Sul","Su","Su"],["Dydd Llun","Llun","Ll","Ll"],["Dydd Mawrth","Maw","Ma","Ma"],["Dydd Mercher","Mer","Me","Me"],["Dydd Iau","Iau","Ia","Ia"],["Dydd Gwener","Gwe","Gw","Gw"],["Dydd Sadwrn","Sad","Sa","Sa"]],
     "da-DK" : [["søndag","sø","sø","sø"],["mandag","ma","ma","ma"],["tirsdag","ti","ti","ti"],["onsdag","on","on","on"],["torsdag","to","to","to"],["fredag","fr","fr","fr"],["lørdag","lø","lø","lø"]],
     "de-AT" : [["Sonntag","So","So","So"],["Montag","Mo","Mo","Mo"],["Dienstag","Di","Di","Di"],["Mittwoch","Mi","Mi","Mi"],["Donnerstag","Do","Do","Do"],["Freitag","Fr","Fr","Fr"],["Samstag","Sa","Sa","Sa"]],
     "de-CH" : [["Sonntag","So","So","So"],["Montag","Mo","Mo","Mo"],["Dienstag","Di","Di","Di"],["Mittwoch","Mi","Mi","Mi"],["Donnerstag","Do","Do","Do"],["Freitag","Fr","Fr","Fr"],["Samstag","Sa","Sa","Sa"]],
     "de-DE" : [["Sonntag","So","So","So"],["Montag","Mo","Mo","Mo"],["Dienstag","Di","Di","Di"],["Mittwoch","Mi","Mi","Mi"],["Donnerstag","Do","Do","Do"],["Freitag","Fr","Fr","Fr"],["Samstag","Sa","Sa","Sa"]],
     "de-LI" : [["Sonntag","So","So","So"],["Montag","Mo","Mo","Mo"],["Dienstag","Di","Di","Di"],["Mittwoch","Mi","Mi","Mi"],["Donnerstag","Do","Do","Do"],["Freitag","Fr","Fr","Fr"],["Samstag","Sa","Sa","Sa"]],
     "de-LU" : [["Sonntag","So","So","So"],["Montag","Mo","Mo","Mo"],["Dienstag","Di","Di","Di"],["Mittwoch","Mi","Mi","Mi"],["Donnerstag","Do","Do","Do"],["Freitag","Fr","Fr","Fr"],["Samstag","Sa","Sa","Sa"]],
     "dsb-DE" : [["njeźela","nje","n","n"],["ponjeźele","pon","p","p"],["wałtora","wał","w","w"],["srjoda","srj","s","s"],["stwórtk","stw","s","s"],["pětk","pět","p","p"],["sobota","sob","s","s"]],
     "dv-MV" : [["އާދީއްތަ","އާދީއްތަ","އާ","އާ"],["ހޯމަ","ހޯމަ","ހޯ","ހޯ"],["އަންގާރަ","އަންގާރަ","އަ","އަ"],["ބުދަ","ބުދަ","ބު","ބު"],["ބުރާސްފަތި","ބުރާސްފަތި","ބު","ބު"],["ހުކުރު","ހުކުރު","ހު","ހު"],["ހޮނިހިރު","ހޮނިހިރު","ހޮ","ހޮ"]],
     "el-GR" : [["Κυριακή","Κυρ","Κυ","Κυ"],["Δευτέρα","Δευ","Δε","Δε"],["Τρίτη","Τρι","Τρ","Τρ"],["Τετάρτη","Τετ","Τε","Τε"],["Πέμπτη","Πεμ","Πε","Πε"],["Παρασκευή","Παρ","Πα","Πα"],["Σάββατο","Σαβ","Σα","Σα"]],
     "en-029" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "en-AU" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "en-BZ" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "en-CA" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "en-GB" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "en-HK" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "en-IE" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "en-IN" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "en-JM" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "en-MY" : [["Sunday","Sun","S","S"],["Monday","Mon","M","M"],["Tuesday","Tue","T","T"],["Wednesday","Wed","W","W"],["Thursday","Thu","T","T"],["Friday","Fri","F","F"],["Saturday","Sat","S","S"]],
     "en-NZ" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "en-PH" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "en-SG" : [["Sunday","Sun","S","S"],["Monday","Mon","M","M"],["Tuesday","Tue","T","T"],["Wednesday","Wed","W","W"],["Thursday","Thu","T","T"],["Friday","Fri","F","F"],["Saturday","Sat","S","S"]],
     "en-TT" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "en-US" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "en-ZA" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "en-ZW" : [["Sunday","Sun","Su","Su"],["Monday","Mon","Mo","Mo"],["Tuesday","Tue","Tu","Tu"],["Wednesday","Wed","We","We"],["Thursday","Thu","Th","Th"],["Friday","Fri","Fr","Fr"],["Saturday","Sat","Sa","Sa"]],
     "es-419" : [["domingo","dom","D","D"],["lunes","lun","L","L"],["martes","mar","M","M"],["miércoles","mié","X","X"],["jueves","jue","J","J"],["viernes","vie","V","V"],["sábado","sáb","S","S"]],
     "es-AR" : [["domingo","dom","do","do"],["lunes","lun","lu","lu"],["martes","mar","ma","ma"],["miércoles","mié","mi","mi"],["jueves","jue","ju","ju"],["viernes","vie","vi","vi"],["sábado","sáb","sá","sá"]],
     "es-BO" : [["domingo","dom","do","do"],["lunes","lun","lu","lu"],["martes","mar","ma","ma"],["miércoles","mié","mi","mi"],["jueves","jue","ju","ju"],["viernes","vie","vi","vi"],["sábado","sáb","sá","sá"]],
     "es-CL" : [["domingo","dom","do","do"],["lunes","lun","lu","lu"],["martes","mar","ma","ma"],["miércoles","mié","mi","mi"],["jueves","jue","ju","ju"],["viernes","vie","vi","vi"],["sábado","sáb","sá","sá"]],
     "es-CO" : [["domingo","dom.","do.","do."],["lunes","lun.","lu.","lu."],["martes","mar.","ma.","ma."],["miércoles","mié.","mi.","mi."],["jueves","jue.","ju.","ju."],["viernes","vie.","vi.","vi."],["sábado","sáb.","sá.","sá."]],
     "es-CR" : [["domingo","dom","do","do"],["lunes","lun","lu","lu"],["martes","mar","ma","ma"],["miércoles","mié","mi","mi"],["jueves","jue","ju","ju"],["viernes","vie","vi","vi"],["sábado","sáb","sá","sá"]],
     "es-DO" : [["domingo","dom.","do.","do."],["lunes","lun.","lu.","lu."],["martes","mar.","ma.","ma."],["miércoles","mié.","mi.","mi."],["jueves","jue.","ju.","ju."],["viernes","vie.","vi.","vi."],["sábado","sáb.","sá.","sá."]],
     "es-EC" : [["domingo","dom","do","do"],["lunes","lun","lu","lu"],["martes","mar","ma","ma"],["miércoles","mié","mi","mi"],["jueves","jue","ju","ju"],["viernes","vie","vi","vi"],["sábado","sáb","sá","sá"]],
     "es-ES" : [["domingo","do.","D","D"],["lunes","lu.","L","L"],["martes","ma.","M","M"],["miércoles","mi.","X","X"],["jueves","ju.","J","J"],["viernes","vi.","V","V"],["sábado","sá.","S","S"]],
     "es-GT" : [["domingo","dom.","do.","do."],["lunes","lun.","lu.","lu."],["martes","mar.","ma.","ma."],["miércoles","mié.","mi.","mi."],["jueves","jue.","ju.","ju."],["viernes","vie.","vi.","vi."],["sábado","sáb.","sá.","sá."]],
     "es-HN" : [["domingo","dom.","do.","do."],["lunes","lun.","lu.","lu."],["martes","mar.","ma.","ma."],["miércoles","mié","mi.","mi."],["jueves",".jue.","ju.","ju."],["viernes","vie.","vi.","vi."],["sábado","sáb.","sá.","sá."]],
     "es-MX" : [["domingo","dom.","do.","do."],["lunes","lun.","lu.","lu."],["martes","mar.","ma.","ma."],["miércoles","mié.","mi.","mi."],["jueves","jue.","ju.","ju."],["viernes","vie.","vi.","vi."],["sábado","sáb.","sá.","sá."]],
     "es-NI" : [["domingo","dom","do","do"],["lunes","lun","lu","lu"],["martes","mar","ma","ma"],["miércoles","mié","mi","mi"],["jueves","jue","ju","ju"],["viernes","vie","vi","vi"],["sábado","sáb","sá","sá"]],
     "es-PA" : [["domingo","dom.","do.","do."],["lunes","lun.","lu.","lu."],["martes","mar.","ma.","ma."],["miércoles","mié.","mi.","mi."],["jueves","jue.","ju.","ju."],["viernes","vie.","vi.","vi."],["sábado","sáb.","sá.","sá."]],
     "es-PE" : [["domingo","dom","do","do"],["lunes","lun","lu","lu"],["martes","mar","ma","ma"],["miércoles","mié","mi","mi"],["jueves","jue","ju","ju"],["viernes","vie","vi","vi"],["sábado","sáb","sá","sá"]],
     "es-PR" : [["domingo","dom","do","do"],["lunes","lun","lu","lu"],["martes","mar","ma","ma"],["miércoles","mié","mi","mi"],["jueves","jue","ju","ju"],["viernes","vie","vi","vi"],["sábado","sáb","sá","sá"]],
     "es-PY" : [["domingo","dom","do","do"],["lunes","lun","lu","lu"],["martes","mar","ma","ma"],["miércoles","mié","mi","mi"],["jueves","jue","ju","ju"],["viernes","vie","vi","vi"],["sábado","sáb","sá","sá"]],
     "es-SV" : [["domingo","dom","do","do"],["lunes","lun","lu","lu"],["martes","mar","ma","ma"],["miércoles","mié","mi","mi"],["jueves","jue","ju","ju"],["viernes","vie","vi","vi"],["sábado","sáb","sá","sá"]],
     "es-US" : [["domingo","dom","do","do"],["lunes","lun","lu","lu"],["martes","mar","ma","ma"],["miércoles","mié","mi","mi"],["jueves","jue","ju","ju"],["viernes","vie","vi","vi"],["sábado","sáb","sa","sa"]],
     "es-UY" : [["domingo","dom","do","do"],["lunes","lun","lu","lu"],["martes","mar","ma","ma"],["miércoles","mié","mi","mi"],["jueves","jue","ju","ju"],["viernes","vie","vi","vi"],["sábado","sáb","sá","sá"]],
     "es-VE" : [["domingo","dom","do","do"],["lunes","lun","lu","lu"],["martes","mar","ma","ma"],["miércoles","mié","mi","mi"],["jueves","jue","ju","ju"],["viernes","vie","vi","vi"],["sábado","sáb","sá","sá"]],
     "et-EE" : [["pühapäev","P","P","P"],["esmaspäev","E","E","E"],["teisipäev","T","T","T"],["kolmapäev","K","K","K"],["neljapäev","N","N","N"],["reede","R","R","R"],["laupäev","L","L","L"]],
     "eu-ES" : [["igandea","ig.","ig","ig"],["astelehena","al.","al","al"],["asteartea","as.","as","as"],["asteazkena","az.","az","az"],["osteguna","og.","og","og"],["ostirala","or.","or","or"],["larunbata","lr.","lr","lr"]],
     "fa-IR" : [["يكشنبه","يكشنبه","ی","ی"],["دوشنبه","دوشنبه","د","د"],["سه شنبه","سه شنبه","س","س"],["چهارشنبه","چهارشنبه","چ","چ"],["پنجشنبه","پنجشنبه","پ","پ"],["جمعه","جمعه","ج","ج"],["شنبه","شنبه","ش","ش"]],
     "ff-Latn-SN" : [["alete","alet","Al","Al"],["altine","alt.","Te","Te"],["talaata","tal.","Ta","Ta"],["alarba","alar.","Al","Al"],["alkamiisa","alk.","Al","Al"],["aljumaa","alj.","Ju","Ju"],["asete","aset","As","As"]],
     "fi-FI" : [["sunnuntai","su","su","su"],["maanantai","ma","ma","ma"],["tiistai","ti","ti","ti"],["keskiviikko","ke","ke","ke"],["torstai","to","to","to"],["perjantai","pe","pe","pe"],["lauantai","la","la","la"]],
     "fil-PH" : [["Linggo","Lin","Li","Li"],["Lunes","Lun","Lu","Lu"],["Martes","Mar","Ma","Ma"],["Miyerkules","Miy","Mi","Mi"],["Huwebes","Huw","H","H"],["Biyernes","Biy","B","B"],["Sabado","Sab","S","S"]],
     "fo-FO" : [["sunnudagur","sun","su","su"],["mánadagur","mán","má","má"],["týsdagur","týs","tý","tý"],["mikudagur","mik","mi","mi"],["hósdagur","hós","hó","hó"],["fríggjadagur","frí","fr","fr"],["leygardagur","leyg","ley","ley"]],
     "fr-BE" : [["dimanche","dim.","di","di"],["lundi","lun.","lu","lu"],["mardi","mar.","ma","ma"],["mercredi","mer.","me","me"],["jeudi","jeu.","je","je"],["vendredi","ven.","ve","ve"],["samedi","sam.","sa","sa"]],
     "fr-CA" : [["dimanche","dim.","di","di"],["lundi","lun.","lu","lu"],["mardi","mar.","ma","ma"],["mercredi","mer.","me","me"],["jeudi","jeu.","je","je"],["vendredi","ven.","ve","ve"],["samedi","sam.","sa","sa"]],
     "fr-CD" : [["dimanche","dim.","di","di"],["lundi","lun.","lu","lu"],["mardi","mar.","ma","ma"],["mercredi","mer.","me","me"],["jeudi","jeu.","je","je"],["vendredi","ven.","ve","ve"],["samedi","sam.","sa","sa"]],
     "fr-CH" : [["dimanche","dim.","di","di"],["lundi","lun.","lu","lu"],["mardi","mar.","ma","ma"],["mercredi","mer.","me","me"],["jeudi","jeu.","je","je"],["vendredi","ven.","ve","ve"],["samedi","sam.","sa","sa"]],
     "fr-CI" : [["dimanche","dim.","di","di"],["lundi","lun.","lu","lu"],["mardi","mar.","ma","ma"],["mercredi","mer.","me","me"],["jeudi","jeu.","je","je"],["vendredi","ven.","ve","ve"],["samedi","sam.","sa","sa"]],
     "fr-CM" : [["dimanche","dim.","di","di"],["lundi","lun.","lu","lu"],["mardi","mar.","ma","ma"],["mercredi","mer.","me","me"],["jeudi","jeu.","je","je"],["vendredi","ven.","ve","ve"],["samedi","sam.","sa","sa"]],
     "fr-FR" : [["dimanche","dim.","di","di"],["lundi","lun.","lu","lu"],["mardi","mar.","ma","ma"],["mercredi","mer.","me","me"],["jeudi","jeu.","je","je"],["vendredi","ven.","ve","ve"],["samedi","sam.","sa","sa"]],
     "fr-HT" : [["dimanche","dim.","di","di"],["lundi","lun.","lu","lu"],["mardi","mar.","ma","ma"],["mercredi","mer.","me","me"],["jeudi","jeu.","je","je"],["vendredi","ven.","ve","ve"],["samedi","sam.","sa","sa"]],
     "fr-LU" : [["dimanche","dim.","di","di"],["lundi","lun.","lu","lu"],["mardi","mar.","ma","ma"],["mercredi","mer.","me","me"],["jeudi","jeu.","je","je"],["vendredi","ven.","ve","ve"],["samedi","sam.","sa","sa"]],
     "fr-MA" : [["dimanche","dim.","di","di"],["lundi","lun.","lu","lu"],["mardi","mar.","ma","ma"],["mercredi","mer.","me","me"],["jeudi","jeu.","je","je"],["vendredi","ven.","ve","ve"],["samedi","sam.","sa","sa"]],
     "fr-MC" : [["dimanche","dim.","di","di"],["lundi","lun.","lu","lu"],["mardi","mar.","ma","ma"],["mercredi","mer.","me","me"],["jeudi","jeu.","je","je"],["vendredi","ven.","ve","ve"],["samedi","sam.","sa","sa"]],
     "fr-ML" : [["dimanche","dim.","di","di"],["lundi","lun.","lu","lu"],["mardi","mar.","ma","ma"],["mercredi","mer.","me","me"],["jeudi","jeu.","je","je"],["vendredi","ven.","ve","ve"],["samedi","sam.","sa","sa"]],
     "fr-RE" : [["dimanche","dim.","di","di"],["lundi","lun.","lu","lu"],["mardi","mar.","ma","ma"],["mercredi","mer.","me","me"],["jeudi","jeu.","je","je"],["vendredi","ven.","ve","ve"],["samedi","sam.","sa","sa"]],
     "fr-SN" : [["dimanche","dim.","di","di"],["lundi","lun.","lu","lu"],["mardi","mar.","ma","ma"],["mercredi","mer.","me","me"],["jeudi","jeu.","je","je"],["vendredi","ven.","ve","ve"],["samedi","sam.","sa","sa"]],
     "fy-NL" : [["snein","sni","si","si"],["moandei","moa","mo","mo"],["tiisdei","tii","ti","ti"],["woansdei","woa","wo","wo"],["tongersdei","ton","to","to"],["freed","fre","fr","fr"],["sneon","sno","so","so"]],
     "ga-IE" : [["Domhnach","Domh","Do","Do"],["Luan","Luan","Lu","Lu"],["Máirt","Máirt","Má","Má"],["Céadaoin","Céad","Cé","Cé"],["Déardaoin","Déar","De","De"],["Aoine","Aoi","Ao","Ao"],["Satharn","Sath","Sa","Sa"]],
     "gd-GB" : [["DiDòmhnaich","DiD","Dò","Dò"],["DiLuain","DiL","Lu","Lu"],["DiMàirt","DiM","Mà","Mà"],["DiCiadain","DiC","Ci","Ci"],["DiarDaoin","Dia","Da","Da"],["DihAoine","Dih","Ao","Ao"],["DiSathairne","DiS","Sa","Sa"]],
     "gl-ES" : [["domingo","dom","do","do"],["luns","luns","lu","lu"],["martes","mar","ma","ma"],["mércores","mér","mé","mé"],["xoves","xov","xo","xo"],["venres","ven","ve","ve"],["sábado","sáb","sá","sá"]],
     "gn-PY" : [["arateĩ","teĩ","A1","A1"],["arakõi","kõi","A2","A2"],["araapy","apy","A3","A3"],["ararundy","ndy","A4","A4"],["arapo","po","A5","A5"],["arapoteĩ","oteĩ","A6","A6"],["arapokõi","okõi","A7","A7"]],
     "gsw-FR" : [["Sundi","Su.","Su","Su"],["Manti","Ma.","Ma","Ma"],["Zischti","Zi.","Zi","Zi"],["Mettwuch","Me.","Me","Me"],["Dunnerschti","Du.","Du","Du"],["Friti","Fr.","Fr","Fr"],["Sàmschti","Sà.","Sà","Sà"]],
     "gu-IN" : [["રવિવાર","રવિ","ર","ર"],["સોમવાર","સોમ","સો","સો"],["મંગળવાર","મંગળ","મં","મં"],["બુધવાર","બુધ","બુ","બુ"],["ગુરુવાર","ગુરુ","ગુ","ગુ"],["શુક્રવાર","શુક્ર","શુ","શુ"],["શનિવાર","શનિ","શ","શ"]],
     "ha-Latn-NG" : [["Lahadi","Lah","L","L"],["Litinin","Lit","L","L"],["Talata","Tal","T","T"],["Laraba","Lar","L","L"],["Alhamis","Alh","A","A"],["Juma'a","Jum","J","J"],["Asabar","Asa","A","A"]],
     "haw-US" : [["Lāpule","Lp","Lp","Lp"],["Pōʻakahi","P1","P1","P1"],["Poʻalua","P2","P2","P2"],["Poʻakolu","P3","P3","P3"],["Poʻahā","P4","P4","P4"],["Poʻalima","P5","P5","P5"],["Poʻaono","P6","P6","P6"]],
     "he-IL" : [["יום ראשון","יום א","א","א"],["יום שני","יום ב","ב","ב"],["יום שלישי","יום ג","ג","ג"],["יום רביעי","יום ד","ד","ד"],["יום חמישי","יום ה","ה","ה"],["יום שישי","יום ו","ו","ו"],["שבת","שבת","ש","ש"]],
     "hi-IN" : [["रविवार","रवि.","र","र"],["सोमवार","सोम.","स","स"],["मंगलवार","मंगल.","म","म"],["बुधवार","बुध.","ब","ब"],["गुरुवार","गुरु.","ग","ग"],["शुक्रवार","शुक्र.","श","श"],["शनिवार","शनि.","श","श"]],
     "hr-BA" : [["nedjelja","ned","ne","ne"],["ponedjeljak","pon","po","po"],["utorak","uto","ut","ut"],["srijeda","sri","sr","sr"],["četvrtak","čet","če","če"],["petak","pet","pe","pe"],["subota","sub","su","su"]],
     "hr-HR" : [["nedjelja","ned","ne","ne"],["ponedjeljak","pon","po","po"],["utorak","uto","ut","ut"],["srijeda","sri","sr","sr"],["četvrtak","čet","če","če"],["petak","pet","pe","pe"],["subota","sub","su","su"]],
     "hsb-DE" : [["njedźela","nje","n","n"],["póndźela","pón","p","p"],["wutora","wut","w","w"],["srjeda","srj","s","s"],["štwórtk","štw","š","š"],["pjatk","pja","p","p"],["sobota","sob","s","s"]],
     "hu-HU" : [["vasárnap","V","V","V"],["hétfő","H","H","H"],["kedd","K","K","K"],["szerda","Sze","Sze","Sze"],["csütörtök","Cs","Cs","Cs"],["péntek","P","P","P"],["szombat","Szo","Szo","Szo"]],
     "hy-AM" : [["Կիրակի","Կիր","Կ","Կ"],["Երկուշաբթի","Երկ","Ե","Ե"],["Երեքշաբթի","Երք","Ե","Ե"],["Չորեքշաբթի","Չրք","Չ","Չ"],["Հինգշաբթի","Հնգ","Հ","Հ"],["Ուրբաթ","Ուր","Ո","Ո"],["Շաբաթ","Շբթ","Շ","Շ"]],
     "id-ID" : [["Minggu","Mgg","M","M"],["Senin","Sen","S","S"],["Selasa","Sel","S","S"],["Rabu","Rab","R","R"],["Kamis","Kam","K","K"],["Jumat","Jum","J","J"],["Sabtu","Sab","S","S"]],
     "ig-NG" : [["Sọnde","Sọn","Sọ","Sọ"],["Mọnde","Mọn","Mọ","Mọ"],["Tuzde","Tuz","Tu","Tu"],["Wednesde","Ojo","We","We"],["Tọsde","Tọs","Tọs","Tọs"],["Fraịde","Fra","Fra","Fra"],["Satọde","Sat","Sa","Sa"]],
     "ii-CN" : [["ꑭꆏꑍ","ꑭꆏ","ꆏ","ꆏ"],["ꆏꊂ꒔","ꆏ꒔","꒔","꒔"],["ꆏꊂꑍ","ꆏꑍ","ꑍ","ꑍ"],["ꆏꊂꌕ","ꆏꌕ","ꌕ","ꌕ"],["ꆏꊂꇖ","ꆏꇖ","ꇖ","ꇖ"],["ꆏꊂꉬ","ꆏꉬ","ꉬ","ꉬ"],["ꆏꊂꃘ","ꆏꃘ","ꃘ","ꃘ"]],
     "is-IS" : [["sunnudagur","sun.","su","su"],["mánudagur","mán.","má","má"],["þriðjudagur","þri.","þr","þr"],["miðvikudagur","mið.","mi","mi"],["fimmtudagur","fim.","fi","fi"],["föstudagur","fös.","fö","fö"],["laugardagur","lau.","la","la"]],
     "it-CH" : [["domenica","dom","do","do"],["lunedì","lun","lu","lu"],["martedì","mar","ma","ma"],["mercoledì","mer","me","me"],["giovedì","gio","gi","gi"],["venerdì","ven","ve","ve"],["sabato","sab","sa","sa"]],
     "it-IT" : [["domenica","dom","do","do"],["lunedì","lun","lu","lu"],["martedì","mar","ma","ma"],["mercoledì","mer","me","me"],["giovedì","gio","gi","gi"],["venerdì","ven","ve","ve"],["sabato","sab","sa","sa"]],
     "iu-Cans-CA" : [["ᓈᑦᑏᖑᔭ","ᓈᑦᑏ","ᓈ","ᓈ"],["ᓇᒡᒐᔾᔭᐅ","ᓇᒡᒐ","ᓇ","ᓇ"],["ᐊᐃᑉᐱᖅ","ᐊᐃᑉᐱ","ᐊ","ᐊ"],["ᐱᖓᑦᓯᖅ","ᐱᖓᑦᓯ","ᐱ","ᐱ"],["ᓯᑕᒻᒥᖅ","ᓯᑕ","ᓯ","ᓯ"],["ᑕᓪᓕᕐᒥᖅ","ᑕᓪᓕ","ᑕ","ᑕ"],["ᓯᕙᑖᕐᕕᒃ","ᓯᕙᑖᕐᕕᒃ","ᓯ","ᓯ"]],
     "iu-Latn-CA" : [["Naattiinguja","Nat","Nt","Nt"],["Naggajjau","Nag","Ng","Ng"],["Aippiq","Aip","A","A"],["Pingatsiq","Pi","P","P"],["Sitammiq","Sit","S","S"],["Tallirmiq","Tal","T","T"],["Sivataarvik","Siv","S","S"]],
     "ja-JP" : [["日曜日","日","日","日"],["月曜日","月","月","月"],["火曜日","火","火","火"],["水曜日","水","水","水"],["木曜日","木","木","木"],["金曜日","金","金","金"],["土曜日","土","土","土"]],
     "jv-Latn-ID" : [["Minggu","Min","Mi","Mi"],["Senèn","Sen","Sn","Sn"],["Selasa","Sel","Sl","Sl"],["Rebo","Reb","Re","Re"],["Kemis","Kem","Ke","Ke"],["Jemuwah","Jem","Je","Je"],["Setu","Set","St","St"]],
     "ka-GE" : [["კვირა","კვ.","კვ","კვ"],["ორშაბათი","ორშ.","ორ","ორ"],["სამშაბათი","სამშ.","სმ","სმ"],["ოთხშაბათი","ოთხშ.","ოთ","ოთ"],["ხუთშაბათი","ხუთშ.","ხთ","ხთ"],["პარასკევი","პარ.","პრ","პრ"],["შაბათი","შაბ.","შბ","შბ"]],
     "kk-KZ" : [["Жексенбі","Жек","Жк","Жк"],["Дүйсенбі","Дүй","Дс","Дс"],["Сейсенбі","Сей","Сс","Сс"],["Сәрсенбі","Сәр","Ср","Ср"],["Бейсенбі","Бей","Бс","Бс"],["Жұма","Жұм","Жм","Жм"],["Сенбі","Сен","Сн","Сн"]],
     "kl-GL" : [["sapaat","sap.","sa","sa"],["ataasinngorneq","at.","at","at"],["marlunngorneq","marl.","ma","ma"],["pingasunngorneq","ping.","pi","pi"],["sisamanngorneq","sis.","si","si"],["tallimanngorneq","tall.","ta","ta"],["arfininngorneq","arf.","ar","ar"]],
     "km-KH" : [["ថ្ងៃអាទិត្យ","អាទិ.","អា","អា"],["ថ្ងៃច័ន្ទ","ច.","ច","ច"],["ថ្ងៃអង្គារ","អ.","អ","អ"],["ថ្ងៃពុធ","ពុ","ពុ","ពុ"],["ថ្ងៃព្រហស្បតិ៍","ព្រហ.","ព","ព"],["ថ្ងៃសុក្រ","សុ.","សុ","សុ"],["ថ្ងៃសៅរ៍","ស.","ស","ស"]],
     "kn-IN" : [["ಭಾನುವಾರ","ಭಾನು.","ರ","ರ"],["ಸೋಮವಾರ","ಸೋಮ.","ಸ","ಸ"],["ಮಂಗಳವಾರ","ಮಂಗಳ.","ಮ","ಮ"],["ಬುಧವಾರ","ಬುಧ.","ಬ","ಬ"],["ಗುರುವಾರ","ಗುರು.","ಗ","ಗ"],["ಶುಕ್ರವಾರ","ಶುಕ್ರ.","ಶ","ಶ"],["ಶನಿವಾರ","ಶನಿ.","ಶ","ಶ"]],
     "ko-KR" : [["일요일","일","일","일"],["월요일","월","월","월"],["화요일","화","화","화"],["수요일","수","수","수"],["목요일","목","목","목"],["금요일","금","금","금"],["토요일","토","토","토"]],
     "kok-IN" : [["आयतार","आय.","आ","आ"],["सोमार","सोम.","स","स"],["मंगळार","मंगळ.","म","म"],["बुधवार","बुध.","ब","ब"],["बिरेस्तार","बिरे.","ब","ब"],["सुक्रार","सुक्र.","स","स"],["शेनवार","शेन.","श","श"]],
     "ku-Arab-IQ" : [["یەکشەممە","یەکشەممە","ی","ی"],["دووشەممە","دووشەممە","د","د"],["سێشەممە","سێشەممە","س","س"],["چوارشەممە","چوارشەممە","چ","چ"],["پێنجشەممە","پێنجشەممە","پ","پ"],["ھەینی","ھەینی","ھ","ھ"],["شەممە","شەممە","ش","ش"]],
     "ky-KG" : [["жекшемби","Жш","Жш","Жш"],["дүйшөмбү","Дш","Дш","Дш"],["шейшемби","Шш","Шш","Шш"],["шаршемби","Шр","Шр","Шр"],["бейшемби","Бш","Бш","Бш"],["жума","Жм","Жм","Жм"],["ишемби","Иш","Иш","Иш"]],
     "lb-LU" : [["Sonndeg","Son","So","So"],["Méindeg","Méi","Mé","Mé"],["Dënschdeg","Dën","Dë","Dë"],["Mëttwoch","Mët","Më","Më"],["Donneschdeg","Don","Do","Do"],["Freideg","Fre","Fr","Fr"],["Samschdeg","Sam","Sa","Sa"]],
     "lo-LA" : [["ວັນອາທິດ","ອາທິດ","ທ","ທ"],["ວັນຈັນ","ຈັນ","ຈ","ຈ"],["ວັນອັງຄານ","ອັງຄານ","ອ","ອ"],["ວັນພຸດ","ພຸດ","ພ","ພ"],["ວັນພະຫັດ","ພະຫັດ","ພຫ","ພຫ"],["ວັນສຸກ","ສຸກ","ສ","ສ"],["ວັນເສົາ","ເສົາ","ເສ","ເສ"]],
     "lt-LT" : [["sekmadienis","Sk","S","S"],["pirmadienis","Pr","P","P"],["antradienis","An","A","A"],["trečiadienis","Tr","T","T"],["ketvirtadienis","Kt","K","K"],["penktadienis","Pn","Pn","Pn"],["šeštadienis","Št","Š","Š"]],
     "lv-LV" : [["svētdiena","sv","sv","sv"],["pirmdiena","pr","pr","pr"],["otrdiena","ot","ot","ot"],["trešdiena","tr","tr","tr"],["ceturtdiena","ce","ce","ce"],["piektdiena","pk","pk","pk"],["sestdiena","se","se","se"]],
     "mg-MG" : [["Alahady","Alah","Alah","Alah"],["Alatsinainy","Alats","Alats","Alats"],["Talata","Tal","Tal","Tal"],["Alarobia","Alar","Alar","Alar"],["Alakamisy","Alak","Alak","Alak"],["Zoma","Zom","Zom","Zom"],["Asabotsy","Asab","Asab","Asab"]],
     "mi-NZ" : [["Rātapu","Ta","Ta","Ta"],["Rāhina","Hi","Hi","Hi"],["Rātū","Tū","Tū","Tū"],["Rāapa","Apa","Aa","Aa"],["Rāpare","Pa","Pa","Pa"],["Rāmere","Me","Me","Me"],["Rāhoroi","Ho","Ho","Ho"]],
     "mk-MK" : [["недела","нед","не","не"],["понеделник","пон","по","по"],["вторник","втр","вт","вт"],["среда","срд","ср","ср"],["четврток","чет","че","че"],["петок","пет","пе","пе"],["сабота","саб","са","са"]],
     "ml-IN" : [["ഞായറാഴ്ച","ഞായർ.","ഞാ","ഞാ"],["തിങ്കളാഴ്ച","തിങ്കൾ.","തി","തി"],["ചൊവ്വാഴ്ച","ചൊവ്വ.","ചൊ","ചൊ"],["ബുധനാഴ്ച","ബുധൻ.","ബു","ബു"],["വ്യാഴാഴ്ച","വ്യാഴം.","വ്യാ","വ്യാ"],["വെള്ളിയാഴ്ച","വെള്ളി.","വെ","വെ"],["ശനിയാഴ്ച","ശനി.","ശ","ശ"]],
     "mn-MN" : [["Ням","Ня","Ня","Ня"],["Даваа","Да","Да","Да"],["Мягмар","Мя","Мя","Мя"],["Лхагва","Лха","Лх","Лх"],["Пүрэв","Пү","Пү","Пү"],["Баасан","Ба","Ба","Ба"],["Бямба","Бя","Бя","Бя"]],
     "mn-Mong-CN" : [["ᠭᠠᠷᠠᠭ ᠤᠨ ᠡᠳᠦᠷ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠡᠳᠦᠷ","ᠭ᠗","ᠭ᠗"],["ᠭᠠᠷᠠᠭ ᠤᠨ ᠨᠢᠭᠡᠨ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠨᠢᠭᠡᠨ","ᠭ᠑","ᠭ᠑"],["ᠭᠠᠷᠠᠭ ᠤᠨ ᠬᠣᠶᠠᠷ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠬᠣᠶᠠᠷ","ᠭ᠒","ᠭ᠒"],["ᠭᠠᠷᠠᠭ ᠤᠨ ᠭᠤᠷᠪᠠᠨ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠭᠤᠷᠪᠠᠨ","ᠭ᠓","ᠭ᠓"],["ᠭᠠᠷᠠᠭ ᠤᠨ ᠳᠥᠷᠪᠡᠨ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠳᠥᠷᠪᠡᠨ","ᠭ᠔","ᠭ᠔"],["ᠭᠠᠷᠠᠭ ᠤᠨ ᠲᠠᠪᠤᠨ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠲᠠᠪᠤᠨ","ᠭ᠕","ᠭ᠕"],["ᠭᠠᠷᠠᠭ ᠤᠨ ᠵᠢᠷᠭᠤᠭᠠᠨ","ᠭᠠᠷᠠᠭ ᠤᠨ ᠵᠢᠷᠭᠤᠭᠠᠨ","ᠭ᠖","ᠭ᠖"]],
     "mn-Mong-MN" : [["ᠨᠢᠮ᠎ᠠ","ᠨᠢᠮ᠎ᠠ","ᠨ","ᠨ"],["ᠳᠠᠸᠠ","ᠳᠠᠸᠠ","ᠳ","ᠳ"],["ᠮᠢᠭᠮᠠᠷ","ᠮᠢᠭᠮᠠᠷ","ᠮ","ᠮ"],["ᡀᠠᠭᠪᠠ","ᡀᠠᠭᠪᠠ","ᡀ","ᡀ"],["ᠫᠦᠷᠪᠦ","ᠫᠦᠷᠪᠦ","ᠫ","ᠫ"],["ᠪᠠᠰᠠᠩ","ᠪᠠᠰᠠᠩ","ᠪ","ᠪ"],["ᠪᠢᠮᠪᠠ","ᠪᠢᠮᠪᠠ","ᠪ","ᠪ"]],
     "moh-CA" : [["Awentatokentì:ke","Sun","S","S"],["Awentataón'ke","Mon","M","M"],["Ratironhia'kehronòn:ke","Tue","T","T"],["Soséhne","Wed","W","W"],["Okaristiiáhne","Thu","T","T"],["Ronwaia'tanentaktonhne","Fri","F","F"],["Entákta","Sat","S","S"]],
     "mr-IN" : [["रविवार","रवि.","र","र"],["सोमवार","सोम.","सो","सो"],["मंगळवार","मंगळ.","मं","मं"],["बुधवार","बुध.","बु","बु"],["गुरुवार","गुरु.","गु","गु"],["शुक्रवार","शुक्र.","शु","शु"],["शनिवार","शनि.","श","श"]],
     "ms-BN" : [["Ahad","Ahad","A","A"],["Isnin","Isnin","I","I"],["Selasa","Sel","S","S"],["Rabu","Rabu","R","R"],["Khamis","Khamis","K","K"],["Jumaat","Jumaat","J","J"],["Sabtu","Sabtu","S","S"]],
     "ms-MY" : [["Ahad","Ahd","A","A"],["Isnin","Isn","I","I"],["Selasa","Sel","S","S"],["Rabu","Rab","R","R"],["Khamis","Kha","K","K"],["Jumaat","Jum","J","J"],["Sabtu","Sab","S","S"]],
     "mt-MT" : [["Il-Ħadd","Ħad","Ħd","Ħd"],["It-Tnejn","Tne","Tn","Tn"],["It-Tlieta","Tli","Tl","Tl"],["L-Erbgħa","Erb","Er","Er"],["Il-Ħamis","Ħam","Ħm","Ħm"],["Il-Ġimgħa","Ġim","Ġi","Ġi"],["Is-Sibt","Sib","Si","Si"]],
     "my-MM" : [["တနင်္ဂနွေ","နွေ","နွေ","နွေ"],["တနင်္လာ","လာ","လာ","လာ"],["အင်္ဂါ","ဂါ","ဂါ","ဂါ"],["ဗုဒ္ဓဟူး","ဟူး","ဟူး","ဟူး"],["ကြာသပတေး","တေး","တေး","တေး"],["သောကြာ","ကြာ","ကြာ","ကြာ"],["စနေ","နေ","နေ","နေ"]],
     "nb-NO" : [["søndag","søn","sø","sø"],["mandag","man","ma","ma"],["tirsdag","tir","ti","ti"],["onsdag","ons","on","on"],["torsdag","tor","to","to"],["fredag","fre","fr","fr"],["lørdag","lør","lø","lø"]],
     "ne-IN" : [["आइतवार","आइत","आइत","आइत"],["सोमवार","सोम","सोम","सोम"],["मङ्गलवार","मङ्गल","मङ्गल","मङ्गल"],["बुधवार","बुध","बुध","बुध"],["बिहीवार","बिही","बिही","बिही"],["शुक्रवार","शुक्र","शुक्र","शुक्र"],["शनिवार","शनि","शनि","शनि"]],
     "ne-NP" : [["आइतवार","आइत","आ","आ"],["सोमवार","सोम","सो","सो"],["मङ्गलवार","मङ्गल","म","म"],["बुधवार","बुध","बु","बु"],["बिहीवार","बिही","बि","बि"],["शुक्रवार","शुक्र","शु","शु"],["शनिवार","शनि","श","श"]],
     "nl-BE" : [["zondag","zo","zo","zo"],["maandag","ma","ma","ma"],["dinsdag","di","di","di"],["woensdag","wo","wo","wo"],["donderdag","do","do","do"],["vrijdag","vr","vr","vr"],["zaterdag","za","za","za"]],
     "nl-NL" : [["zondag","zo","zo","zo"],["maandag","ma","ma","ma"],["dinsdag","di","di","di"],["woensdag","wo","wo","wo"],["donderdag","do","do","do"],["vrijdag","vr","vr","vr"],["zaterdag","za","za","za"]],
     "nn-NO" : [["søndag","søn","sø","sø"],["måndag","mån","må","må"],["tysdag","tys","ty","ty"],["onsdag","ons","on","on"],["torsdag","tor","to","to"],["fredag","fre","fr","fr"],["laurdag","lau","la","la"]],
     "nqo-GN" : [["ߞߊ߯ߙߌ","ߞߊ߯ߙ","ߞߊ","ߞߊ"],["ߞߐ߬ߓߊ߬ߟߏ߲","ߞߐ߬ߓ","ߞߐ","ߞߐ"],["ߞߐ߬ߟߏ߲","ߞߐ߬ߟ","ߞߟ","ߞߟ"],["ߞߎߣߎ߲ߟߏ߲","ߞߎߣ","ߞߎ","ߞߎ"],["ߓߌߟߏ߲","ߓߌߟ","ߓߌ","ߓߌ"],["ߛߌ߬ߣߌ߲߬ߟߏ߲","ߛߌ߬ߣ","ߛߌ","ߛߌ"],["ߞߍ߲ߘߍߟߏ߲","ߞߍ߲ߘ","ߞߍ","ߞߍ"]],
     "nso-ZA" : [["Lamorena","Lam","La","La"],["Mošupologo","Moš","Mo","Mo"],["Labobedi","Lbb","Lb","Lb"],["Laboraro","Lbr","Lr","Lr"],["Labone","Lbn","Ln","Ln"],["Labohlano","Lbh","Lh","Lh"],["Mokibelo","Mok","Mk","Mk"]],
     "oc-FR" : [["dimenge","dg.","dg","dg"],["diluns","dl.","dl","dl"],["dimarts","dma.","da","da"],["dimècres","dmc.","dc","dc"],["dijòus","dj.","dj","dj"],["divendres","dv.","dv","dv"],["dissabte","ds.","ds","ds"]],
     "om-ET" : [["Dilbata","Dil","Dil","Dil"],["Wiixata","Wix","Wix","Wix"],["Qibxata","Qib","Qib","Qib"],["Roobii","Rob","Rob","Rob"],["Kamiisa","Kam","Kam","Kam"],["Jimaata","Jim","Jim","Jim"],["Sanbata","San","San","San"]],
     "or-IN" : [["ରବିବାର","ରବି.","ର","ର"],["ସୋମବାର","ସୋମ.","ସୋ","ସୋ"],["ମଙ୍ଗଳବାର","ମଙ୍ଗଳ.","ମ","ମ"],["ବୁଧବାର","ବୁଧ.","ବୁ","ବୁ"],["ଗୁରୁବାର","ଗୁରୁ.","ଗୁ","ଗୁ"],["ଶୁକ୍ରବାର","ଶୁକ୍ର.","ଶୁ","ଶୁ"],["ଶନିବାର","ଶନି.","ଶ","ଶ"]],
     "pa-Arab-PK" : [["پير","پير","پ","پ"],["منگل","منگل","م","م"],["بدھ","بدھ","ب","ب"],["جمعرات","جمعرات","ج","ج"],["جمعه","جمعه","ج","ج"],["هفته","هفته","ه","ه"],["اتوار","اتوار","ا","ا"]],
     "pa-IN" : [["ਐਤਵਾਰ","ਐਤ.","ਐ","ਐ"],["ਸੋਮਵਾਰ","ਸੋਮ.","ਸ","ਸ"],["ਮੰਗਲਵਾਰ","ਮੰਗਲ.","ਮ","ਮ"],["ਬੁੱਧਵਾਰ","ਬੁੱਧ.","ਬ","ਬ"],["ਵੀਰਵਾਰ","ਵੀਰ.","ਵ","ਵ"],["ਸ਼ੁੱਕਰਵਾਰ","ਸ਼ੁਕਰ.","ਸ਼ੁ","ਸ਼ੁ"],["ਸ਼ਨਿੱਚਰਵਾਰ","ਸ਼ਨਿੱਚਰ.","ਸ਼","ਸ਼"]],
     "pl-PL" : [["niedziela","N","N","N"],["poniedziałek","Pn","Pn","Pn"],["wtorek","Wt","Wt","Wt"],["środa","Śr","Śr","Śr"],["czwartek","Cz","Cz","Cz"],["piątek","Pt","Pt","Pt"],["sobota","So","So","So"]],
     "prs-AF" : [["یکشنبه","یکشنبه","ی","ی"],["دوشنبه","دوشنبه","د","د"],["سه‌ شنبه","سه‌ شنبه","س","س"],["چهار شنبه","چهار شنبه","چ","چ"],["پنجشنبه","پنجشنبه","پ","پ"],["جمعه","جمعه","ج","ج"],["شنبه","شنبه","ش","ش"]],
     "ps-AF" : [["یکشنبه","یکشنبه","ی","ی"],["دوشنبه","دوشنبه","د","د"],["سه‌شنبه","سه‌شنبه","س","س"],["چارشنبه","چارشنبه","چ","چ"],["پنجشنبه","پنجشنبه","پ","پ"],["جمعه","جمعه","ج","ج"],["شنبه","شنبه","ش","ش"]],
     "pt-AO" : [["domingo","dom","dom","dom"],["segunda-feira","seg","seg","seg"],["terça-feira","ter","ter","ter"],["quarta-feira","qua","qua","qua"],["quinta-feira","qui","qui","qui"],["sexta-feira","sex","sex","sex"],["sábado","sáb","sáb","sáb"]],
     "pt-BR" : [["domingo","dom","D","D"],["segunda-feira","seg","S","S"],["terça-feira","ter","T","T"],["quarta-feira","qua","Q","Q"],["quinta-feira","qui","Q","Q"],["sexta-feira","sex","S","S"],["sábado","sáb","S","S"]],
     "pt-PT" : [["domingo","dom","D","D"],["segunda-feira","seg","S","S"],["terça-feira","ter","T","T"],["quarta-feira","qua","Q","Q"],["quinta-feira","qui","Q","Q"],["sexta-feira","sex","S","S"],["sábado","sáb","S","S"]],
     "qut-GT" : [["juq'ij","juq'","ju","ju"],["kaq'ij","kaq'","ka","ka"],["oxq'ij","oxq'","ox","ox"],["kajq'ij","kajq'","kj","kj"],["joq'ij","joq'","jo","jo"],["waqq'ij","waqq'","wa","wa"],["wuqq'ij","wuqq'","wu","wu"]],
     "quz-BO" : [["intichaw","int","d","d"],["killachaw","kil","k","k"],["atipachaw","ati","a","a"],["quyllurchaw","quy","m","m"],["Ch' askachaw","Ch'","h","h"],["Illapachaw","Ill","b","b"],["k'uychichaw","k'u","k","k"]],
     "quz-EC" : [["inti","int","in","in"],["awaki","awk","aw","aw"],["wanra","wan","wn","wn"],["chillay","chy","cy","cy"],["kullka","kuk","ku","ku"],["chaska","cha","ck","ck"],["wakma","wak","wk","wk"]],
     "quz-PE" : [["Domingo","Dom","D","D"],["Lunes","Lun","L","L"],["Martes","Mar","M","M"],["Miércoles","Mié","X","X"],["Jueves","Jue","J","J"],["Viernes","Vie","V","V"],["Sábado","Sab","S","S"]],
     "rm-CH" : [["dumengia","du","du","du"],["glindesdi","gli","gli","gli"],["mardi","ma","ma","ma"],["mesemna","me","me","me"],["gievgia","gie","gie","gie"],["venderdi","ve","ve","ve"],["sonda","so","so","so"]],
     "ro-MD" : [["duminică","Du","Du","Du"],["luni","Lu","Lu","Lu"],["marți","Ma","Ma","Ma"],["miercuri","Mi","Mi","Mi"],["joi","Jo","Jo","Jo"],["vineri","Vi","Vi","Vi"],["sâmbătă","Sâ","Sâ","Sâ"]],
     "ro-RO" : [["duminică","D","D","D"],["luni","L","L","L"],["marți","Ma","Ma","Ma"],["miercuri","Mi","Mi","Mi"],["joi","J","J","J"],["vineri","V","V","V"],["sâmbătă","S","S","S"]],
     "ru-RU" : [["воскресенье","Вс","Вс","Вс"],["понедельник","Пн","Пн","Пн"],["вторник","Вт","Вт","Вт"],["среда","Ср","Ср","Ср"],["четверг","Чт","Чт","Чт"],["пятница","Пт","Пт","Пт"],["суббота","Сб","Сб","Сб"]],
     "rw-RW" : [["Ku cyumweru","cyu.","cy","cy"],["Ku wa mbere","mbe.","mb","mb"],["Ku wa kabiri","kab.","ka","ka"],["Ku wa gatatu","gat.","ga","ga"],["Ku wa kane","kan.","ka","ka"],["Ku wa gatanu","gat.","ga","ga"],["Ku wa gatandatu","gat.","ga","ga"]],
     "sa-IN" : [["रविवासरः","रवि","र","र"],["सोमवासरः","सोम","सो","सो"],["मङ्गलवासरः","मङ्ग","म","म"],["बुधवासरः","बुध","बु","बु"],["गुरुवासरः","गुरु","गु","गु"],["शुक्रवासरः","शुक्र","शु","शु"],["शनिवासरः","शनि","श","श"]],
     "sah-RU" : [["Өрөбүл","Өр","Өр","Өр"],["энидиэнньик","Бн","Бн","Бн"],["Оптуорунньук","Оп","Оп","Оп"],["Сэрэдээ","Ср","Ср","Ср"],["Чэппиэр","Чп","Чп","Чп"],["Бээтинсэ","Бт","Бт","Бт"],["Субуота","Сб","Сб","Сб"]],
     "sd-Arab-PK" : [["سومر","سو","سو","سو"],["اڱارو","اڱ","اڱ","اڱ"],["اربع","ار","ار","ار"],["خميس","خم","خم","خم"],["جمعو","جمعو","جم","جم"],["ڇنڇر","ڇن","ڇن","ڇن"],["آچر","آچ","آچ","آچ"]],
     "se-FI" : [["sotnabeaivi","sotn","s","s"],["vuossárga","vuos","v","v"],["maŋŋebárga","maŋ","m","m"],["gaskavahkku","gask","g","g"],["duorastat","duor","d","d"],["bearjadat","bear","b","b"],["lávvardat","láv","l","l"]],
     "se-NO" : [["sotnabeaivi","sotn","s","s"],["vuossárga","vuos","v","v"],["maŋŋebárga","maŋ","m","m"],["gaskavahkku","gask","g","g"],["duorastat","duor","d","d"],["bearjadat","bear","b","b"],["lávvardat","láv","l","l"]],
     "se-SE" : [["sotnabeaivi","sotn","s","s"],["mánnodat","mán","m","m"],["disdat","dis","d","d"],["gaskavahkku","gask","g","g"],["duorastat","duor","d","d"],["bearjadat","bear","b","b"],["lávvardat","láv","l","l"]],
     "si-LK" : [["ඉරිදා","ඉරිදා","ඉ","ඉ"],["සඳුදා","සඳුදා","ස","ස"],["අඟහරුවාදා","කුජදා","අ","අ"],["බදාදා","බුදදා","බ","බ"],["බ්‍රහස්පතින්දා","ගුරුදා","බ්‍ර","බ්‍ර"],["සිකුරාදා","කිවිදා","සි","සි"],["සෙනසුරාදා","ශනිදා","සෙ","සෙ"]],
     "sk-SK" : [["nedeľa","ne","ne","ne"],["pondelok","po","po","po"],["utorok","ut","ut","ut"],["streda","st","st","st"],["štvrtok","št","št","št"],["piatok","pi","pi","pi"],["sobota","so","so","so"]],
     "sl-SI" : [["nedelja","ned","ne","ne"],["ponedeljek","pon","po","po"],["torek","tor","to","to"],["sreda","sre","sr","sr"],["četrtek","čet","če","če"],["petek","pet","pe","pe"],["sobota","sob","so","so"]],
     "sma-NO" : [["aejlege","aej","a","a"],["måanta","måa","m","m"],["dæjsta","dæj","d","d"],["gaskevåhkoe","gask","g","g"],["duarsta","duar","d","d"],["bearjadahke","bearj","b","b"],["laavvardahke","laav","l","l"]],
     "sma-SE" : [["aejlege","aej","a","a"],["måanta","måa","m","m"],["dæjsta","dæj","d","d"],["gaskevåhkoe","gask","g","g"],["duarsta","duar","d","d"],["bearjadahke","bearj","b","b"],["laavvardahke","laav","l","l"]],
     "smj-NO" : [["sådnåbiejvve","såd","s","s"],["mánnodahka","mán","m","m"],["dijstahka","dis","d","d"],["gasskavahkko","gas","g","g"],["duorastahka","duor","d","d"],["bierjjedahka","bier","b","b"],["lávvodahka","láv","l","l"]],
     "smj-SE" : [["ájllek","ájl","á","á"],["mánnodahka","mán","m","m"],["dijstahka","dis","d","d"],["gasskavahkko","gas","g","g"],["duorastahka","duor","d","d"],["bierjjedahka","bier","b","b"],["lávvodahka","láv","l","l"]],
     "smn-FI" : [["pasepeivi","pas","p","p"],["vuossargâ","vuo","v","v"],["majebargâ","maj","m","m"],["koskokko","kos","k","k"],["tuorâstâh","tuo","t","t"],["vástuppeivi","vás","v","v"],["lávurdâh","láv","l","l"]],
     "sms-FI" : [["pâ´sspei´vv","pâ","pâ","pâ"],["vuõssargg","vu","v","v"],["mââibargg","mâ","m","m"],["seärad","se","s","s"],["neljdpei´vv","ne","n","n"],["piâtnâc","pi","pi","pi"],["sue´vet","su","s","s"]],
     "sn-Latn-ZW" : [["Svondo","Svo","Svo","Svo"],["Muvhuro","Muv","Muv","Muv"],["Chipiri","Chip","Chip","Chip"],["Chitatu","Chit","Chit","Chit"],["China","Chin","Chin","Chin"],["Chishanu","Chis","Chis","Chis"],["Mugovera","Mug","Mug","Mug"]],
     "so-SO" : [["Axad","Axd","Axd","Axd"],["Isniin","Isn","Isn","Isn"],["Talaado","Tal","Tal","Tal"],["Arbaco","Arb","Arb","Arb"],["Khamiis","Kha","Kha","Kha"],["Jimco","Jim","Jim","Jim"],["Sabti","Sab","Sab","Sab"]],
     "sq-AL" : [["e diel","Die","D","D"],["e hënë","Hën","H","H"],["e martë","Mar","M","M"],["e mërkurë","Mër","M","M"],["e enjte","Enj","E","E"],["e premte","Pre","P","P"],["e shtunë","Sht","Sh","Sh"]],
     "sr-Cyrl-BA" : [["недјеља","нед","н","н"],["понедјељак","пон","п","п"],["уторак","уто","у","у"],["сриједа","сри","с","с"],["четвртак","чет","ч","ч"],["петак","пет","п","п"],["субота","суб","с","с"]],
     "sr-Cyrl-CS" : [["недеља","нед.","не","не"],["понедељак","пон.","по","по"],["уторак","ут.","ут","ут"],["среда","ср.","ср","ср"],["четвртак","чет.","че","че"],["петак","пет.","пе","пе"],["субота","суб.","су","су"]],
     "sr-Cyrl-ME" : [["недеља","нед","не","не"],["понедјељак","пон","по","по"],["уторак","уто","ут","ут"],["сриједа","сри","ср","ср"],["четвртак","чет","че","че"],["петак","пет","пе","пе"],["субота","суб","су","су"]],
     "sr-Cyrl-RS" : [["недеља","нед.","не","не"],["понедељак","пон.","по","по"],["уторак","ут.","ут","ут"],["среда","ср.","ср","ср"],["четвртак","чет.","че","че"],["петак","пет.","пе","пе"],["субота","суб.","су","су"]],
     "sr-Latn-BA" : [["nedjelja","ned.","ne.","ne."],["ponedjeljak","pon.","po.","po."],["utorak","uto.","ut.","ut."],["srijeda","sri.","sr.","sr."],["četvrtak","čet.","če.","če."],["petak","pet.","pe.","pe."],["subota","sub.","su.","su."]],
     "sr-Latn-CS" : [["nedelja","ned.","ne","ne"],["ponedeljak","pon.","po","po"],["utorak","uto.","ut","ut"],["sreda","sre.","sr","sr"],["četvrtak","čet.","če","če"],["petak","pet.","pe","pe"],["subota","sub.","su","su"]],
     "sr-Latn-ME" : [["nedelja","ned","ne","ne"],["ponedeljak","pon","po","po"],["utorak","uto","ut","ut"],["sreda","sre","sr","sr"],["četvrtak","čet","če","če"],["petak","pet","pe","pe"],["subota","sub","su","su"]],
     "sr-Latn-RS" : [["nedelja","ned.","ne","ne"],["ponedeljak","pon.","po","po"],["utorak","uto.","ut","ut"],["sreda","sre.","sr","sr"],["četvrtak","čet.","če","če"],["petak","pet.","pe","pe"],["subota","sub.","su","su"]],
     "st-ZA" : [["Sontaha","Son","Son","Son"],["Mmantaha","Mma","Mma","Mma"],["Labobedi","Bed","Bed","Bed"],["Laboraru","Rar","Rar","Rar"],["Labone","Ne","Ne","Ne"],["Labohlane","Hla","Hla","Hla"],["Moqebelo","Moq","Moq","Moq"]],
     "sv-FI" : [["söndag","sö","sö","sö"],["måndag","må","må","må"],["tisdag","ti","ti","ti"],["onsdag","on","on","on"],["torsdag","to","to","to"],["fredag","fr","fr","fr"],["lördag","lö","lö","lö"]],
     "sv-SE" : [["söndag","sön","sö","sö"],["måndag","mån","må","må"],["tisdag","tis","ti","ti"],["onsdag","ons","on","on"],["torsdag","tor","to","to"],["fredag","fre","fr","fr"],["lördag","lör","lö","lö"]],
     "sw-KE" : [["Jumapili","Jumap.","P","P"],["Jumatatu","Jumat.","T","T"],["Jumanne","Juman.","N","N"],["Jumatano","Jumat.","T","T"],["Alhamisi","Alh.","A","A"],["Ijumaa","Iju.","I","I"],["Jumamosi","Jumam.","M","M"]],
     "syr-SY" : [["ܚܕ ܒܫܒܐ","܏ܐ ܏ܒܫ","ܐ","ܐ"],["ܬܪܝܢ ܒܫܒܐ","܏ܒ ܏ܒܫ","ܒ","ܒ"],["ܬܠܬܐ ܒܫܒܐ","܏ܓ ܏ܒܫ","ܓ","ܓ"],["ܐܪܒܥܐ ܒܫܒܐ","܏ܕ ܏ܒܫ","ܕ","ܕ"],["ܚܡܫܐ ܒܫܒܐ","܏ܗ ܏ܒܫ","ܗ","ܗ"],["ܥܪܘܒܬܐ","܏ܥܪܘܒ","ܥ","ܥ"],["ܫܒܬܐ","܏ܫܒ","ܫ","ܫ"]],
     "ta-IN" : [["ஞாயிற்றுக்கிழமை","ஞாயிறு","ஞா","ஞா"],["திங்கள்கிழமை","திங்கள்","தி","தி"],["செவ்வாய்க்கிழமை","செவ்வாய்","செ","செ"],["புதன்கிழமை","புதன்","பு","பு"],["வியாழக்கிழமை","வியாழன்","வி","வி"],["வெள்ளிக்கிழமை","வெள்ளி","வெ","வெ"],["சனிக்கிழமை","சனி","ச","ச"]],
     "ta-LK" : [["ஞாயிற்றுக்கிழமை","ஞாயிறு","ஞா","ஞா"],["திங்கட்கிழமை","திங்கள்","தி","தி"],["செவ்வாய்க்கிழமை","செவ்வாய்","செ","செ"],["புதன்கிழமை","புதன்","பு","பு"],["வியாழக்கிழமை","வியாழன்","வி","வி"],["வெள்ளிக்கிழமை","வெள்ளி","வெ","வெ"],["சனிக்கிழமை","சனி","ச","ச"]],
     "te-IN" : [["ఆదివారం","ఆది.","ఆ","ఆ"],["సోమవారం","సోమ.","సో","సో"],["మంగళవారం","మంగళ.","మం","మం"],["బుధవారం","బుధ.","బు","బు"],["గురువారం","గురు.","గు","గు"],["శుక్రవారం","శుక్ర.","శు","శు"],["శనివారం","శని.","శ","శ"]],
     "tg-Cyrl-TJ" : [["якшанбе","пкш","яш","яш"],["душанбе","дшб","дш","дш"],["сешанбе","сшб","сш","сш"],["чоршанбе","чшб","чш","чш"],["панҷшанбе","пшб","пш","пш"],["ҷумъа","ҷум","ҷм","ҷм"],["шанбе","шнб","шб","шб"]],
     "th-TH" : [["อาทิตย์","อา.","อ","อ"],["จันทร์","จ.","จ","จ"],["อังคาร","อ.","อ","อ"],["พุธ","พ.","พ","พ"],["พฤหัสบดี","พฤ.","พ","พ"],["ศุกร์","ศ.","ศ","ศ"],["เสาร์","ส.","ส","ส"]],
     "ti-ER" : [["ሰንበት","ሰንበት","ሰን","ሰን"],["ሰኑይ","ሰኑይ","ሰኑ","ሰኑ"],["ሰሉስ","ሰሉስ","ሰሉ","ሰሉ"],["ሮቡዕ","ሮቡዕ","ሮቡ","ሮቡ"],["ሓሙስ","ሓሙስ","ሓሙ","ሓሙ"],["ዓርቢ","ዓርቢ","ዓር","ዓር"],["ቀዳም","ቀዳም","ቀዳ","ቀዳ"]],
     "ti-ET" : [["ሰንበት","ሰንበት","ሰን","ሰን"],["ሰኑይ","ሰኑይ","ሰኑ","ሰኑ"],["ሰሉስ","ሰሉስ","ሰሉ","ሰሉ"],["ሮቡዕ","ሮቡዕ","ሮቡ","ሮቡ"],["ሓሙስ","ሓሙስ","ሓሙ","ሓሙ"],["ዓርቢ","ዓርቢ","ዓር","ዓር"],["ቀዳም","ቀዳም","ቀዳ","ቀዳ"]],
     "tk-TM" : [["Ýekşenbe","Ýb","Ý","Ý"],["Duşenbe","Db","D","D"],["Sişenbe","Sb","S","S"],["Çarşenbe","Çb","Ç","Ç"],["Penşenbe","Pb","P","P"],["Anna","An","A","A"],["Şenbe","Şb","Ş","Ş"]],
     "tn-BW" : [["Sontaga","Sont.","So","So"],["Mosupologo","Mos.","Ms","Ms"],["Labobedi","Lab.","Lb","Lb"],["Laboraro","Labr.","Lr","Lr"],["Labone","Labn.","Ln","Ln"],["Labotlhano","Labt.","Lt","Lt"],["Matlhatso","Matlh.","Ma","Ma"]],
     "tn-ZA" : [["Sontaga","Sont.","So","So"],["Mosupologo","Mos.","Ms","Ms"],["Labobedi","Lab.","Lb","Lb"],["Laboraro","Labr.","Lr","Lr"],["Labone","Labn.","Ln","Ln"],["Labotlhano","Labt.","Lt","Lt"],["Matlhatso","Matlh.","Ma","Ma"]],
     "tr-TR" : [["Pazar","Paz","Pz","Pz"],["Pazartesi","Pzt","Pt","Pt"],["Salı","Sal","Sa","Sa"],["Çarşamba","Çar","Ça","Ça"],["Perşembe","Per","Pe","Pe"],["Cuma","Cum","Cu","Cu"],["Cumartesi","Cmt","Ct","Ct"]],
     "ts-ZA" : [["Sonto","Son","Son","Son"],["Musumbhunuku","Mus","Mus","Mus"],["Ravumbirhi","Bir","Bir","Bir"],["Ravunharhu","Har","Har","Har"],["Ravumune","Ne","Ne","Ne"],["Ravuntlhanu","Tlh","Tlh","Tlh"],["Mugqivela","Mug","Mug","Mug"]],
     "tt-RU" : [["якшәмбе","якш.","я","я"],["дүшәмбе","дүш.","д","д"],["сишәмбе","сиш.","с","с"],["чәршәмбе","чәрш.","ч","ч"],["пәнҗешәмбе","пәнҗ.","п","п"],["җомга","җом.","җ","җ"],["шимбә","шим.","ш","ш"]],
     "tzm-Latn-DZ" : [["lh'ed","lh'd","lh","lh"],["letnayen","let","lt","lt"],["ttlata","ttl","tt","tt"],["larebâa","lar","la","la"],["lexmis","lex","lx","lx"],["ldjemâa","ldj","ld","ld"],["ssebt","sse","ss","ss"]],
     "tzm-Tfng-MA" : [["ⴰⵙⴰⵎⴰⵙ","ⵙⵎⵙ","ⵙⵎ","ⵙⵎ"],["ⴰⵢⵏⴰⵙ","ⵢⵏⵙ","ⵢⵏ","ⵢⵏ"],["ⴰⵙⵉⵏⴰⵙ","ⵙⵏⵙ","ⵙⵏ","ⵙⵏ"],["ⴰⴽⵕⴰⵙ","ⴽⵕⵙ","ⴽⵕ","ⴽⵕ"],["ⴰⴽⵡⴰⵙ","ⴽⵡⵙ","ⴽⵡ","ⴽⵡ"],["ⴰⵙⵉⵎⵡⴰⵙ","ⵙⵎⵡ","ⵙⵡ","ⵙⵡ"],["ⴰⵙⵉⴹⵢⴰⵙ","ⵙⴹⵙ","ⵙⴹ","ⵙⴹ"]],
     "ug-CN" : [["يەكشەنبە","يە","ي","ي"],["دۈشەنبە","دۈ","د","د"],["سەيشەنبە","سە","س","س"],["چارشەنبە","چا","چ","چ"],["پەيشەنبە","پە","پ","پ"],["جۈمە","جۈ","ج","ج"],["شەنبە","شە","ش","ش"]],
     "uk-UA" : [["неділя","Нд","Нд","Нд"],["понеділок","Пн","Пн","Пн"],["вівторок","Вт","Вт","Вт"],["середа","Ср","Ср","Ср"],["четвер","Чт","Чт","Чт"],["п'ятниця","Пт","Пт","Пт"],["субота","Сб","Сб","Сб"]],
     "ur-IN" : [["اتوار","اتوار","ا","ا"],["پیر","پیر","پ","پ"],["منگل","منگل","م","م"],["بدھ","بدھ","ب","ب"],["جمعرات","جمعرات","ج","ج"],["جمعہ","جمعہ","ج","ج"],["ہفتہ","ہفتہ","ہ","ہ"]],
     "ur-PK" : [["اتوار","اتوار","ا","ا"],["پير","پير","پ","پ"],["منگل","منگل","م","م"],["بدھ","بدھ","ب","ب"],["جمعرات","جمعرات","ج","ج"],["جمعه","جمعه","ج","ج"],["هفته","هفته","ه","ه"]],
     "uz-Cyrl-UZ" : [["якшанба","якш","як","як"],["душанба","дш","д","д"],["сешанба","сш","с","с"],["чоршанба","чш","ч","ч"],["пайшанба","пш","п","п"],["жума","ж","ж","ж"],["шанба","ш","ш","ш"]],
     "uz-Latn-UZ" : [["yakshanba","Ya","Ya","Ya"],["dushanba","Du","D","D"],["seshanba","Se","S","S"],["chorshanba","Ch","Ch","Ch"],["payshanba","Pa","P","P"],["juma","Ju","J","J"],["shanba","Sh","Sh","Sh"]],
     "vi-VN" : [["Chủ Nhật","CN","C","C"],["Thứ Hai","T2","H","H"],["Thứ Ba","T3","B","B"],["Thứ Tư","Tư","T","T"],["Thứ Năm","Năm","N","N"],["Thứ Sáu","Sáu","S","S"],["Thứ Bảy","Bảy","B","B"]],
     "wo-SN" : [["Dibéer","Dib.","Di","Di"],["Altine","Alt.","Al","Al"],["Talaata","Tal.","Ta","Ta"],["Àllarba","Àll.","Àl","Àl"],["Alxames","Alx.","Ax","Ax"],["Àjjuma","Àjj.","Àj","Àj"],["Gaawu","Gaa.","Ga","Ga"]],
     "xh-ZA" : [["iCawa","iCa.","Ca","Ca"],["uMvulo","uMv.","Mv","Mv"],["uLwesibini","uLwesib.","Lb","Lb"],["uLwesithathu","uLwesith.","Lt","Lt"],["uLwesine","uLwesin.","Ln","Ln"],["uLwesihlanu","uLwesihl.","Lh","Lh"],["uMgqibelo","uMgq.","Mg","Mg"]],
     "yo-NG" : [["Àìkú","Àìk","Àì","Àì"],["Ajé","Ajé","Aj","Aj"],["Ìṣẹ́gun","Ìṣg","Ìṣ","Ìṣ"],["Ọjọ́'rú","Ọjr","Ọj","Ọj"],["Ọjọ́'bọ̀","Ọjb","Ọb","Ọb"],["Ẹtì","Ẹti","Ẹt","Ẹt"],["Àbámẹ́ta","Àbá","Àb","Àb"]],
     "zgh-Tfng-MA" : [["ⴰⵙⴰⵎⴰⵙ","ⵙⵎⵙ","ⵙⵎ","ⵙⵎ"],["ⴰⵢⵏⴰⵙ","ⵢⵏⵙ","ⵢⵏ","ⵢⵏ"],["ⴰⵙⵉⵏⴰⵙ","ⵙⵏⵙ","ⵙⵏ","ⵙⵏ"],["ⴰⴽⵕⴰⵙ","ⴽⵕⵙ","ⴽⵕ","ⴽⵕ"],["ⴰⴽⵡⴰⵙ","ⴽⵡⵙ","ⴽⵡ","ⴽⵡ"],["ⴰⵙⵉⵎⵡⴰⵙ","ⵙⵎⵡ","ⵙⵡ","ⵙⵡ"],["ⴰⵙⵉⴹⵢⴰⵙ","ⵙⴹⵙ","ⵚⴹ","ⵚⴹ"]],
     "zh-CN" : [["星期日","周日","日","日"],["星期一","周一","一","一"],["星期二","周二","二","二"],["星期三","周三","三","三"],["星期四","周四","四","四"],["星期五","周五","五","五"],["星期六","周六","六","六"]],
     "zh-HK" : [["星期日","週日","日","日"],["星期一","週一","一","一"],["星期二","週二","二","二"],["星期三","週三","三","三"],["星期四","週四","四","四"],["星期五","週五","五","五"],["星期六","週六","六","六"]],
     "zh-MO" : [["星期日","週日","日","日"],["星期一","週一","一","一"],["星期二","週二","二","二"],["星期三","週三","三","三"],["星期四","週四","四","四"],["星期五","週五","五","五"],["星期六","週六","六","六"]],
     "zh-SG" : [["星期日","周日","日","日"],["星期一","周一","一","一"],["星期二","周二","二","二"],["星期三","周三","三","三"],["星期四","周四","四","四"],["星期五","周五","五","五"],["星期六","周六","六","六"]],
     "zh-TW" : [["星期日","週日","日","日"],["星期一","週一","一","一"],["星期二","週二","二","二"],["星期三","週三","三","三"],["星期四","週四","四","四"],["星期五","週五","五","五"],["星期六","週六","六","六"]],
     "zu-ZA" : [["iSonto","Son.","So","So"],["uMsombuluko","Mso.","Ms","Ms"],["uLwesibili","Bi.","Bi","Bi"],["uLwesithathu","Tha.","Th","Th"],["uLwesine","Ne.","Ne","Ne"],["uLwesihlanu","Hla.","Hl","Hl"],["uMgqibelo","Mgq.","Mg","Mg"]]
}

var localeDatePatterns={
     "af-ZA" : ["yyyy/MM/dd","dd MMMM yyyy","dd MMMM yyyy hh:mm:ss tt","d MMMM","MMMM yyyy","/"],
     "am-ET" : ["d/M/yyyy","wwww '፣' MMMM d 'ቀን' yyyy","wwww '፣' MMMM d 'ቀን' yyyy h:mm:ss tt","MMMM d' ቀን'","MMMM yyyy","/"],
     "ar-AE" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy hh:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "ar-BH" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy hh:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "ar-DZ" : ["dd-MM-yyyy","dd MMMM, yyyy","dd MMMM, yyyy H:mm:ss","dd MMMM","MMMM, yyyy","-"],
     "ar-EG" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy hh:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "ar-IQ" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy hh:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "ar-JO" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy hh:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "ar-KW" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy hh:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "ar-LB" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy hh:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "ar-LY" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy hh:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "ar-MA" : ["dd-MM-yyyy","dd MMMM, yyyy","dd MMMM, yyyy H:mm:ss","dd MMMM","MMMM, yyyy","-"],
     "ar-OM" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy hh:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "ar-QA" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy hh:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "ar-SA" : ["dd/MM/yy","dd/MMMM/yyyy","dd/MMMM/yyyy hh:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "ar-SY" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy hh:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "ar-TN" : ["dd-MM-yyyy","dd MMMM, yyyy","dd MMMM, yyyy H:mm:ss","dd MMMM","MMMM, yyyy","-"],
     "ar-YE" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy hh:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "arn-CL" : ["dd-MM-yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy H:mm:ss","d' de 'MMMM","MMMM' de 'yyyy","-"],
     "as-IN" : ["dd-MM-yyyy","yyyy,MMMM dd, wwww","yyyy,MMMM dd, wwww tt h:mm:ss","d MMMM","MMMM,yy","-"],
     "az-Cyrl-AZ" : ["dd.MM.yyyy","d MMMM yyyy","d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","."],
     "az-Latn-AZ" : ["dd.MM.yyyy","dd MMMM yyyy'-cü il'","dd MMMM yyyy'-cü il' HH:mm:ss","d MMMM","MMMM yyyy","."],
     "ba-RU" : ["dd.MM.yy","d MMMM yyyy 'й'","d MMMM yyyy 'й' H:mm:ss","d MMMM","MMMM yyyy","."],
     "be-BY" : ["dd.MM.yy","d MMMM yyyy","d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","."],
     "bg-BG" : ["d.M.yyyy 'г.'","dd MMMM yyyy 'г.'","dd MMMM yyyy 'г.' H:mm:ss","d MMMM","MMMM yyyy 'г.'","."],
     "bn-BD" : ["dd-MM-yy","dd MMMM yyyy","dd MMMM yyyy HH.mm.ss","dd MMMM","MMMM, yyyy","-"],
     "bn-IN" : ["dd-MM-yy","dd MMMM yyyy","dd MMMM yyyy HH.mm.ss","d MMMM","MMMM, yyyy","-"],
     "bo-CN" : ["yyyy/M/d","yyyy'ལོའི་ཟླ' M'ཚེས' d","yyyy'ལོའི་ཟླ' M'ཚེས' d HH:mm:ss","ཟླ་Mཚེས་d","yyyy'ལོའི་ཟླ་' M","/"],
     "br-FR" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "bs-Cyrl-BA" : ["d.M.yyyy","d. MMMM yyyy","d. MMMM yyyy H:mm:ss","MMMM dd","MMMM, yyyy","."],
     "bs-Latn-BA" : ["d.M.yyyy","d. MMMM yyyy","d. MMMM yyyy H:mm:ss","dd. MMMM","MMMM yyyy","."],
     "ca-ES" : ["dd/MM/yyyy","wwww, d MMMM' de 'yyyy","wwww, d MMMM' de 'yyyy H:mm:ss","d MMMM","MMMM' de 'yyyy","/"],
     "ca-ES-valencia" : ["dd/MM/yy","wwww, d MMMM' del 'yyyy","wwww, d MMMM' del 'yyyy HH:mm:ss","d MMMM","MM/yy","/"],
     "chr-Cher-US" : ["M/d/yyyy","wwww, MMMM dd,yyyy","wwww, MMMM dd,yyyy h:mm:ss tt","MMMM d","MMMM, yyyy","/"],
     "co-FR" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy H:mm:ss","d' di 'MMMM","MMMM' di u 'yyyy","/"],
     "cs-CZ" : ["d. M. yyyy","d. MMMM yyyy","d. MMMM yyyy H:mm:ss","d. MMMM","MMMM yyyy",". "],
     "cy-GB" : ["dd/MM/yy","d MMMM yyyy","d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "da-DK" : ["dd-MM-yyyy","d. MMMM yyyy","d. MMMM yyyy HH:mm:ss","d. MMMM","MMMM yyyy","-"],
     "de-AT" : ["dd.MM.yyyy","wwww, dd. MMMM yyyy","wwww, dd. MMMM yyyy HH:mm:ss","d. MMMM","MMMM yyyy","."],
     "de-CH" : ["dd.MM.yyyy","wwww, d. MMMM yyyy","wwww, d. MMMM yyyy HH:mm:ss","d. MMMM","MMMM yyyy","."],
     "de-DE" : ["dd.MM.yyyy","wwww, d. MMMM yyyy","wwww, d. MMMM yyyy HH:mm:ss","d. MMMM","MMMM yyyy","."],
     "de-LI" : ["dd.MM.yyyy","wwww, d. MMMM yyyy","wwww, d. MMMM yyyy HH:mm:ss","d. MMMM","MMMM yyyy","."],
     "de-LU" : ["dd.MM.yyyy","wwww' den 'd'.' MMMM yyyy","wwww' den 'd'.' MMMM yyyy HH:mm:ss","d. MMMM","MMMM yyyy","."],
     "dsb-DE" : ["d. M. yyyy","wwww, d. MMMM yyyy","wwww, d. MMMM yyyy HH:mm:ss","d. MMMM","MMMM yyyy",". "],
     "dv-MV" : ["dd/MM/yy","www, yyyy MMMM dd","www, yyyy MMMM dd HH:mm:ss","MMMM dd","yyyy, MMMM","/"],
     "el-GR" : ["d/M/yyyy","wwww, d MMMM yyyy","wwww, d MMMM yyyy h:mm:ss tt","d MMMM","MMMM yyyy","/"],
     "en-029" : ["dd/MM/yyyy","wwww, dd MMMM yyyy","wwww, dd MMMM yyyy HH:mm:ss","d MMMM","MMMM, yyyy","/"],
     "en-AU" : ["d/MM/yyyy","wwww, d MMMM yyyy","wwww, d MMMM yyyy h:mm:ss tt","MMMM d","MMMM yyyy","/"],
     "en-BZ" : ["dd/MM/yyyy","wwww, dd MMMM yyyy","wwww, dd MMMM yyyy hh:mm:ss tt","d MMMM","MMMM yyyy","/"],
     "en-CA" : ["yyyy-MM-dd","MMMM d, yyyy","MMMM d, yyyy h:mm:ss tt","d MMMM","MMMM, yyyy","-"],
     "en-GB" : ["dd/MM/yyyy","dd MMMM yyyy","dd MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "en-HK" : ["d/M/yy","wwww, d MMMM, yyyy","wwww, d MMMM, yyyy h:mm:ss tt","d MMMM","MMMM yyyy","/"],
     "en-IE" : ["dd/MM/yyyy","dd MMMM yyyy","dd MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "en-IN" : ["dd-MM-yyyy","dd MMMM yyyy","dd MMMM yyyy HH:mm:ss","d MMMM","MMMM, yyyy","-"],
     "en-JM" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy HH:mm:ss","d MMMM","MMMM, yyyy","/"],
     "en-MY" : ["d/M/yyyy","wwww, d MMMM, yyyy","wwww, d MMMM, yyyy h:mm:ss tt","d MMMM","MMMM, yyyy","/"],
     "en-NZ" : ["d/MM/yyyy","wwww, d MMMM yyyy","wwww, d MMMM yyyy h:mm:ss tt","d MMMM","MMMM yyyy","/"],
     "en-PH" : ["M/d/yyyy","wwww, MMMM dd, yyyy","wwww, MMMM dd, yyyy h:mm:ss tt","MMMM d","MMMM, yyyy","/"],
     "en-SG" : ["d/M/yyyy","wwww, d MMMM yyyy","wwww, d MMMM yyyy h:mm:ss tt","d MMMM","MMMM yyyy","/"],
     "en-TT" : ["dd/MM/yyyy","wwww, dd MMMM yyyy","wwww, dd MMMM yyyy hh:mm:ss tt","d MMMM","MMMM yyyy","/"],
     "en-US" : ["M/d/yyyy","wwww, MMMM d, yyyy","wwww, MMMM d, yyyy h:mm:ss tt","MMMM d","MMMM yyyy","/"],
     "en-ZA" : ["yyyy-MM-dd","dd MMMM yyyy","dd MMMM yyyy hh:mm:ss tt","MMMM d","MMMM yyyy","-"],
     "en-ZW" : ["dd/MM/yyyy","wwww, d MMMM yyyy","wwww, d MMMM yyyy h:mm:ss tt","d MMMM","MMMM/yyyy","/"],
     "es-419" : ["dd/MM/yy","wwww, d 'de' MMMM 'de' yyyy","wwww, d 'de' MMMM 'de' yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "es-AR" : ["dd/MM/yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy hh:mm:ss tt","dd' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-BO" : ["dd/MM/yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy hh:mm:ss tt","d' de 'MMM","MMMM' de 'yyyy","/"],
     "es-CL" : ["dd-MM-yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy H:mm:ss","d' de 'MMM","MMMM' de 'yyyy","-"],
     "es-CO" : ["dd/MM/yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy h:mm:ss tt","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-CR" : ["dd/MM/yyyy","wwww d' de 'MMMM' de 'yyyy","wwww d' de 'MMMM' de 'yyyy hh:mm:ss tt","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-DO" : ["d/M/yy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy h:mm:ss tt","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-EC" : ["dd/MM/yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy H:mm:ss","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-ES" : ["dd/MM/yyyy","wwww, d' de 'MMMM' de 'yyyy","wwww, d' de 'MMMM' de 'yyyy H:mm:ss","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-GT" : ["dd/MM/yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy h:mm:ss tt","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-HN" : ["dd/MM/yyyy","wwww, d' de 'MMMM' de 'yyyy","wwww, d' de 'MMMM' de 'yyyy hh:mm:ss tt","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-MX" : ["dd/MM/yyyy","wwww, d' de 'MMMM' de 'yyyy","wwww, d' de 'MMMM' de 'yyyy hh:mm:ss tt","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-NI" : ["dd/MM/yyyy","wwww, d' de 'MMMM' de 'yyyy","wwww, d' de 'MMMM' de 'yyyy hh:mm:ss tt","d' de 'MMMM","MMMM' del 'yyyy","/"],
     "es-PA" : ["d/M/yy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy h:mm:ss tt","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-PE" : ["dd/MM/yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy hh:mm:ss tt","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-PR" : ["dd/MM/yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy hh:mm:ss tt","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-PY" : ["dd/MM/yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy hh:mm:ss tt","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-SV" : ["dd/MM/yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy hh:mm:ss tt","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-US" : ["M/d/yyyy","wwww, MMMM dd, yyyy","wwww, MMMM dd, yyyy h:mm:ss tt","MMMM d","MMMM' de 'yyyy","/"],
     "es-UY" : ["dd/MM/yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy H:mm:ss","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "es-VE" : ["dd-MM-yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy hh:mm:ss tt","d' de 'MMMM","MMMM' de 'yyyy","-"],
     "et-EE" : ["d.MM.yyyy","d. MMMM yyyy","d. MMMM yyyy H:mm:ss","dd. MMMM","MMMM yyyy","."],
     "eu-ES" : ["yyyy/MM/dd","wwww, yyyy'(e)ko' MMMM'ren' d'a'","wwww, yyyy'(e)ko' MMMM'ren' d'a' H:mm:ss","MMMM'ren' d'a'","yyyy'(e)ko' MMMM","/"],
     "fa-IR" : ["dd/MM/yyyy","wwww, dd MMMM yyyy","wwww, dd MMMM yyyy hh:mm:ss tt","d MMMM","MMMM, yyyy","/"],
     "ff-Latn-SN" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","dd MMMM","MMMM yyyy","/"],
     "fi-FI" : ["d.M.yyyy","d. MMMM yyyy","d. MMMM yyyy H:mm:ss","d'.' MMMM","MMMM yyyy","."],
     "fil-PH" : ["M/d/yyyy","wwww, MMMM dd, yyyy","wwww, MMMM dd, yyyy h:mm:ss tt","MM/dd","MMMM, yyyy","/"],
     "fo-FO" : ["dd-MM-yyyy","d. MMMM yyyy","d. MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","-"],
     "fr-BE" : ["dd-MM-yy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","-"],
     "fr-CA" : ["yyyy-MM-dd","d MMMM yyyy","d MMMM yyyy HH:mm:ss","d MMMM","MMMM, yyyy","-"],
     "fr-CD" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "fr-CH" : ["dd.MM.yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","."],
     "fr-CI" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "fr-CM" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "fr-FR" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "fr-HT" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "fr-LU" : ["dd/MM/yyyy","wwww', le 'd MMMM yyyy","wwww', le 'd MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "fr-MA" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "fr-MC" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "fr-ML" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "fr-RE" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "fr-SN" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "fy-NL" : ["d-M-yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy H:mm:ss","d MMMM","MMMM yyyy","-"],
     "ga-IE" : ["dd/MM/yyyy","d MMMM yyyy","d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "gd-GB" : ["dd/MM/yyyy","dd MMMM yyyy","dd MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "gl-ES" : ["dd/MM/yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy H:mm:ss","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "gn-PY" : ["dd/MM/yyyy","wwww, dd MMMM, yyyy","wwww, dd MMMM, yyyy HH:mm:ss","dd MMMM","MMMM, yyyy","/"],
     "gsw-FR" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d. MMMM","MMMM yyyy","/"],
     "gu-IN" : ["dd-MM-yy","dd MMMM yyyy","dd MMMM yyyy HH:mm:ss","dd MMMM","MMMM, yyyy","-"],
     "ha-Latn-NG" : ["d/M/yyyy","wwww, MMMM dd, yyyy","wwww, MMMM dd, yyyy h:mm:ss tt","d MMMM","MMMM, yyyy","/"],
     "haw-US" : ["M/d/yyyy","wwww, MMMM dd, yyyy","wwww, MMMM dd, yyyy h:mm:ss tt","d MMMM","MMMM, yyyy","/"],
     "he-IL" : ["dd/MM/yyyy","wwww dd MMMM yyyy","wwww dd MMMM yyyy HH:mm:ss","dd MMMM","MMMM yyyy","/"],
     "hi-IN" : ["dd-MM-yyyy","dd MMMM yyyy","dd MMMM yyyy HH:mm:ss","dd MMMM","MMMM, yyyy","-"],
     "hr-BA" : ["d.M.yyyy.","d. MMMM yyyy.","d. MMMM yyyy. H:mm:ss","d. MMMM","MMMM, yyyy","."],
     "hr-HR" : ["d.M.yyyy.","d. MMMM yyyy.","d. MMMM yyyy. H:mm:ss","d. MMMM","MMMM, yyyy","."],
     "hsb-DE" : ["d. M. yyyy","wwww, 'dnja' d. MMMM yyyy","wwww, 'dnja' d. MMMM yyyy H.mm.ss","d. MMMM","MMMM yyyy",". "],
     "hu-HU" : ["yyyy.MM.dd.","yyyy. MMMM d.","yyyy. MMMM d. H:mm:ss","MMMM d.","yyyy. MMMM","."],
     "hy-AM" : ["dd.MM.yyyy","d MMMM, yyyy","d MMMM, yyyy HH:mm:ss","d MMMM","MMMM, yyyy","."],
     "id-ID" : ["dd/MM/yyyy","dd MMMM yyyy","dd MMMM yyyy H:mm:ss","dd MMMM","MMMM yyyy","/"],
     "ig-NG" : ["d/M/yyyy","wwww, MMMM dd, yyyy","wwww, MMMM dd, yyyy h.mm.ss tt","d MMMM","MMMM, yyyy","/"],
     "ii-CN" : ["yyyy/M/d","yyyy'ꈎ' M'ꆪ' d'ꑍ'","yyyy'ꈎ' M'ꆪ' d'ꑍ' tt h:mm:ss","M'’ ꆪ’'d'’ ꑍ’'","yyyy'ꈎ' M'ꆪ'","/"],
     "is-IS" : ["d.M.yyyy","d. MMMM yyyy","d. MMMM yyyy HH:mm:ss","d. MMMM","MMMM yyyy","."],
     "it-CH" : ["dd.MM.yyyy","wwww, d. MMMM yyyy","wwww, d. MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","."],
     "it-IT" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "iu-Cans-CA" : ["d/M/yyyy","wwww,MMMM dd,yyyy","wwww,MMMM dd,yyyy h:mm:ss tt","d MMMM","MMMM,yyyy","/"],
     "iu-Latn-CA" : ["d/MM/yyyy","wwww, dd MMMM, yyyy","wwww, dd MMMM, yyyy h:mm:ss tt","MMMM d","MMMM, yyyy","/"],
     "ja-JP" : ["yyyy/MM/dd","yyyy'年'M'月'd'日'","yyyy'年'M'月'd'日' H:mm:ss","M'月'd'日'","yyyy'年'M'月'","/"],
     "jv-Latn-ID" : ["dd/MM/yyyy","dd MMMM yyyy","dd MMMM yyyy HH.mm.ss","dd MMMM","MMMM yyyy","/"],
     "ka-GE" : ["dd.MM.yyyy","wwww, d MMMM, yyyy 'წელი'","wwww, d MMMM, yyyy 'წელი' H:mm:ss","d MMMM","MMMM yyyy","."],
     "kk-KZ" : ["d-MMM-yy","d MMMM yyyy 'ж.'","d MMMM yyyy 'ж.' HH:mm:ss","d MMMM","MMMM yyyy","-"],
     "kl-GL" : ["dd-MM-yyyy","MMMM d'.-at, 'yyyy","MMMM d'.-at, 'yyyy HH:mm:ss","MMMM d'.-at'","MMMM yyyy","-"],
     "km-KH" : ["dd/MM/yy","d MMMM yyyy","d MMMM yyyy HH:mm:ss","d MMMM","'ខែ' MM 'ឆ្នាំ' yyyy","/"],
     "kn-IN" : ["dd-MM-yy","dd MMMM yyyy","dd MMMM yyyy HH:mm:ss","MMMM d","MMMM, yyyy","-"],
     "ko-KR" : ["yyyy-MM-dd","yyyy'년' M'월' d'일' wwww","yyyy'년' M'월' d'일' wwww tt h:mm:ss","M'월' d'일'","yyyy'년' M'월'","-"],
     "kok-IN" : ["dd-MM-yyyy","dd MMMM yyyy","dd MMMM yyyy HH:mm:ss","dd MMMM","MMMM, yyyy","-"],
     "ku-Arab-IQ" : ["yyyy/MM/dd","wwww, dd MMMM, yyyy","wwww, dd MMMM, yyyy hh:mm:ss tt","d MMMM","MMMM, yyyy","/"],
     "ky-KG" : ["d-MMM yy","dd'-'MMMM yyyy'-ж.'","dd'-'MMMM yyyy'-ж.' HH:mm:ss","d'-'MMMM","MMMM yyyy'-ж.'","-"],
     "lb-LU" : ["dd.MM.yy","d. MMMM yyyy","d. MMMM yyyy HH:mm:ss","dd. MMMM","MMMM yyyy","."],
     "lo-LA" : ["dd/MM/yyyy","dd MMMM yyyy","dd MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "lt-LT" : ["yyyy-MM-dd","yyyy 'm.' MMMM d 'd.'","yyyy 'm.' MMMM d 'd.' HH:mm:ss","MMMM d 'd.'","yyyy 'm.' MMMM","-"],
     "lv-LV" : ["dd.MM.yyyy.","wwww, yyyy'. gada 'd. MMMM","wwww, yyyy'. gada 'd. MMMM H:mm:ss","d. MMMM","yyyy'. gada 'MMMM","."],
     "mg-MG" : ["d/M/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "mi-NZ" : ["dd/MM/yyyy","wwww, dd MMMM, yyyy","wwww, dd MMMM, yyyy h:mm:ss tt","d MMMM","MMMM, yy","/"],
     "mk-MK" : ["dd.MM.yyyy","wwww, dd MMMM yyyy","wwww, dd MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","."],
     "ml-IN" : ["dd-MM-yy","dd MMMM yyyy","dd MMMM yyyy HH.mm.ss","MMMM dd","MMMM, yyyy","-"],
     "mn-MN" : ["yyyy-MM-dd","yyyy 'оны' M'-р сарын' d. wwww 'гариг'.","yyyy 'оны' M'-р сарын' d. wwww 'гариг'. HH:mm:ss","MMMM d.","yyyy 'оны' MMMM","-"],
     "mn-Mong-CN" : ["yyyy/M/d","yyyyᠣᠨ MMMM dᠡᠳᠦᠷ᠂ wwww","yyyyᠣᠨ MMMM dᠡᠳᠦᠷ᠂ wwww H:mm:ss","MMMM dᠡᠳᠦᠷ","yyyyᠣᠨ MMMM","/"],
     "mn-Mong-MN" : ["yyyy/M/d","yyyyᠣᠨ MMMM dᠡᠳᠦᠷ᠂ wwww","yyyyᠣᠨ MMMM dᠡᠳᠦᠷ᠂ wwww H:mm:ss","MMMM dᠡᠳᠦᠷ","yyyyᠣᠨ MMMM","/"],
     "moh-CA" : ["M/d/yyyy","wwww, MMMM dd, yyyy","wwww, MMMM dd, yyyy h:mm:ss tt","MMMM dd","MMMM, yyyy","/"],
     "mr-IN" : ["dd-MM-yyyy","dd MMMM yyyy","dd MMMM yyyy HH:mm:ss","dd MMMM","MMMM, yyyy","-"],
     "ms-BN" : ["dd/MM/yyyy","dd MMMM yyyy","dd MMMM yyyy H:mm:ss","dd MMMM","MMMM yyyy","/"],
     "ms-MY" : ["dd/MM/yyyy","dd MMMM yyyy","dd MMMM yyyy H:mm:ss","dd MMMM","MMMM yyyy","/"],
     "mt-MT" : ["dd/MM/yyyy","wwww, d' ta\' 'MMMM yyyy","wwww, d' ta\' 'MMMM yyyy HH:mm:ss","d' ta\' 'MMMM","MMMM yyyy","/"],
     "my-MM" : ["dd-MM-yyyy","yyyy MMMM d","yyyy MMMM d HH:mm:ss","MMMM d","yyyy MMMM","-"],
     "nb-NO" : ["dd.MM.yyyy","d. MMMM yyyy","d. MMMM yyyy HH:mm:ss","d. MMMM","MMMM yyyy","."],
     "ne-IN" : ["yyyy-MM-dd","yyyy MMMM d, wwww","yyyy MMMM d, wwww HH:mm:ss","MMMM d","yyyy MMMM","-"],
     "ne-NP" : ["M/d/yyyy","wwww, MMMM dd, yyyy","wwww, MMMM dd, yyyy h:mm:ss tt","dd MMMM","MMMM,yyyy","/"],
     "nl-BE" : ["d/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy H:mm:ss","d MMMM","MMMM yyyy","/"],
     "nl-NL" : ["d-M-yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","-"],
     "nn-NO" : ["dd.MM.yyyy","d. MMMM yyyy","d. MMMM yyyy HH:mm:ss","d. MMMM","MMMM yyyy","."],
     "nqo-GN" : ["dd/MM/yyyy","wwww, MMMM dd, yyyy","wwww, MMMM dd, yyyy tt hh:mm:ss","MMMM ߕߟߋ߬ dd","MMMM, yyyy","/"],
     "nso-ZA" : ["dd/MM/yy","dd MMMM yyyy","dd MMMM yyyy hh:mm:ss tt","MMMM d","MMMM yyyy","/"],
     "oc-FR" : ["dd/MM/yyyy","wwww d MMMM' de 'yyyy","wwww d MMMM' de 'yyyy HH.mm.ss","d MMMM","MMMM' de 'yyyy","/"],
     "om-ET" : ["dd/MM/yy","wwww, MMMM d, yyyy","wwww, MMMM d, yyyy h:mm:ss tt","dd MMMM","MMMM yyyy","/"],
     "or-IN" : ["dd-MM-yy","dd MMMM yyyy","dd MMMM yyyy HH:mm:ss","dd MMMM","MMMM, yyyy","-"],
     "pa-Arab-PK" : ["dd-MM-yy","dd MMMM yyyy wwww","dd MMMM yyyy wwww h.mm.ss tt","dd MMMM","MMMM, yyyy","-"],
     "pa-IN" : ["dd-MM-yy","dd MMMM yyyy wwww","dd MMMM yyyy wwww tt hh:mm:ss","dd MMMM","MMMM, yyyy","-"],
     "pl-PL" : ["yyyy-MM-dd","d MMMM yyyy","d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","-"],
     "prs-AF" : ["yyyy/M/d","yyyy, dd, MMMM, wwww","yyyy, dd, MMMM, wwww h:mm:ss tt","d MMMM","MMMM yyyy","/"],
     "ps-AF" : ["yyyy/M/d","yyyy, dd, MMMM, wwww","yyyy, dd, MMMM, wwww h:mm:ss tt","d MMMM","MMMM yyyy","/"],
     "pt-AO" : ["dd/MM/yy","wwww, d 'de' MMMM 'de' yyyy","wwww, d 'de' MMMM 'de' yyyy HH:mm:ss","dd/MMMM","MMMM 'de' yyyy","/"],
     "pt-BR" : ["dd/MM/yyyy","wwww, d' de 'MMMM' de 'yyyy","wwww, d' de 'MMMM' de 'yyyy HH:mm:ss","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "pt-PT" : ["dd/MM/yyyy","d' de 'MMMM' de 'yyyy","d' de 'MMMM' de 'yyyy HH:mm:ss","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "qut-GT" : ["dd/MM/yyyy","wwww, dd' rech 'MMMM' rech 'yyyy","wwww, dd' rech 'MMMM' rech 'yyyy h:mm:ss tt","d' rech 'MMMM","MMMM' rech 'yyyy","/"],
     "quz-BO" : ["dd/MM/yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy hh:mm:ss tt","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "quz-EC" : ["dd/MM/yyyy","wwww, dd' de 'MMMM' de 'yyyy","wwww, dd' de 'MMMM' de 'yyyy H:mm:ss","d' de 'MMMM","MMMM' de 'yyyy","/"],
     "quz-PE" : ["dd/MM/yyyy","wwww, d MMMM, yyyy","wwww, d MMMM, yyyy hh:mm:ss tt","d MMMM","MMMM' de 'yyyy","/"],
     "rm-CH" : ["dd-MM-yyyy","wwww, 'ils’' d. MMMM, yyyy","wwww, 'ils’' d. MMMM, yyyy HH:mm:ss","d MMMM","MMMM yyyy","-"],
     "ro-MD" : ["dd.MM.yyyy","wwww, d MMMM yyyy","wwww, d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","."],
     "ro-RO" : ["dd.MM.yyyy","d MMMM yyyy","d MMMM yyyy H:mm:ss","d MMMM","MMMM yyyy","."],
     "ru-RU" : ["dd.MM.yyyy","d MMMM yyyy 'г.'","d MMMM yyyy 'г.' H:mm:ss","d MMMM","MMMM yyyy","."],
     "rw-RW" : ["d/MM/yyyy","d ' ' MMMM ' ' yyyy","d ' ' MMMM ' ' yyyy H:mm:ss","MMMM dd","MMMM yyyy","/"],
     "sa-IN" : ["dd-MM-yyyy","dd MMMM yyyy wwww","dd MMMM yyyy wwww HH:mm:ss","dd MMMM","MMMM, yyyy","-"],
     "sah-RU" : ["dd.MM.yyyy","wwww, yyyy 'с.' MMMM d 'күнэ'","wwww, yyyy 'с.' MMMM d 'күнэ' H:mm:ss","MMMM d 'күнэ'","yyyy 'с.' MMMM","."],
     "sd-Arab-PK" : ["dd/MM/yyyy","wwww, dd MMMM, yyyy","wwww, dd MMMM, yyyy h:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "se-FI" : ["d.M.yyyy","wwww', 'MMMM d'. b. 'yyyy","wwww', 'MMMM d'. b. 'yyyy H:mm:ss","MMMM d'. b.'","MMMM yyyy","."],
     "se-NO" : ["dd.MM.yyyy","wwww, MMMM d'. b. 'yyyy","wwww, MMMM d'. b. 'yyyy HH:mm:ss","MMMM d'. b.'","MMMM yyyy","."],
     "se-SE" : ["yyyy-MM-dd","wwww, MMMM d'. b. 'yyyy","wwww, MMMM d'. b. 'yyyy HH:mm:ss","MMMM d'. b.'","MMMM yyyy","-"],
     "si-LK" : ["yyyy-MM-dd","yyyy MMMM' මස 'dd' වැනිදා 'wwww","yyyy MMMM' මස 'dd' වැනිදා 'wwww tt h:mm:ss","MMMM dd","yyyy MMMM","-"],
     "sk-SK" : ["d.M.yyyy","d. MMMM yyyy","d. MMMM yyyy H:mm:ss","d. MMMM","MMMM yyyy","."],
     "sl-SI" : ["d.M.yyyy","d. MMMM yyyy","d. MMMM yyyy H:mm:ss","d. MMMM","MMMM yyyy","."],
     "sma-NO" : ["dd.MM.yyyy","wwww, MMMM d'. b. 'yyyy","wwww, MMMM d'. b. 'yyyy HH:mm:ss","MMMM d'. b.'","MMMM yyyy","."],
     "sma-SE" : ["yyyy-MM-dd","wwww, MMMM d'. b. 'yyyy","wwww, MMMM d'. b. 'yyyy HH:mm:ss","MMMM d'. b.'","MMMM yyyy","-"],
     "smj-NO" : ["dd.MM.yyyy","wwww, MMMM d'. b. 'yyyy","wwww, MMMM d'. b. 'yyyy HH:mm:ss","MMMM d'. b.'","MMMM yyyy","."],
     "smj-SE" : ["yyyy-MM-dd","wwww, MMMM d'. b. 'yyyy","wwww, MMMM d'. b. 'yyyy HH:mm:ss","MMMM d'. b.'","MMMM yyyy","-"],
     "smn-FI" : ["d.M.yyyy","MMMM d'. p. 'yyyy","MMMM d'. p. 'yyyy H:mm:ss","MMMM d'. p. '","MMMM yyyy","."],
     "sms-FI" : ["d.M.yyyy","MMMM d'. p. 'yyyy","MMMM d'. p. 'yyyy H:mm:ss","MMMM d'. p. '","MMMM yyyy","."],
     "sn-Latn-ZW" : ["dd/MM/yyyy","wwww, d MMMM yyyy","wwww, d MMMM yyyy h:mm:ss tt","MMMM d","MMMM yyyy","/"],
     "so-SO" : ["dd/MM/yy","wwww, MMMM dd, yyyy","wwww, MMMM dd, yyyy h:mm:ss tt","MMMM d","MMMM yyyy","/"],
     "sq-AL" : ["d.M.yyyy","wwww, d MMMM yyyy","wwww, d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","."],
     "sr-Cyrl-BA" : ["d.M.yyyy.","d. MMMM yyyy","d. MMMM yyyy H:mm:ss","d. MMMM","MMMM, yyyy","."],
     "sr-Cyrl-CS" : ["d.M.yyyy.","d. MMMM yyyy.","d. MMMM yyyy. H:mm:ss","d. MMMM","MMMM yyyy.","."],
     "sr-Cyrl-ME" : ["d.M.yyyy.","d. MMMM yyyy.","d. MMMM yyyy. H:mm:ss","d. MMMM","MMMM yyyy.","."],
     "sr-Cyrl-RS" : ["d.M.yyyy.","d. MMMM yyyy.","d. MMMM yyyy. H:mm:ss","d. MMMM","MMMM yyyy.","."],
     "sr-Latn-BA" : ["d.M.yyyy.","d. MMMM yyyy.","d. MMMM yyyy. H:mm:ss","d. MMMM","MMMM yyyy.","."],
     "sr-Latn-CS" : ["d.M.yyyy.","d. MMMM yyyy.","d. MMMM yyyy. H:mm:ss","d. MMMM","MMMM yyyy.","."],
     "sr-Latn-ME" : ["d.M.yyyy.","d. MMMM yyyy.","d. MMMM yyyy. H:mm:ss","d. MMMM","MMMM yyyy.","."],
     "sr-Latn-RS" : ["d.M.yyyy.","d. MMMM yyyy.","d. MMMM yyyy. H:mm:ss","d. MMMM","MMMM yyyy.","."],
     "st-ZA" : ["yyyy-MM-dd","yyyy MMMM d, wwww","yyyy MMMM d, wwww HH:mm:ss","MMMM d","yyyy MMMM","-"],
     "sv-FI" : ["d.M.yyyy","'den 'd MMMM yyyy","'den 'd MMMM yyyy HH:mm:ss","'den 'd MMMM","MMMM yyyy","."],
     "sv-SE" : ["yyyy-MM-dd","'den 'd MMMM yyyy","'den 'd MMMM yyyy HH:mm:ss","'den 'd MMMM","MMMM yyyy","-"],
     "sw-KE" : ["M/d/yyyy","wwww, MMMM dd, yyyy","wwww, MMMM dd, yyyy h:mm:ss tt","MMMM dd","MMMM, yyyy","/"],
     "syr-SY" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy hh:mm:ss tt","MMMM dd","MMMM, yyyy","/"],
     "ta-IN" : ["dd-MM-yyyy","dd MMMM yyyy","dd MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","-"],
     "ta-LK" : ["dd-MM-yyyy","dd MMMM yyyy","dd MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","-"],
     "te-IN" : ["dd-MM-yy","dd MMMM yyyy","dd MMMM yyyy HH:mm:ss","MMMM d","MMMM, yyyy","-"],
     "tg-Cyrl-TJ" : ["dd.MM.yyyy","d MMMM yyyy' с.'","d MMMM yyyy' с.' HH:mm:ss","dd MMMM","MMMM yyyy","."],
     "th-TH" : ["d/M/yyyy","d MMMM yyyy","d MMMM yyyy H:mm:ss","d MMMM","MMMM yyyy","/"],
     "ti-ER" : ["d/M/yyyy","wwww '፣' MMMM d 'መዓልቲ' yyyy","wwww '፣' MMMM d 'መዓልቲ' yyyy h:mm:ss tt","MMMM d","MMMM yyyy","/"],
     "ti-ET" : ["d/M/yyyy","wwww '፣' MMMM d 'መዓልቲ' yyyy","wwww '፣' MMMM d 'መዓልቲ' yyyy h:mm:ss tt","MMMM d","MMMM yyyy","/"],
     "tk-TM" : ["dd.MM.yy 'ý.'","yyyy'-nji ýylyň 'd'-nji 'MMMM","yyyy'-nji ýylyň 'd'-nji 'MMMM HH:mm:ss","d MMMM","yyyy 'ý.' MMMM","."],
     "tn-BW" : ["dd/MM/yy","dd MMMM yyyy","dd MMMM yyyy hh:mm:ss tt","d MMMM","MMMM yyyy","/"],
     "tn-ZA" : ["dd/MM/yy","dd MMMM yyyy","dd MMMM yyyy hh:mm:ss tt","d MMMM","MMMM yyyy","/"],
     "tr-TR" : ["d.M.yyyy","d MMMM yyyy wwww","d MMMM yyyy wwww HH:mm:ss","d MMMM","MMMM yyyy","."],
     "ts-ZA" : ["yyyy-MM-dd","yyyy MMMM d, wwww","yyyy MMMM d, wwww HH:mm:ss","MMMM d","yyyy MMMM","-"],
     "tt-RU" : ["dd.MM.yyyy","dd MMMM yyyy' ел'","dd MMMM yyyy' ел' HH:mm:ss","d MMMM","MMMM yyyy","."],
     "tzm-Latn-DZ" : ["dd-MM-yyyy","dd MMMM, yyyy","dd MMMM, yyyy H:mm:ss","d MMMM","MMMM, yyyy","-"],
     "tzm-Tfng-MA" : ["dd-MM-yyyy","wwww, dd MMMM, yyyy","wwww, dd MMMM, yyyy H:mm:ss","dd MMMM","MMMM, yyyy","-"],
     "ug-CN" : ["yyyy-M-d","yyyy-'يىل' d-MMMM","yyyy-'يىل' d-MMMM H:mm:ss","d-MMMM","yyyy-'يىلى' MMMM","-"],
     "uk-UA" : ["dd.MM.yyyy","d MMMM yyyy' р.'","d MMMM yyyy' р.' H:mm:ss","d MMMM","MMMM yyyy' р.'","."],
     "ur-IN" : ["d/M/yy","wwww, d MMMM, yyyy","wwww, d MMMM, yyyy h:mm:ss tt","d MMMM","MMMM yyyy","/"],
     "ur-PK" : ["dd/MM/yyyy","dd MMMM, yyyy","dd MMMM, yyyy h:mm:ss tt","dd MMMM","MMMM, yyyy","/"],
     "uz-Cyrl-UZ" : ["dd.MM.yyyy","yyyy 'йил' d-MMMM","yyyy 'йил' d-MMMM HH:mm:ss","d MMMM","MMMM yyyy","."],
     "uz-Latn-UZ" : ["dd.MM.yyyy","yyyy 'yil' d-MMMM","yyyy 'yil' d-MMMM HH:mm:ss","d-MMMM","MMMM yyyy","."],
     "vi-VN" : ["dd/MM/yyyy","dd MMMM yyyy","dd MMMM yyyy h:mm:ss tt","dd MMMM","MMMM yyyy","/"],
     "wo-SN" : ["dd/MM/yyyy","wwww d MMMM yyyy","wwww d MMMM yyyy HH:mm:ss","d MMMM","MMMM yyyy","/"],
     "xh-ZA" : ["yyyy/MM/dd","dd MMMM yyyy","dd MMMM yyyy hh:mm:ss tt","d MMMM","MMMM yyyy","/"],
     "yo-NG" : ["d/M/yyyy","wwww, dd MMMM, yyyy","wwww, dd MMMM, yyyy h:mm:ss tt","dd MMMM","MMMM,yyyy","/"],
     "zgh-Tfng-MA" : ["dd-MM-yyyy","wwww, dd MMMM, yyyy","wwww, dd MMMM, yyyy HH.mm.ss","dd MMMM","MMMM, yyyy","-"],
     "zh-CN" : ["yyyy/M/d","yyyy'年'M'月'd'日'","yyyy'年'M'月'd'日' H:mm:ss","M'月'd'日'","yyyy'年'M'月'","/"],
     "zh-HK" : ["d/M/yyyy","yyyy'年'M'月'd'日'","yyyy'年'M'月'd'日' H:mm:ss","M'月'd'日'","yyyy'年'M'月'","/"],
     "zh-MO" : ["d/M/yyyy","yyyy'年'M'月'd'日'","yyyy'年'M'月'd'日' H:mm:ss","M'月'd'日'","yyyy'年'M'月'","/"],
     "zh-SG" : ["d/M/yyyy","yyyy'年'M'月'd'日'","yyyy'年'M'月'd'日' tt h:mm:ss","M'月'd'日'","yyyy'年'M'月'","/"],
     "zh-TW" : ["yyyy/M/d","yyyy'年'M'月'd'日'","yyyy'年'M'月'd'日' tt hh:mm:ss","M'月'd'日'","yyyy'年'M'月'","/"],
     "zu-ZA" : ["dd-MM-yyyy","dd MMMM yyyy","dd MMMM yyyy hh:mm:ss tt","d MMMM","MMMM yyyy","-"]
}

var localeTimePatterns={
     "af-ZA" : ["hh:mm tt", "hh:mm:ss tt",":","VM.","NM."],
     "am-ET" : ["h:mm tt", "h:mm:ss tt",":","ጧት","ከሰዓት በኋላ"],
     "ar-AE" : ["hh:mm tt", "hh:mm:ss tt",":","ص","م"],
     "ar-BH" : ["hh:mm tt", "hh:mm:ss tt",":","ص","م"],
     "ar-DZ" : ["H:mm", "H:mm:ss",":","ص","م"],
     "ar-EG" : ["hh:mm tt", "hh:mm:ss tt",":","ص","م"],
     "ar-IQ" : ["hh:mm tt", "hh:mm:ss tt",":","ص","م"],
     "ar-JO" : ["hh:mm tt", "hh:mm:ss tt",":","ص","م"],
     "ar-KW" : ["hh:mm tt", "hh:mm:ss tt",":","ص","م"],
     "ar-LB" : ["hh:mm tt", "hh:mm:ss tt",":","ص","م"],
     "ar-LY" : ["hh:mm tt", "hh:mm:ss tt",":","ص","م"],
     "ar-MA" : ["H:mm", "H:mm:ss",":","ص","م"],
     "ar-OM" : ["hh:mm tt", "hh:mm:ss tt",":","ص","م"],
     "ar-QA" : ["hh:mm tt", "hh:mm:ss tt",":","ص","م"],
     "ar-SA" : ["hh:mm tt", "hh:mm:ss tt",":","ص","م"],
     "ar-SY" : ["hh:mm tt", "hh:mm:ss tt",":","ص","م"],
     "ar-TN" : ["H:mm", "H:mm:ss",":","ص","م"],
     "ar-YE" : ["hh:mm tt", "hh:mm:ss tt",":","ص","م"],
     "arn-CL" : ["H:mm", "H:mm:ss",":","",""],
     "as-IN" : ["tt h:mm", "tt h:mm:ss",":","ৰাতিপু","আবেলি"],
     "az-Cyrl-AZ" : ["H:mm", "HH:mm:ss",":","",""],
     "az-Latn-AZ" : ["HH:mm", "HH:mm:ss",":","",""],
     "ba-RU" : ["H:mm", "H:mm:ss",":","",""],
     "be-BY" : ["HH:mm", "HH:mm:ss",":","",""],
     "bg-BG" : ["H:mm", "H:mm:ss",":","",""],
     "bn-BD" : ["HH.mm", "HH.mm.ss",".","পুর্বাহ্ন","অপরাহ্ন"],
     "bn-IN" : ["HH.mm", "HH.mm.ss",".","AM","PM"],
     "bo-CN" : ["HH:mm", "HH:mm:ss",":","སྔ་དྲོ","ཕྱི་དྲོ"],
     "br-FR" : ["HH:mm", "HH:mm:ss",":","",""],
     "bs-Cyrl-BA" : ["H:mm", "H:mm:ss",":","",""],
     "bs-Latn-BA" : ["H:mm", "H:mm:ss",":","",""],
     "ca-ES" : ["H:mm", "H:mm:ss",":","",""],
     "ca-ES-valencia" : ["HH:mm", "HH:mm:ss",":","",""],
     "chr-Cher-US" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "co-FR" : ["HH:mm", "H:mm:ss",":","",""],
     "cs-CZ" : ["H:mm", "H:mm:ss",":","dop.","odp."],
     "cy-GB" : ["HH:mm", "HH:mm:ss",":","am","pm"],
     "da-DK" : ["HH:mm", "HH:mm:ss",":","",""],
     "de-AT" : ["HH:mm", "HH:mm:ss",":","",""],
     "de-CH" : ["HH:mm", "HH:mm:ss",":","",""],
     "de-DE" : ["HH:mm", "HH:mm:ss",":","",""],
     "de-LI" : ["HH:mm", "HH:mm:ss",":","",""],
     "de-LU" : ["HH:mm", "HH:mm:ss",":","",""],
     "dsb-DE" : ["HH:mm", "HH:mm:ss",":","",""],
     "dv-MV" : ["HH:mm", "HH:mm:ss",":","މކ","މފ"],
     "el-GR" : ["h:mm tt", "h:mm:ss tt",":","πμ","μμ"],
     "en-029" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "en-AU" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "en-BZ" : ["hh:mm tt", "hh:mm:ss tt",":","AM","PM"],
     "en-CA" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "en-GB" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "en-HK" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "en-IE" : ["HH:mm", "HH:mm:ss",":","am","pm"],
     "en-IN" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "en-JM" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "en-MY" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "en-NZ" : ["h:mm tt", "h:mm:ss tt",":","a.m.","p.m."],
     "en-PH" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "en-SG" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "en-TT" : ["hh:mm tt", "hh:mm:ss tt",":","AM","PM"],
     "en-US" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "en-ZA" : ["hh:mm tt", "hh:mm:ss tt",":","AM","PM"],
     "en-ZW" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "es-419" : ["HH:mm", "HH:mm:ss",":","a.m.","p.m."],
     "es-AR" : ["hh:mm tt", "hh:mm:ss tt",":","a.m.","p.m."],
     "es-BO" : ["hh:mm tt", "hh:mm:ss tt",":","a.m.","p.m."],
     "es-CL" : ["H:mm", "H:mm:ss",":","am","pm"],
     "es-CO" : ["h:mm tt", "h:mm:ss tt",":","a. m.","p. m."],
     "es-CR" : ["hh:mm tt", "hh:mm:ss tt",":","a.m.","p.m."],
     "es-DO" : ["h:mm tt", "h:mm:ss tt",":","a. m.","p. m."],
     "es-EC" : ["H:mm", "H:mm:ss",":","",""],
     "es-ES" : ["H:mm", "H:mm:ss",":","",""],
     "es-GT" : ["h:mm tt", "h:mm:ss tt",":","a. m.","p. m."],
     "es-HN" : ["hh:mm tt", "hh:mm:ss tt",":","a.m.","p.m."],
     "es-MX" : ["hh:mm tt", "hh:mm:ss tt",":","a. m.","p. m."],
     "es-NI" : ["hh:mm tt", "hh:mm:ss tt",":","a.m.","p.m."],
     "es-PA" : ["h:mm tt", "h:mm:ss tt",":","a. m.","p. m."],
     "es-PE" : ["hh:mm tt", "hh:mm:ss tt",":","a.m.","p.m."],
     "es-PR" : ["hh:mm tt", "hh:mm:ss tt",":","a.m.","p.m."],
     "es-PY" : ["hh:mm tt", "hh:mm:ss tt",":","a.m.","p.m."],
     "es-SV" : ["hh:mm tt", "hh:mm:ss tt",":","a.m.","p.m."],
     "es-US" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "es-UY" : ["H:mm", "H:mm:ss",":","a. m.","p. m."],
     "es-VE" : ["hh:mm tt", "hh:mm:ss tt",":","a.m.","p.m."],
     "et-EE" : ["H:mm", "H:mm:ss",":","EL","PL"],
     "eu-ES" : ["H:mm", "H:mm:ss",":","",""],
     "fa-IR" : ["hh:mm tt", "hh:mm:ss tt",":","ق.ظ","ب.ظ"],
     "ff-Latn-SN" : ["HH:mm", "HH:mm:ss",":","",""],
     "fi-FI" : ["H:mm", "H:mm:ss",":","",""],
     "fil-PH" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "fo-FO" : ["HH:mm", "HH:mm:ss",":","",""],
     "fr-BE" : ["HH:mm", "HH:mm:ss",":","",""],
     "fr-CA" : ["HH:mm", "HH:mm:ss",":","",""],
     "fr-CD" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "fr-CH" : ["HH:mm", "HH:mm:ss",":","",""],
     "fr-CI" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "fr-CM" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "fr-FR" : ["HH:mm", "HH:mm:ss",":","",""],
     "fr-HT" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "fr-LU" : ["HH:mm", "HH:mm:ss",":","",""],
     "fr-MA" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "fr-MC" : ["HH:mm", "HH:mm:ss",":","",""],
     "fr-ML" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "fr-RE" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "fr-SN" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "fy-NL" : ["H:mm", "H:mm:ss",":","",""],
     "ga-IE" : ["HH:mm", "HH:mm:ss",":","r.n.","i.n."],
     "gd-GB" : ["HH:mm", "HH:mm:ss",":","m","f"],
     "gl-ES" : ["H:mm", "H:mm:ss",":","a.m.","p.m."],
     "gn-PY" : ["HH:mm", "HH:mm:ss",":","a.m.","p.m."],
     "gsw-FR" : ["HH:mm", "HH:mm:ss",":","",""],
     "gu-IN" : ["HH:mm", "HH:mm:ss",":","પૂર્વ મધ્યાહ્ન","ઉત્તર મધ્યાહ્ન"],
     "ha-Latn-NG" : ["h:mm tt", "h:mm:ss tt",":","Safe","Yamma"],
     "haw-US" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "he-IL" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "hi-IN" : ["HH:mm", "HH:mm:ss",":","पूर्वाह्न","अपराह्न"],
     "hr-BA" : ["H:mm", "H:mm:ss",":","",""],
     "hr-HR" : ["H:mm", "H:mm:ss",":","",""],
     "hsb-DE" : ["H.mm", "H.mm.ss",".","",""],
     "hu-HU" : ["H:mm", "H:mm:ss",":","de.","du."],
     "hy-AM" : ["HH:mm", "HH:mm:ss",":","",""],
     "id-ID" : ["H:mm", "H:mm:ss",":","",""],
     "ig-NG" : ["h.mm tt", "h.mm.ss tt",".","Ụtụtụ","Ehihie"],
     "ii-CN" : ["tt h:mm", "tt h:mm:ss",":","ꂵꆪꈌꈐ","ꂵꆪꈌꉈ"],
     "is-IS" : ["HH:mm", "HH:mm:ss",":","",""],
     "it-CH" : ["HH:mm", "HH:mm:ss",":","",""],
     "it-IT" : ["HH:mm", "HH:mm:ss",":","",""],
     "iu-Cans-CA" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "iu-Latn-CA" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "ja-JP" : ["H:mm", "H:mm:ss",":","午前","午後"],
     "jv-Latn-ID" : ["HH.mm", "HH.mm.ss",".","",""],
     "ka-GE" : ["H:mm", "H:mm:ss",":","",""],
     "kk-KZ" : ["HH:mm", "HH:mm:ss",":","",""],
     "kl-GL" : ["HH:mm", "HH:mm:ss",":","",""],
     "km-KH" : ["H:mm", "HH:mm:ss",":","ព្រឹក","ល្ងាច"],
     "kn-IN" : ["HH:mm", "HH:mm:ss",":","ಪೂರ್ವಾಹ್ನ","ಅಪರಾಹ್ನ"],
     "ko-KR" : ["tt h:mm", "tt h:mm:ss",":","오전","오후"],
     "kok-IN" : ["HH:mm", "HH:mm:ss",":","म.पू.","म.नं."],
     "ku-Arab-IQ" : ["hh:mm tt", "hh:mm:ss tt",":","پ.ن","د.ن"],
     "ky-KG" : ["HH:mm", "HH:mm:ss",":","",""],
     "lb-LU" : ["HH:mm", "HH:mm:ss",":","",""],
     "lo-LA" : ["HH:mm", "HH:mm:ss",":","ເຊົ້າ","ແລງ"],
     "lt-LT" : ["HH:mm", "HH:mm:ss",":","",""],
     "lv-LV" : ["H:mm", "H:mm:ss",":","",""],
     "mg-MG" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "mi-NZ" : ["h:mm tt", "h:mm:ss tt",":","a.m.","p.m."],
     "mk-MK" : ["HH:mm", "HH:mm:ss",":","",""],
     "ml-IN" : ["HH.mm", "HH.mm.ss",".","AM","PM"],
     "mn-MN" : ["HH:mm", "HH:mm:ss",":","",""],
     "mn-Mong-CN" : ["H:mm", "H:mm:ss",":","",""],
     "mn-Mong-MN" : ["H:mm", "H:mm:ss",":","",""],
     "moh-CA" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "mr-IN" : ["HH:mm", "HH:mm:ss",":","म.पू.","म.नं."],
     "ms-BN" : ["H:mm", "H:mm:ss",":","",""],
     "ms-MY" : ["H:mm", "H:mm:ss",":","AM","PM"],
     "mt-MT" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "my-MM" : ["HH:mm", "HH:mm:ss",":","နံနက်","ညနေ"],
     "nb-NO" : ["HH:mm", "HH:mm:ss",":","",""],
     "ne-IN" : ["HH:mm", "HH:mm:ss",":","पूर्वाह्न","अपराह्न"],
     "ne-NP" : ["h:mm tt", "h:mm:ss tt",":","पूर्वाह्न","अपराह्न"],
     "nl-BE" : ["H:mm", "H:mm:ss",":","",""],
     "nl-NL" : ["HH:mm", "HH:mm:ss",":","",""],
     "nn-NO" : ["HH:mm", "HH:mm:ss",":","",""],
     "nqo-GN" : ["tt hh:mm", "tt hh:mm:ss",":","ߛ","ߥ"],
     "nso-ZA" : ["hh:mm tt", "hh:mm:ss tt",":","MS","TP"],
     "oc-FR" : ["HH' h 'mm", "HH.mm.ss",".","AM","PM"],
     "om-ET" : ["h:mm tt", "h:mm:ss tt",":","WD","WB"],
     "or-IN" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "pa-Arab-PK" : ["h.mm tt", "h.mm.ss tt",".","AM","PM"],
     "pa-IN" : ["tt hh:mm", "tt hh:mm:ss",":","ਸਵੇਰ","ਸ਼ਾਮ"],
     "pl-PL" : ["HH:mm", "HH:mm:ss",":","",""],
     "prs-AF" : ["h:mm tt", "h:mm:ss tt",":","غ.م","غ.و"],
     "ps-AF" : ["h:mm tt", "h:mm:ss tt",":","غ.م","غ.و"],
     "pt-AO" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "pt-BR" : ["HH:mm", "HH:mm:ss",":","",""],
     "pt-PT" : ["HH:mm", "HH:mm:ss",":","",""],
     "qut-GT" : ["h:mm tt", "h:mm:ss tt",":","a.m.","p.m."],
     "quz-BO" : ["hh:mm tt", "hh:mm:ss tt",":","a.m.","p.m."],
     "quz-EC" : ["H:mm", "H:mm:ss",":","",""],
     "quz-PE" : ["hh:mm tt", "hh:mm:ss tt",":","a.m.","p.m."],
     "rm-CH" : ["HH:mm", "HH:mm:ss",":","",""],
     "ro-MD" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "ro-RO" : ["H:mm", "H:mm:ss",":","a.m.","p.m."],
     "ru-RU" : ["H:mm", "H:mm:ss",":","",""],
     "rw-RW" : ["H:mm", "H:mm:ss",":","z.m","z.n"],
     "sa-IN" : ["HH:mm", "HH:mm:ss",":","मध्यानपूर्व","मध्यानपच्यात"],
     "sah-RU" : ["H:mm", "H:mm:ss",":","КИ","КК"],
     "sd-Arab-PK" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "se-FI" : ["H:mm", "H:mm:ss",":","",""],
     "se-NO" : ["HH:mm", "HH:mm:ss",":","",""],
     "se-SE" : ["HH:mm", "HH:mm:ss",":","",""],
     "si-LK" : ["tt h:mm", "tt h:mm:ss",":","පෙ.ව.","ප.ව."],
     "sk-SK" : ["H:mm", "H:mm:ss",":","dop.","odp."],
     "sl-SI" : ["H:mm", "H:mm:ss",":","",""],
     "sma-NO" : ["HH:mm", "HH:mm:ss",":","",""],
     "sma-SE" : ["HH:mm", "HH:mm:ss",":","",""],
     "smj-NO" : ["HH:mm", "HH:mm:ss",":","",""],
     "smj-SE" : ["HH:mm", "HH:mm:ss",":","",""],
     "smn-FI" : ["H:mm", "H:mm:ss",":","",""],
     "sms-FI" : ["H:mm", "H:mm:ss",":","",""],
     "sn-Latn-ZW" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "so-SO" : ["h:mm tt", "h:mm:ss tt",":","sn.","gn."],
     "sq-AL" : ["HH:mm", "HH:mm:ss",":","PD","MD"],
     "sr-Cyrl-BA" : ["H:mm", "H:mm:ss",":","",""],
     "sr-Cyrl-CS" : ["H:mm", "H:mm:ss",":","",""],
     "sr-Cyrl-ME" : ["H:mm", "H:mm:ss",":","",""],
     "sr-Cyrl-RS" : ["H:mm", "H:mm:ss",":","",""],
     "sr-Latn-BA" : ["H:mm", "H:mm:ss",":","",""],
     "sr-Latn-CS" : ["H:mm", "H:mm:ss",":","",""],
     "sr-Latn-ME" : ["H:mm", "H:mm:ss",":","",""],
     "sr-Latn-RS" : ["H:mm", "H:mm:ss",":","",""],
     "st-ZA" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "sv-FI" : ["HH:mm", "HH:mm:ss",":","",""],
     "sv-SE" : ["HH:mm", "HH:mm:ss",":","",""],
     "sw-KE" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "syr-SY" : ["hh:mm tt", "hh:mm:ss tt",":","ܩ.ܛ","ܒ.ܛ"],
     "ta-IN" : ["HH:mm", "HH:mm:ss",":","காலை","மாலை"],
     "ta-LK" : ["HH:mm", "HH:mm:ss",":","காலை","மாலை"],
     "te-IN" : ["HH:mm", "HH:mm:ss",":","పూర్వాహ్న","అపరాహ్న"],
     "tg-Cyrl-TJ" : ["HH:mm", "HH:mm:ss",":","",""],
     "th-TH" : ["H:mm", "H:mm:ss",":","AM","PM"],
     "ti-ER" : ["h:mm tt", "h:mm:ss tt",":","ንጉሆ","ድሕሪ ቐትሪ"],
     "ti-ET" : ["h:mm tt", "h:mm:ss tt",":","ንጉሆ","ድሕሪ ቐትሪ"],
     "tk-TM" : ["HH:mm", "HH:mm:ss",":","",""],
     "tn-BW" : ["hh:mm tt", "hh:mm:ss tt",":","Moso","Maitseboa"],
     "tn-ZA" : ["hh:mm tt", "hh:mm:ss tt",":","Mo Mosong","Mo Maitseboeng"],
     "tr-TR" : ["HH:mm", "HH:mm:ss",":","",""],
     "ts-ZA" : ["HH:mm", "HH:mm:ss",":","AM","PM"],
     "tt-RU" : ["HH:mm", "HH:mm:ss",":","",""],
     "tzm-Latn-DZ" : ["H:mm", "H:mm:ss",":","",""],
     "tzm-Tfng-MA" : ["H:mm", "H:mm:ss",":","",""],
     "ug-CN" : ["H:mm", "H:mm:ss",":","چۈشتىن بۇرۇن","چۈشتىن كېيىن"],
     "uk-UA" : ["H:mm", "H:mm:ss",":","",""],
     "ur-IN" : ["h:mm tt", "h:mm:ss tt",":","دن","رات"],
     "ur-PK" : ["h:mm tt", "h:mm:ss tt",":","AM","PM"],
     "uz-Cyrl-UZ" : ["HH:mm", "HH:mm:ss",":","",""],
     "uz-Latn-UZ" : ["HH:mm", "HH:mm:ss",":","",""],
     "vi-VN" : ["h:mm tt", "h:mm:ss tt",":","SA","CH"],
     "wo-SN" : ["HH:mm", "HH:mm:ss",":","",""],
     "xh-ZA" : ["hh:mm tt", "hh:mm:ss tt",":","Ekuseni","Emva Kwemini"],
     "yo-NG" : ["h:mm tt", "h:mm:ss tt",":","Òwúrọ́","Alẹ̀"],
     "zgh-Tfng-MA" : ["HH.mm", "HH.mm.ss",".","",""],
     "zh-CN" : ["H:mm", "H:mm:ss",":","上午","下午"],
     "zh-HK" : ["H:mm", "H:mm:ss",":","上午","下午"],
     "zh-MO" : ["H:mm", "H:mm:ss",":","上午","下午"],
     "zh-SG" : ["tt h:mm", "tt h:mm:ss",":","上午","下午"],
     "zh-TW" : ["tt hh:mm", "tt hh:mm:ss",":","上午","下午"],
     "zu-ZA" : ["hh:mm tt", "hh:mm:ss tt",":","Ntambama","Ekuseni"]
}

var localeLanguages={
     "af-ZA" : ["Afrikaans (South Africa)","Afrikaans (South Africa)","Afrikaans (Suid-Afrika)"],
     "am-ET" : ["Amharic (Ethiopia)","Amharic (Ethiopia)","አማርኛ (ኢትዮጵያ)"],
     "ar-AE" : ["Arabic (U.A.E.)","Arabic (U.A.E.)","العربية (الإمارات العربية المتحدة)"],
     "ar-BH" : ["Arabic (Bahrain)","Arabic (Bahrain)","العربية (البحرين)"],
     "ar-DZ" : ["Arabic (Algeria)","Arabic (Algeria)","العربية (الجزائر)"],
     "ar-EG" : ["Arabic (Egypt)","Arabic (Egypt)","العربية (مصر)"],
     "ar-IQ" : ["Arabic (Iraq)","Arabic (Iraq)","العربية (العراق)"],
     "ar-JO" : ["Arabic (Jordan)","Arabic (Jordan)","العربية (الأردن)"],
     "ar-KW" : ["Arabic (Kuwait)","Arabic (Kuwait)","العربية (الكويت)"],
     "ar-LB" : ["Arabic (Lebanon)","Arabic (Lebanon)","العربية (لبنان)"],
     "ar-LY" : ["Arabic (Libya)","Arabic (Libya)","العربية (ليبيا)"],
     "ar-MA" : ["Arabic (Morocco)","Arabic (Morocco)","العربية (المملكة المغربية)"],
     "ar-OM" : ["Arabic (Oman)","Arabic (Oman)","العربية (عمان)"],
     "ar-QA" : ["Arabic (Qatar)","Arabic (Qatar)","العربية (قطر)"],
     "ar-SA" : ["Arabic (Saudi Arabia)","Arabic (Saudi Arabia)","العربية (المملكة العربية السعودية)"],
     "ar-SY" : ["Arabic (Syria)","Arabic (Syria)","العربية (سوريا)"],
     "ar-TN" : ["Arabic (Tunisia)","Arabic (Tunisia)","العربية (تونس)"],
     "ar-YE" : ["Arabic (Yemen)","Arabic (Yemen)","العربية (اليمن)"],
     "arn-CL" : ["Mapudungun (Chile)","Mapudungun (Chile)","Mapudungun (Chile)"],
     "as-IN" : ["Assamese (India)","Assamese (India)","অসমীয়া (ভাৰত)"],
     "az-Cyrl-AZ" : ["Azerbaijani (Cyrillic, Azerbaijan)","Azeri (Cyrillic, Azerbaijan)","Азәрбајҹан (Азәрбајҹан)"],
     "az-Latn-AZ" : ["Azerbaijani (Latin, Azerbaijan)","Azeri (Latin, Azerbaijan)","Azərbaycan dili (Azərbaycan)"],
     "ba-RU" : ["Bashkir (Russia)","Bashkir (Russia)","Башҡорт (Рәсәй)"],
     "be-BY" : ["Belarusian (Belarus)","Belarusian (Belarus)","Беларуская (Беларусь)"],
     "bg-BG" : ["Bulgarian (Bulgaria)","Bulgarian (Bulgaria)","български (България)"],
     "bn-BD" : ["Bangla (Bangladesh)","Bengali (Bangladesh)","বাংলা (বাংলাদেশ)"],
     "bn-IN" : ["Bangla (India)","Bengali (India)","বাংলা (ভারত)"],
     "bo-CN" : ["Tibetan (China)","Tibetan (PRC)","བོད་ཡིག (ཀྲུང་ཧྭ་མི་དམངས་སྤྱི་མཐུན་རྒྱལ་ཁབ།)"],
     "br-FR" : ["Breton (France)","Breton (France)","brezhoneg (Frañs)"],
     "bs-Cyrl-BA" : ["Bosnian (Cyrillic, Bosnia and Herzegovina)","Bosnian (Cyrillic, Bosnia and Herzegovina)","босански (Босна и Херцеговина)"],
     "bs-Latn-BA" : ["Bosnian (Latin, Bosnia and Herzegovina)","Bosnian (Latin, Bosnia and Herzegovina)","bosanski (Bosna i Hercegovina)"],
     "ca-ES" : ["Catalan (Catalan)","Catalan (Catalan)","Català (Català)"],
     "ca-ES-valencia" : ["Valencian (Spain)","Valencian (Spain)","Valencià (Espanya)"],
     "chr-Cher-US" : ["Cherokee (Cherokee)","Cherokee (Cherokee)","ᏣᎳᎩ (ᏣᎳᎩ)"],
     "co-FR" : ["Corsican (France)","Corsican (France)","Corsu (Francia)"],
     "cs-CZ" : ["Czech (Czech Republic)","Czech (Czech Republic)","čeština (Česká republika)"],
     "cy-GB" : ["Welsh (United Kingdom)","Welsh (United Kingdom)","Cymraeg (Y Deyrnas Unedig)"],
     "da-DK" : ["Danish (Denmark)","Danish (Denmark)","dansk (Danmark)"],
     "de-AT" : ["German (Austria)","German (Austria)","Deutsch (Österreich)"],
     "de-CH" : ["German (Switzerland)","German (Switzerland)","Deutsch (Schweiz)"],
     "de-DE" : ["German (Germany)","German (Germany)","Deutsch (Deutschland)"],
     "de-LI" : ["German (Liechtenstein)","German (Liechtenstein)","Deutsch (Liechtenstein)"],
     "de-LU" : ["German (Luxembourg)","German (Luxembourg)","Deutsch (Luxemburg)"],
     "dsb-DE" : ["Lower Sorbian (Germany)","Lower Sorbian (Germany)","dolnoserbšćina (Nimska)"],
     "dv-MV" : ["Divehi (Maldives)","Divehi (Maldives)","ދިވެހިބަސް (ދިވެހި ރާއްޖެ)"],
     "el-GR" : ["Greek (Greece)","Greek (Greece)","Ελληνικά (Ελλάδα)"],
     "en-029" : ["English (Caribbean)","English (Caribbean)","English (Caribbean)"],
     "en-AU" : ["English (Australia)","English (Australia)","English (Australia)"],
     "en-BZ" : ["English (Belize)","English (Belize)","English (Belize)"],
     "en-CA" : ["English (Canada)","English (Canada)","English (Canada)"],
     "en-GB" : ["English (United Kingdom)","English (United Kingdom)","English (United Kingdom)"],
     "en-HK" : ["English (Hong Kong)","English (Hong Kong SAR)","English (Hong Kong)"],
     "en-IE" : ["English (Ireland)","English (Ireland)","English (Ireland)"],
     "en-IN" : ["English (India)","English (India)","English (India)"],
     "en-JM" : ["English (Jamaica)","English (Jamaica)","English (Jamaica)"],
     "en-MY" : ["English (Malaysia)","English (Malaysia)","English (Malaysia)"],
     "en-NZ" : ["English (New Zealand)","English (New Zealand)","English (New Zealand)"],
     "en-PH" : ["English (Philippines)","English (Republic of the Philippines)","English (Philippines)"],
     "en-SG" : ["English (Singapore)","English (Singapore)","English (Singapore)"],
     "en-TT" : ["English (Trinidad and Tobago)","English (Trinidad and Tobago)","English (Trinidad and Tobago)"],
     "en-US" : ["English (United States)","English (United States)","English (United States)"],
     "en-ZA" : ["English (South Africa)","English (South Africa)","English (South Africa)"],
     "en-ZW" : ["English (Zimbabwe)","English (Zimbabwe)","English (Zimbabwe)"],
     "es-419" : ["Spanish (Latin America)","Spanish (Latin America)","español (Latinoamérica)"],
     "es-AR" : ["Spanish (Argentina)","Spanish (Argentina)","español (Argentina)"],
     "es-BO" : ["Spanish (Bolivia)","Spanish (Bolivia)","español (Bolivia)"],
     "es-CL" : ["Spanish (Chile)","Spanish (Chile)","español (Chile)"],
     "es-CO" : ["Spanish (Colombia)","Spanish (Colombia)","español (Colombia)"],
     "es-CR" : ["Spanish (Costa Rica)","Spanish (Costa Rica)","español (Costa Rica)"],
     "es-DO" : ["Spanish (Dominican Republic)","Spanish (Dominican Republic)","español (República Dominicana)"],
     "es-EC" : ["Spanish (Ecuador)","Spanish (Ecuador)","español (Ecuador)"],
     "es-ES" : ["Spanish (Spain, International Sort)","Spanish (Spain)","español (España, alfabetización internacional)"],
     "es-GT" : ["Spanish (Guatemala)","Spanish (Guatemala)","español (Guatemala)"],
     "es-HN" : ["Spanish (Honduras)","Spanish (Honduras)","español (Honduras)"],
     "es-MX" : ["Spanish (Mexico)","Spanish (Mexico)","español (México)"],
     "es-NI" : ["Spanish (Nicaragua)","Spanish (Nicaragua)","español (Nicaragua)"],
     "es-PA" : ["Spanish (Panama)","Spanish (Panama)","español (Panamá)"],
     "es-PE" : ["Spanish (Peru)","Spanish (Peru)","español (Perú)"],
     "es-PR" : ["Spanish (Puerto Rico)","Spanish (Puerto Rico)","español (Puerto Rico)"],
     "es-PY" : ["Spanish (Paraguay)","Spanish (Paraguay)","español (Paraguay)"],
     "es-SV" : ["Spanish (El Salvador)","Spanish (El Salvador)","español (El Salvador)"],
     "es-US" : ["Spanish (United States)","Spanish (United States)","español (Estados Unidos)"],
     "es-UY" : ["Spanish (Uruguay)","Spanish (Uruguay)","español (Uruguay)"],
     "es-VE" : ["Spanish (Bolivarian Republic of Venezuela)","Spanish (Bolivarian Republic of Venezuela)","español (Republica Bolivariana de Venezuela)"],
     "et-EE" : ["Estonian (Estonia)","Estonian (Estonia)","eesti (Eesti)"],
     "eu-ES" : ["Basque (Basque)","Basque (Basque)","euskara (euskara)"],
     "fa-IR" : ["Persian","Persian","فارسى (ایران)"],
     "ff-Latn-SN" : ["Fulah (Latin, Senegal)","Fulah (Latin, Senegal)","Fulah (Sénégal)"],
     "fi-FI" : ["Finnish (Finland)","Finnish (Finland)","suomi (Suomi)"],
     "fil-PH" : ["Filipino (Philippines)","Filipino (Philippines)","Filipino (Pilipinas)"],
     "fo-FO" : ["Faroese (Faroe Islands)","Faroese (Faroe Islands)","føroyskt (Føroyar)"],
     "fr-BE" : ["French (Belgium)","French (Belgium)","français (Belgique)"],
     "fr-CA" : ["French (Canada)","French (Canada)","français (Canada)"],
     "fr-CD" : ["French (Congo [DRC])","French (Congo [DRC])","français (Congo [RDC])"],
     "fr-CH" : ["French (Switzerland)","French (Switzerland)","français (Suisse)"],
     "fr-CI" : ["French (Ivory Coast)","French (Côte d’Ivoire)","français (Côte d’Ivoire)"],
     "fr-CM" : ["French (Cameroon)","French (Cameroon)","français (Cameroun)"],
     "fr-FR" : ["French (France)","French (France)","français (France)"],
     "fr-HT" : ["French (Haiti)","French (Haiti)","français (Haïti)"],
     "fr-LU" : ["French (Luxembourg)","French (Luxembourg)","français (Luxembourg)"],
     "fr-MA" : ["French (Morocco)","French (Morocco)","français (Maroc)"],
     "fr-MC" : ["French (Monaco)","French (Monaco)","français (Principauté de Monaco)"],
     "fr-ML" : ["French (Mali)","French (Mali)","français (Mali)"],
     "fr-RE" : ["French (Réunion)","French (Réunion)","français (Réunion)"],
     "fr-SN" : ["French (Senegal)","French (Senegal)","français (Sénégal)"],
     "fy-NL" : ["Frisian (Netherlands)","Frisian (Netherlands)","Frysk (Nederlân)"],
     "ga-IE" : ["Irish (Ireland)","Irish (Ireland)","Gaeilge (Éire)"],
     "gd-GB" : ["Scottish Gaelic (United Kingdom)","Scottish Gaelic (United Kingdom)","Gàidhlig (An Rìoghachd Aonaichte)"],
     "gl-ES" : ["Galician (Galician)","Galician (Galician)","galego (galego)"],
     "gn-PY" : ["Guarani (Paraguay)","Guarani (Paraguay)","Guarani (Paraguái)"],
     "gsw-FR" : ["Alsatian (France)","Alsatian (France)","Elsässisch (Frànkrisch)"],
     "gu-IN" : ["Gujarati (India)","Gujarati (India)","ગુજરાતી (ભારત)"],
     "ha-Latn-NG" : ["Hausa (Latin, Nigeria)","Hausa (Latin, Nigeria)","Hausa (Nijeriya)"],
     "haw-US" : ["Hawaiian (United States)","Hawaiian (United States)","Hawaiʻi (ʻAmelika)"],
     "he-IL" : ["Hebrew (Israel)","Hebrew (Israel)","עברית (ישראל)"],
     "hi-IN" : ["Hindi (India)","Hindi (India)","हिंदी (भारत)"],
     "hr-BA" : ["Croatian (Latin, Bosnia and Herzegovina)","Croatian (Latin, Bosnia and Herzegovina)","hrvatski (Bosna i Hercegovina)"],
     "hr-HR" : ["Croatian (Croatia)","Croatian (Croatia)","hrvatski (Hrvatska)"],
     "hsb-DE" : ["Upper Sorbian (Germany)","Upper Sorbian (Germany)","hornjoserbšćina (Němska)"],
     "hu-HU" : ["Hungarian (Hungary)","Hungarian (Hungary)","magyar (Magyarország)"],
     "hy-AM" : ["Armenian (Armenia)","Armenian (Armenia)","Հայերեն (Հայաստան)"],
     "id-ID" : ["Indonesian (Indonesia)","Indonesian (Indonesia)","Bahasa Indonesia (Indonesia)"],
     "ig-NG" : ["Igbo (Nigeria)","Igbo (Nigeria)","Igbo (Nigeria)"],
     "ii-CN" : ["Yi (China)","Yi (PRC)","ꆈꌠꁱꂷ (ꍏꉸꏓꂱꇭꉼꇩ)"],
     "is-IS" : ["Icelandic (Iceland)","Icelandic (Iceland)","íslenska (Ísland)"],
     "it-CH" : ["Italian (Switzerland)","Italian (Switzerland)","italiano (Svizzera)"],
     "it-IT" : ["Italian (Italy)","Italian (Italy)","italiano (Italia)"],
     "iu-Cans-CA" : ["Inuktitut (Syllabics, Canada)","Inuktitut (Syllabics, Canada)","ᐃᓄᒃᑎᑐᑦ (ᑲᓇᑕᒥ)"],
     "iu-Latn-CA" : ["Inuktitut (Latin, Canada)","Inuktitut (Latin, Canada)","Inuktitut (Kanatami)"],
     "ja-JP" : ["Japanese (Japan)","Japanese (Japan)","日本語 (日本)"],
     "jv-Latn-ID" : ["Javanese (Indonesia)","Basa Jawa (Indonesia)","Basa Jawa (Indonesia)"],
     "ka-GE" : ["Georgian (Georgia)","Georgian (Georgia)","ქართული (საქართველო)"],
     "kk-KZ" : ["Kazakh (Kazakhstan)","Kazakh (Kazakhstan)","Қазақ (Қазақстан)"],
     "kl-GL" : ["Greenlandic (Greenland)","Greenlandic (Greenland)","kalaallisut (Kalaallit Nunaat)"],
     "km-KH" : ["Khmer (Cambodia)","Khmer (Cambodia)","ភាសាខ្មែរ (កម្ពុជា)"],
     "kn-IN" : ["Kannada (India)","Kannada (India)","ಕನ್ನಡ (ಭಾರತ)"],
     "ko-KR" : ["Korean (Korea)","Korean (Korea)","한국어(대한민국)"],
     "kok-IN" : ["Konkani (India)","Konkani (India)","कोंकणी (भारत)"],
     "ku-Arab-IQ" : ["Central Kurdish (Iraq)","Central Kurdish (Iraq)","کوردیی ناوەڕاست (کوردستان)"],
     "ky-KG" : ["Kyrgyz (Kyrgyzstan)","Kyrgyz (Kyrgyzstan)","Кыргыз (Кыргызстан)"],
     "lb-LU" : ["Luxembourgish (Luxembourg)","Luxembourgish (Luxembourg)","Lëtzebuergesch (Lëtzebuerg)"],
     "lo-LA" : ["Lao (Lao PDR)","Lao (Lao P.D.R.)","ພາສາລາວ (ສປປ ລາວ)"],
     "lt-LT" : ["Lithuanian (Lithuania)","Lithuanian (Lithuania)","lietuvių (Lietuva)"],
     "lv-LV" : ["Latvian (Latvia)","Latvian (Latvia)","latviešu (Latvija)"],
     "mg-MG" : ["Malagasy (Madagascar)","Malagasy (Madagasikara)","Malagasy (Madagasikara)"],
     "mi-NZ" : ["Maori (New Zealand)","Maori (New Zealand)","Reo Māori (Aotearoa)"],
     "mk-MK" : ["Macedonian (Former Yugoslav Republic of Macedonia)","Macedonian (Former Yugoslav Republic of Macedonia)","македонски јазик (Македонија)"],
     "ml-IN" : ["Malayalam (India)","Malayalam (India)","മലയാളം (ഭാരതം)"],
     "mn-MN" : ["Mongolian (Cyrillic, Mongolia)","Mongolian (Cyrillic, Mongolia)","Монгол хэл (Монгол улс)"],
     "mn-Mong-CN" : ["Mongolian (Traditional Mongolian, China)","Mongolian (Traditional Mongolian, PRC)","ᠮᠤᠨᠭᠭᠤᠯ ᠬᠡᠯᠡ (ᠪᠦᠭᠦᠳᠡ ᠨᠠᠢᠷᠠᠮᠳᠠᠬᠤ ᠳᠤᠮᠳᠠᠳᠤ ᠠᠷᠠᠳ ᠣᠯᠣᠰ)"],
     "mn-Mong-MN" : ["Mongolian (Traditional Mongolian, Mongolia)","Mongolian (Traditional Mongolian, Mongolia)","ᠮᠤᠨᠭᠭᠤᠯ ᠬᠡᠯᠡ (ᠮᠤᠨᠭᠭᠤᠯ ᠣᠯᠣᠰ)"],
     "moh-CA" : ["Mohawk (Mohawk)","Mohawk (Mohawk)","Kanien'kéha"],
     "mr-IN" : ["Marathi (India)","Marathi (India)","मराठी (भारत)"],
     "ms-BN" : ["Malay (Brunei Darussalam)","Malay (Brunei Darussalam)","Bahasa Melayu (Brunei Darussalam)"],
     "ms-MY" : ["Malay (Malaysia)","Malay (Malaysia)","Bahasa Melayu (Malaysia)"],
     "mt-MT" : ["Maltese (Malta)","Maltese (Malta)","Malti (Malta)"],
     "my-MM" : ["Burmese (Myanmar)","Burmese (Myanmar)","ဗမာ (မြန်မာ)"],
     "nb-NO" : ["Norwegian, Bokmål (Norway)","Norwegian, Bokmål (Norway)","norsk, bokmål (Norge)"],
     "ne-IN" : ["Nepali (India)","Nepali (India)","नेपाली (भारत)"],
     "ne-NP" : ["Nepali (Nepal)","Nepali (Nepal)","नेपाली (नेपाल)"],
     "nl-BE" : ["Dutch (Belgium)","Dutch (Belgium)","Nederlands (België)"],
     "nl-NL" : ["Dutch (Netherlands)","Dutch (Netherlands)","Nederlands (Nederland)"],
     "nn-NO" : ["Norwegian, Nynorsk (Norway)","Norwegian, Nynorsk (Norway)","norsk, nynorsk (Noreg)"],
     "nqo-GN" : ["N'ko (Guinea)","ߒߞߏ (ߖߌ߬ߣߍ߬ ߞߊ߲ߓߍ߲)","ߒߞߏ (ߖߌ߬ߣߍ߬ ߞߊ߲ߓߍ߲)"],
     "nso-ZA" : ["Sesotho sa Leboa (South Africa)","Sesotho sa Leboa (South Africa)","Sesotho sa Leboa (Afrika Borwa)"],
     "oc-FR" : ["Occitan (France)","Occitan (France)","Occitan (França)"],
     "om-ET" : ["Oromo (Ethiopia)","Oromo (Ethiopia)","Oromoo (Itoophiyaa)"],
     "or-IN" : ["Odia (India)","Oriya (India)","ଓଡ଼ିଆ (ଭାରତ)"],
     "pa-Arab-PK" : ["Punjabi (Pakistan)","Punjabi (Islamic Republic of Pakistan)","پنجابی (پاکستان)"],
     "pa-IN" : ["Punjabi (India)","Punjabi (India)","ਪੰਜਾਬੀ (ਭਾਰਤ)"],
     "pl-PL" : ["Polish (Poland)","Polish (Poland)","polski (Polska)"],
     "prs-AF" : ["Dari (Afghanistan)","Dari (Afghanistan)","درى (افغانستان)"],
     "ps-AF" : ["Pashto (Afghanistan)","Pashto (Afghanistan)","پښتو (افغانستان)"],
     "pt-AO" : ["Portuguese (Angola)","português (Angola)","português (Angola)"],
     "pt-BR" : ["Portuguese (Brazil)","Portuguese (Brazil)","português (Brasil)"],
     "pt-PT" : ["Portuguese (Portugal)","Portuguese (Portugal)","português (Portugal)"],
     "qut-GT" : ["K'iche' (Guatemala)","K'iche (Guatemala)","K'iche' (Guatemala)"],
     "quz-BO" : ["Quechua (Bolivia)","Quechua (Bolivia)","runasimi (Qullasuyu)"],
     "quz-EC" : ["Quichua (Ecuador)","Quechua (Ecuador)","runa shimi (Ecuador Suyu)"],
     "quz-PE" : ["Quechua (Peru)","Quechua (Peru)","runasimi (Peru)"],
     "rm-CH" : ["Romansh (Switzerland)","Romansh (Switzerland)","Rumantsch (Svizra)"],
     "ro-MD" : ["Romanian (Moldova)","Romanian (Moldova)","română (Republica Moldova)"],
     "ro-RO" : ["Romanian (Romania)","Romanian (Romania)","română (România)"],
     "ru-RU" : ["Russian (Russia)","Russian (Russia)","русский (Россия)"],
     "rw-RW" : ["Kinyarwanda (Rwanda)","Kinyarwanda (Rwanda)","Kinyarwanda (Rwanda)"],
     "sa-IN" : ["Sanskrit (India)","Sanskrit (India)","संस्कृत (भारतम्)"],
     "sah-RU" : ["Sakha (Russia)","Sakha (Russia)","Саха (Россия)"],
     "sd-Arab-PK" : ["Sindhi (Pakistan)","Sindhi (Islamic Republic of Pakistan)","سنڌي (پاکستان)"],
     "se-FI" : ["Sami, Northern (Finland)","Sami, Northern (Finland)","davvisámegiella (Suopma)"],
     "se-NO" : ["Sami, Northern (Norway)","Sami, Northern (Norway)","davvisámegiella (Norga)"],
     "se-SE" : ["Sami, Northern (Sweden)","Sami, Northern (Sweden)","davvisámegiella (Ruoŧŧa)"],
     "si-LK" : ["Sinhala (Sri Lanka)","Sinhala (Sri Lanka)","සිංහල (ශ්‍රී ලංකා)"],
     "sk-SK" : ["Slovak (Slovakia)","Slovak (Slovakia)","slovenčina (Slovenská republika)"],
     "sl-SI" : ["Slovenian (Slovenia)","Slovenian (Slovenia)","slovenščina (Slovenija)"],
     "sma-NO" : ["Sami, Southern (Norway)","Sami, Southern (Norway)","åarjelsaemiengïele (Nöörje)"],
     "sma-SE" : ["Sami, Southern (Sweden)","Sami, Southern (Sweden)","åarjelsaemiengïele (Sveerje)"],
     "smj-NO" : ["Sami, Lule (Norway)","Sami, Lule (Norway)","julevusámegiella (Vuodna)"],
     "smj-SE" : ["Sami, Lule (Sweden)","Sami, Lule (Sweden)","julevusámegiella (Svierik)"],
     "smn-FI" : ["Sami, Inari (Finland)","Sami, Inari (Finland)","sämikielâ (Suomâ)"],
     "sms-FI" : ["Sami, Skolt (Finland)","Sami, Skolt (Finland)","sää´mǩiõll (Lää´ddjânnam)"],
     "sn-Latn-ZW" : ["Shona (Latin, Zimbabwe)","chiShona (Latin, Zimbabwe)","chiShona (Latin, Zimbabwe)"],
     "so-SO" : ["Somali (Somalia)","Somali (Somalia)","Soomaali (Soomaaliya)"],
     "sq-AL" : ["Albanian (Albania)","Albanian (Albania)","Shqip (Shqipëria)"],
     "sr-Cyrl-BA" : ["Serbian (Cyrillic, Bosnia and Herzegovina)","Serbian (Cyrillic, Bosnia and Herzegovina)","српски (Босна и Херцеговина)"],
     "sr-Cyrl-CS" : ["Serbian (Cyrillic, Serbia and Montenegro (Former))","Serbian (Cyrillic, Serbia and Montenegro (Former))","српски (Србија и Црна Гора (Бивша))"],
     "sr-Cyrl-ME" : ["Serbian (Cyrillic, Montenegro)","Serbian (Cyrillic, Montenegro)","српски (Црна Гора)"],
     "sr-Cyrl-RS" : ["Serbian (Cyrillic, Serbia)","Serbian (Cyrillic, Serbia)","српски (Србија)"],
     "sr-Latn-BA" : ["Serbian (Latin, Bosnia and Herzegovina)","Serbian (Latin, Bosnia and Herzegovina)","srpski (Bosna i Hercegovina)"],
     "sr-Latn-CS" : ["Serbian (Latin, Serbia and Montenegro (Former))","Serbian (Latin, Serbia and Montenegro (Former))","srpski (Srbija i Crna Gora (Bivša))"],
     "sr-Latn-ME" : ["Serbian (Latin, Montenegro)","Serbian (Latin, Montenegro)","srpski (Crna Gora)"],
     "sr-Latn-RS" : ["Serbian (Latin, Serbia)","Serbian (Latin, Serbia)","srpski (Srbija)"],
     "st-ZA" : ["Southern Sotho (South Africa)","Southern Sotho (South Africa)","Sesotho (South Africa)"],
     "sv-FI" : ["Swedish (Finland)","Swedish (Finland)","svenska (Finland)"],
     "sv-SE" : ["Swedish (Sweden)","Swedish (Sweden)","svenska (Sverige)"],
     "sw-KE" : ["Kiswahili (Kenya)","Kiswahili (Kenya)","Kiswahili (Kenya)"],
     "syr-SY" : ["Syriac (Syria)","Syriac (Syria)","ܣܘܪܝܝܐ (ܣܘܪܝܐ)"],
     "ta-IN" : ["Tamil (India)","Tamil (India)","தமிழ் (இந்தியா)"],
     "ta-LK" : ["Tamil (Sri Lanka)","Tamil (Sri Lanka)","தமிழ் (இலங்கை)"],
     "te-IN" : ["Telugu (India)","Telugu (India)","తెలుగు (భారత దేశం)"],
     "tg-Cyrl-TJ" : ["Tajik (Cyrillic, Tajikistan)","Tajik (Cyrillic, Tajikistan)","Тоҷикӣ (Тоҷикистон)"],
     "th-TH" : ["Thai (Thailand)","Thai (Thailand)","ไทย (ไทย)"],
     "ti-ER" : ["Tigrinya (Eritrea)","Tigrinya (Eritrea)","ትግርኛ (ኤርትራ)"],
     "ti-ET" : ["Tigrinya (Ethiopia)","Tigrinya (Ethiopia)","ትግርኛ (ኢትዮጵያ)"],
     "tk-TM" : ["Turkmen (Turkmenistan)","Turkmen (Turkmenistan)","Türkmen dili (Türkmenistan)"],
     "tn-BW" : ["Setswana (Botswana)","Setswana (Botswana)","Setswana (Botswana)"],
     "tn-ZA" : ["Setswana (South Africa)","Setswana (South Africa)","Setswana (Aforika Borwa)"],
     "tr-TR" : ["Turkish (Turkey)","Turkish (Turkey)","Türkçe (Türkiye)"],
     "ts-ZA" : ["Tsonga (South Africa)","Tsonga (South Africa)","Xitsonga (South Africa)"],
     "tt-RU" : ["Tatar (Russia)","Tatar (Russia)","Татар (Россия)"],
     "tzm-Latn-DZ" : ["Central Atlas Tamazight (Latin, Algeria)","Tamazight (Latin, Algeria)","Tamazight (Djazaïr)"],
     "tzm-Tfng-MA" : ["Central Atlas Tamazight (Tifinagh, Morocco)","Central Atlas Tamazight (Tifinagh, Morocco)","ⵜⴰⵎⴰⵣⵉⵖⵜ (ⵍⵎⵖⵔⵉⴱ)"],
     "ug-CN" : ["Uyghur (China)","Uyghur (PRC)","ئۇيغۇرچە (جۇڭخۇا خەلق جۇمھۇرىيىتى)"],
     "uk-UA" : ["Ukrainian (Ukraine)","Ukrainian (Ukraine)","українська (Україна)"],
     "ur-IN" : ["Urdu (India)","Urdu (India)","اردو (بھارت)"],
     "ur-PK" : ["Urdu (Pakistan)","Urdu (Islamic Republic of Pakistan)","اُردو (پاکستان)"],
     "uz-Cyrl-UZ" : ["Uzbek (Cyrillic, Uzbekistan)","Uzbek (Cyrillic, Uzbekistan)","Ўзбекча (Ўзбекистон Республикаси)"],
     "uz-Latn-UZ" : ["Uzbek (Latin, Uzbekistan)","Uzbek (Latin, Uzbekistan)","O'zbekcha (O'zbekiston Respublikasi)"],
     "vi-VN" : ["Vietnamese (Vietnam)","Vietnamese (Vietnam)","Tiếng Việt (Việt Nam)"],
     "wo-SN" : ["Wolof (Senegal)","Wolof (Senegal)","Wolof (Senegaal)"],
     "xh-ZA" : ["isiXhosa (South Africa)","isiXhosa (South Africa)","isiXhosa (uMzantsi Afrika)"],
     "yo-NG" : ["Yoruba (Nigeria)","Yoruba (Nigeria)","Yoruba (Nigeria)"],
     "zgh-Tfng-MA" : ["Standard Morrocan Tamazight (Tifinagh, Morocco)","ⵜⴰⵎⴰⵣⵉⵖⵜ (ⵍⵎⵖⵔⵉⴱ)","ⵜⴰⵎⴰⵣⵉⵖⵜ (ⵍⵎⵖⵔⵉⴱ)"],
     "zh-CN" : ["Chinese (Simplified, China)","Chinese (Simplified, PRC)","中文(中华人民共和国)"],
     "zh-HK" : ["Chinese (Traditional, Hong Kong SAR)","Chinese (Traditional, Hong Kong S.A.R.)","中文(香港特別行政區)"],
     "zh-MO" : ["Chinese (Traditional, Macao SAR)","Chinese (Traditional, Macao S.A.R.)","中文(澳門特別行政區)"],
     "zh-SG" : ["Chinese (Simplified, Singapore)","Chinese (Simplified, Singapore)","中文(新加坡)"],
     "zh-TW" : ["Chinese (Traditional, Taiwan)","Chinese (Traditional, Taiwan)","中文(台灣)"],
     "zu-ZA" : ["isiZulu (South Africa)","isiZulu (South Africa)","isiZulu (iNingizimu Afrika)"]
}

var localeCurrencyInfo={
     "af-ZA" : ["2",","," ",2,2,"R",[3]],
     "am-ET" : ["2",".",",",0,1,"ETB",[3]],
     "ar-AE" : ["2",".",",",2,3,"د.إ.‏",[3]],
     "ar-BH" : ["3",".",",",2,3,"د.ب.‏",[3]],
     "ar-DZ" : ["2",".",",",2,3,"د.ج.‏",[3]],
     "ar-EG" : ["2",".",",",2,3,"ج.م.‏",[3]],
     "ar-IQ" : ["2",".",",",2,3,"د.ع.‏",[3]],
     "ar-JO" : ["3",".",",",2,3,"د.ا.‏",[3]],
     "ar-KW" : ["3",".",",",2,3,"د.ك.‏",[3]],
     "ar-LB" : ["2",".",",",2,3,"ل.ل.‏‏",[3]],
     "ar-LY" : ["3",".",",",0,3,"د.ل.‏‏",[3]],
     "ar-MA" : ["2",".",",",2,3,"د.م.‏‏",[3]],
     "ar-OM" : ["3",".",",",2,3,"ر.ع.‏‏",[3]],
     "ar-QA" : ["2",".",",",2,3,"ر.ق.‏‏",[3]],
     "ar-SA" : ["2",".",",",2,3,"ر.س.‏",[3]],
     "ar-SY" : ["2",".",",",2,3,"ل.س.‏‏",[3]],
     "ar-TN" : ["3",".",",",2,3,"د.ت.‏‏",[3]],
     "ar-YE" : ["2",".",",",2,3,"ر.ي.‏‏",[3]],
     "arn-CL" : ["2",",",".",2,9,"$",[3]],
     "as-IN" : ["2",".",",",2,12,"₹",[3,2]],
     "az-Cyrl-AZ" : ["2",","," ",3,8,"ман.",[3]],
     "az-Latn-AZ" : ["2",","," ",3,8,"man.",[3]],
     "ba-RU" : ["2",","," ",3,8,"һ.",[3]],
     "be-BY" : ["2",","," ",3,8,"Br",[3]],
     "bg-BG" : ["2",","," ",3,8,"лв.",[3]],
     "bn-BD" : ["2",".",",",2,12,"৳",[3,2]],
     "bn-IN" : ["2",".",",",2,12,"₹",[3,2]],
     "bo-CN" : ["2",".",",",0,2,"¥",[3,0]],
     "br-FR" : ["2",","," ",3,8,"€",[3]],
     "bs-Cyrl-BA" : ["2",",",".",3,8,"КМ",[3]],
     "bs-Latn-BA" : ["2",",",".",3,8,"KM",[3]],
     "ca-ES" : ["2",",",".",3,8,"€",[3]],
     "ca-ES-valencia" : ["2",",",".",3,8,"€",[3]],
     "chr-Cher-US" : ["2",".",",",0,0,"$",[3]],
     "co-FR" : ["2",","," ",3,8,"€",[3]],
     "cs-CZ" : ["2",","," ",3,8,"Kč",[3]],
     "cy-GB" : ["2",".",",",0,1,"£",[3]],
     "da-DK" : ["2",",",".",2,12,"kr.",[3]],
     "de-AT" : ["2",",",".",3,8,"€",[3]],
     "de-CH" : ["2",".","'",2,2,"Fr.",[3]],
     "de-DE" : ["2",",",".",3,8,"€",[3]],
     "de-LI" : ["2",",",".",2,2,"CHF",[3]],
     "de-LU" : ["2",",",".",3,8,"€",[3]],
     "dsb-DE" : ["2",",",".",3,8,"€",[3]],
     "dv-MV" : ["2",".",",",3,10,"ރ.",[3]],
     "el-GR" : ["2",",",".",3,8,"€",[3]],
     "en-029" : ["2",".",",",0,1,"EC$",[3]],
     "en-AU" : ["2",".",",",0,1,"$",[3]],
     "en-BZ" : ["2",".",",",0,0,"BZ$",[3,0]],
     "en-CA" : ["2",".",",",0,1,"$",[3]],
     "en-GB" : ["2",".",",",0,1,"£",[3]],
     "en-HK" : ["2",".",",",0,0,"$",[3]],
     "en-IE" : ["2",".",",",0,1,"€",[3]],
     "en-IN" : ["2",".",",",2,12,"₹",[3,2,0]],
     "en-JM" : ["2",".",",",0,1,"J$",[3]],
     "en-MY" : ["2",".",",",0,0,"RM",[3]],
     "en-NZ" : ["2",".",",",0,1,"$",[3]],
     "en-PH" : ["2",".",",",0,0,"₱",[3]],
     "en-SG" : ["2",".",",",0,0,"$",[3]],
     "en-TT" : ["2",".",",",0,0,"TT$",[3,0]],
     "en-US" : ["2",".",",",0,0,"$",[3]],
     "en-ZA" : ["2",","," ",2,2,"R",[3]],
     "en-ZW" : ["2",".",",",0,0,"$",[3]],
     "es-419" : ["2",".",",",0,1,"US$",[3]],
     "es-AR" : ["2",",",".",2,2,"$",[3]],
     "es-BO" : ["2",",",".",2,14,"Bs.",[3]],
     "es-CL" : ["2",",",".",2,9,"$",[3]],
     "es-CO" : ["2",",",".",0,1,"$",[3]],
     "es-CR" : ["2",",",".",0,0,"₡",[3]],
     "es-DO" : ["2",".",",",0,1,"RD$",[3]],
     "es-EC" : ["2",",",".",2,14,"$",[3]],
     "es-ES" : ["2",",",".",3,8,"€",[3]],
     "es-GT" : ["2",".",",",0,1,"Q",[3]],
     "es-HN" : ["2",".",",",2,12,"L.",[3,0]],
     "es-MX" : ["2",".",",",0,1,"$",[3]],
     "es-NI" : ["2",".",",",0,0,"C$",[3,0]],
     "es-PA" : ["2",".",",",2,14,"B/.",[3]],
     "es-PE" : ["2",".",",",2,12,"S/.",[3]],
     "es-PR" : ["2",".",",",0,1,"$",[3,0]],
     "es-PY" : ["0",",",".",2,14,"₲",[3]],
     "es-SV" : ["2",".",",",0,0,"$",[3,0]],
     "es-US" : ["2",".",",",0,0,"$",[3]],
     "es-UY" : ["2",",",".",2,9,"$U",[3]],
     "es-VE" : ["2",",",".",2,12,"Bs.F.",[3]],
     "et-EE" : ["2","."," ",3,8,"€",[3]],
     "eu-ES" : ["2",",",".",3,8,"€",[3]],
     "fa-IR" : ["2","/",",",0,3,"ريال",[3]],
     "ff-Latn-SN" : ["2",","," ",3,8,"CFA",[3]],
     "fi-FI" : ["2",","," ",3,8,"€",[3]],
     "fil-PH" : ["2",".",",",0,0,"₱",[3]],
     "fo-FO" : ["2",",",".",2,12,"kr.",[3]],
     "fr-BE" : ["2",",",".",3,8,"€",[3]],
     "fr-CA" : ["2",","," ",3,15,"$",[3]],
     "fr-CD" : ["2",","," ",1,4,"FC",[3]],
     "fr-CH" : ["2",".","'",3,8,"fr.",[3]],
     "fr-CI" : ["2",","," ",1,4,"CFA",[3]],
     "fr-CM" : ["2",","," ",1,4,"FCFA",[3]],
     "fr-FR" : ["2",","," ",3,8,"€",[3]],
     "fr-HT" : ["2",","," ",1,4,"G",[3]],
     "fr-LU" : ["2",","," ",3,8,"€",[3]],
     "fr-MA" : ["2",","," ",1,4,"DH",[3]],
     "fr-MC" : ["2",","," ",3,8,"€",[3]],
     "fr-ML" : ["2",","," ",1,4,"CFA",[3]],
     "fr-RE" : ["2",","," ",1,4,"€",[3]],
     "fr-SN" : ["2",","," ",1,4,"CFA",[3]],
     "fy-NL" : ["2",",",".",2,12,"€",[3]],
     "ga-IE" : ["2",".",",",0,1,"€",[3]],
     "gd-GB" : ["2",".",",",0,1,"£",[3]],
     "gl-ES" : ["2",",",".",3,8,"€",[3]],
     "gn-PY" : ["0",",",".",3,8,"₲",[3]],
     "gsw-FR" : ["2",","," ",3,8,"€",[3]],
     "gu-IN" : ["2",".",",",2,12,"₹",[3,2]],
     "ha-Latn-NG" : ["2",".",",",2,2,"₦",[3]],
     "haw-US" : ["2",".",",",0,0,"$",[3]],
     "he-IL" : ["2",".",",",2,2,"₪",[3]],
     "hi-IN" : ["2",".",",",2,12,"₹",[3,2]],
     "hr-BA" : ["2",",",".",3,8,"KM",[3]],
     "hr-HR" : ["2",",",".",3,8,"kn",[3]],
     "hsb-DE" : ["2",",",".",3,8,"€",[3]],
     "hu-HU" : ["2",","," ",3,8,"Ft",[3]],
     "hy-AM" : ["2",".",",",3,8,"֏",[3]],
     "id-ID" : ["0",",",".",0,0,"Rp",[3]],
     "ig-NG" : ["2",".",",",2,2,"₦",[3]],
     "ii-CN" : ["2",".",",",0,2,"¥",[3]],
     "is-IS" : ["0",",",".",3,8,"kr.",[3]],
     "it-CH" : ["2",".","'",2,2,"fr.",[3]],
     "it-IT" : ["2",",",".",2,9,"€",[3]],
     "iu-Cans-CA" : ["2",".",",",0,0,"$",[3]],
     "iu-Latn-CA" : ["2",".",",",0,0,"$",[3]],
     "ja-JP" : ["0",".",",",0,1,"¥",[3]],
     "jv-Latn-ID" : ["0",",",".",0,1,"Rp",[3]],
     "ka-GE" : ["2",","," ",3,8,"ლ.",[3]],
     "kk-KZ" : ["2","-"," ",0,1,"₸",[3]],
     "kl-GL" : ["2",",",".",2,12,"kr.",[3,0]],
     "km-KH" : ["2",".",",",1,5,"៛",[3]],
     "kn-IN" : ["2",".",",",2,12,"₹",[3,2]],
     "ko-KR" : ["0",".",",",0,1,"₩",[3]],
     "kok-IN" : ["2",".",",",2,12,"₹",[3,2]],
     "ku-Arab-IQ" : ["2",".",",",0,2,"د.ع.‏",[3]],
     "ky-KG" : ["2",","," ",3,8,"сом",[3]],
     "lb-LU" : ["2",","," ",3,8,"€",[3]],
     "lo-LA" : ["2",".",",",3,8,"₭",[3,0]],
     "lt-LT" : ["2",","," ",3,8,"Lt",[3]],
     "lv-LV" : ["2",","," ",2,9,"€",[3]],
     "mg-MG" : ["2",".",",",0,1,"Ar",[3]],
     "mi-NZ" : ["2",".",",",0,1,"$",[3]],
     "mk-MK" : ["2",",",".",3,8,"ден.",[3]],
     "ml-IN" : ["2",".",",",2,12,"₹",[3,2]],
     "mn-MN" : ["2",","," ",3,8,"₮",[3]],
     "mn-Mong-CN" : ["2",".",",",0,2,"¥",[3,0]],
     "mn-Mong-MN" : ["2",".",",",0,2,"₮",[3,0]],
     "moh-CA" : ["2",".",",",0,0,"$",[3]],
     "mr-IN" : ["2","`",",",2,12,"₹",[3,2]],
     "ms-BN" : ["0",",",".",0,0,"$",[3]],
     "ms-MY" : ["0",".",",",0,0,"RM",[3]],
     "mt-MT" : ["2",".",",",0,1,"€",[3]],
     "my-MM" : ["2",".",",",3,9,"K",[3]],
     "nb-NO" : ["2",","," ",2,12,"kr",[3]],
     "ne-IN" : ["2",".",",",0,1,"₹",[3]],
     "ne-NP" : ["2",".",",",0,1,"रु",[3]],
     "nl-BE" : ["2",",",".",2,12,"€",[3]],
     "nl-NL" : ["2",",",".",2,12,"€",[3]],
     "nn-NO" : ["2",","," ",2,12,"kr",[3]],
     "nqo-GN" : ["2",".",",",2,13,"ߖߕ.",[3]],
     "nso-ZA" : ["2",".",",",2,2,"R",[3]],
     "oc-FR" : ["2",","," ",3,8,"€",[3]],
     "om-ET" : ["2",".",",",0,1,"Br",[3]],
     "or-IN" : ["2",".",",",2,12,"₹",[3,2]],
     "pa-Arab-PK" : ["2",".",",",2,9,"Rs",[3]],
     "pa-IN" : ["2",".",",",2,12,"₹",[3,2]],
     "pl-PL" : ["2",","," ",3,8,"zł",[3]],
     "prs-AF" : ["2",".",",",0,3,"؋",[3]],
     "ps-AF" : ["2",".",",",0,3,"؋",[3]],
     "pt-AO" : ["2",",",".",0,0,"Kz",[3]],
     "pt-BR" : ["2",",",".",2,9,"R$",[3]],
     "pt-PT" : ["2",","," ",3,8,"€",[3]],
     "qut-GT" : ["2",".",",",0,0,"Q",[3]],
     "quz-BO" : ["2",",",".",2,14,"Bs.",[3]],
     "quz-EC" : ["2",",",".",2,12,"$",[3]],
     "quz-PE" : ["2",".",",",2,12,"S/.",[3]],
     "rm-CH" : ["2",".","'",2,2,"fr.",[3]],
     "ro-MD" : ["2",",",".",1,5,"L",[3]],
     "ro-RO" : ["2",",",".",3,8,"lei",[3]],
     "ru-RU" : ["2",","," ",3,8,"р.",[3]],
     "rw-RW" : ["2",","," ",3,8,"RWF",[3]],
     "sa-IN" : ["2",".",",",2,12,"₹",[3,2]],
     "sah-RU" : ["2",","," ",1,5,"с.",[3]],
     "sd-Arab-PK" : ["2",".",",",2,9,"Rs",[3]],
     "se-FI" : ["2",","," ",3,8,"€",[3]],
     "se-NO" : ["2",","," ",2,12,"kr",[3]],
     "se-SE" : ["2",",",".",3,8,"kr",[3]],
     "si-LK" : ["2",".",",",2,14,"රු.",[3]],
     "sk-SK" : ["2",","," ",3,8,"EUR",[3]],
     "sl-SI" : ["2",",",".",3,8,"€",[3]],
     "sma-NO" : ["2",","," ",2,12,"kr",[3]],
     "sma-SE" : ["2",",",".",3,8,"kr",[3]],
     "smj-NO" : ["2",","," ",2,12,"kr",[3]],
     "smj-SE" : ["2",",",".",3,8,"kr",[3]],
     "smn-FI" : ["2",","," ",3,8,"€",[3]],
     "sms-FI" : ["2",","," ",3,8,"€",[3]],
     "sn-Latn-ZW" : ["2",".",",",0,0,"US$",[3]],
     "so-SO" : ["2",".",",",0,1,"S",[3]],
     "sq-AL" : ["2",",",".",3,8,"Lek",[3]],
     "sr-Cyrl-BA" : ["2",",",".",3,8,"КМ",[3]],
     "sr-Cyrl-CS" : ["2",",",".",3,8,"дин.",[3]],
     "sr-Cyrl-ME" : ["2",",",".",3,8,"€",[3]],
     "sr-Cyrl-RS" : ["2",",",".",3,8,"дин.",[3]],
     "sr-Latn-BA" : ["2",",",".",3,8,"KM",[3]],
     "sr-Latn-CS" : ["2",",",".",3,8,"din.",[3]],
     "sr-Latn-ME" : ["2",",",".",3,8,"€",[3]],
     "sr-Latn-RS" : ["2",",",".",3,8,"din.",[3]],
     "st-ZA" : ["2",","," ",0,1,"R",[3]],
     "sv-FI" : ["2",","," ",3,8,"€",[3]],
     "sv-SE" : ["2",",",".",3,8,"kr",[3]],
     "sw-KE" : ["2",".",",",0,0,"KSh",[3]],
     "syr-SY" : ["2",".",",",3,8,"ܠ.ܣ.‏",[3]],
     "ta-IN" : ["2",".",",",2,12,"₹",[3,2]],
     "ta-LK" : ["2",".",",",2,12,"Rs",[3,2]],
     "te-IN" : ["2",".",",",2,12,"₹",[3,2]],
     "tg-Cyrl-TJ" : ["2",","," ",3,8,"смн",[3]],
     "th-TH" : ["2",".",",",0,1,"฿",[3]],
     "ti-ER" : ["2",".",",",1,1,"ERN",[3]],
     "ti-ET" : ["2",".",",",1,5,"ብር",[3]],
     "tk-TM" : ["2",","," ",1,5,"m.",[3]],
     "tn-BW" : ["2",".",",",2,2,"P",[3]],
     "tn-ZA" : ["2",".",",",2,2,"R",[3]],
     "tr-TR" : ["2",",",".",3,8,"₺",[3]],
     "ts-ZA" : ["2",","," ",0,1,"R",[3]],
     "tt-RU" : ["2",","," ",3,8,"р.",[3]],
     "tzm-Latn-DZ" : ["2",","," ",3,8,"DA",[3]],
     "tzm-Tfng-MA" : ["2",","," ",3,8,"ⴷⵔ",[3]],
     "ug-CN" : ["2",".",",",0,2,"¥",[3]],
     "uk-UA" : ["2",","," ",1,5,"₴",[3]],
     "ur-IN" : ["2",".",",",0,1,"₹",[3,2]],
     "ur-PK" : ["2",".",",",0,3,"Rs",[3]],
     "uz-Cyrl-UZ" : ["2",","," ",3,8,"сўм",[3]],
     "uz-Latn-UZ" : ["2",","," ",3,8,"so'm",[3]],
     "vi-VN" : ["2",",",".",3,8,"₫",[3]],
     "wo-SN" : ["2",","," ",3,8,"CFA",[3]],
     "xh-ZA" : ["2",".",",",2,2,"R",[3]],
     "yo-NG" : ["2",".",",",2,9,"₦",[3]],
     "zgh-Tfng-MA" : ["2",","," ",3,8,"ⴷⵔⵎ",[3]],
     "zh-CN" : ["2",".",",",0,2,"¥",[3]],
     "zh-HK" : ["2",".",",",0,0,"HK$",[3]],
     "zh-MO" : ["2",".",",",0,0,"MOP",[3]],
     "zh-SG" : ["2",".",",",0,0,"$",[3]],
     "zh-TW" : ["2",".",",",0,1,"NT$",[3]],
     "zu-ZA" : ["2",".",",",2,2,"R",[3]]
}

var localeNumberInfo={
     "af-ZA" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "am-ET" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "ar-AE" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",".",",",3,"+","-",[3]],
     "ar-BH" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",".",",",3,"+","-",[3]],
     "ar-DZ" : ["0","1","2","3","4","5","6","7","8","9",".",",",3,"+","-",[3]],
     "ar-EG" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",".",",",3,"+","-",[3]],
     "ar-IQ" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",".",",",3,"+","-",[3]],
     "ar-JO" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",".",",",3,"+","-",[3]],
     "ar-KW" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",".",",",3,"+","-",[3]],
     "ar-LB" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",".",",",3,"+","-",[3]],
     "ar-LY" : ["0","1","2","3","4","5","6","7","8","9",".",",",3,"+","-",[3]],
     "ar-MA" : ["0","1","2","3","4","5","6","7","8","9",".",",",3,"+","-",[3]],
     "ar-OM" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",".",",",3,"+","-",[3]],
     "ar-QA" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",".",",",3,"+","-",[3]],
     "ar-SA" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",".",",",3,"+","-",[3]],
     "ar-SY" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",".",",",3,"+","-",[3]],
     "ar-TN" : ["0","1","2","3","4","5","6","7","8","9",".",",",3,"+","-",[3]],
     "ar-YE" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",".",",",3,"+","-",[3]],
     "arn-CL" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "as-IN" : ["০","১","২","৩","৪","৫","৬","৭","৮","৯",".",",",1,"+","-",[3,2]],
     "az-Cyrl-AZ" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "az-Latn-AZ" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "ba-RU" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "be-BY" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "bg-BG" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "bn-BD" : ["০","১","২","৩","৪","৫","৬","৭","৮","৯",".",",",1,"+","-",[3,2]],
     "bn-IN" : ["০","১","২","৩","৪","৫","৬","৭","৮","৯",".",",",1,"+","-",[3,2]],
     "bo-CN" : ["༠","༡","༢","༣","༤","༥","༦","༧","༨","༩",".",",",1,"+","-",[3,0]],
     "br-FR" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "bs-Cyrl-BA" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "bs-Latn-BA" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "ca-ES" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "ca-ES-valencia" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "chr-Cher-US" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "co-FR" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "cs-CZ" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "cy-GB" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "da-DK" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "de-AT" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "de-CH" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "de-DE" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "de-LI" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "de-LU" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "dsb-DE" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "dv-MV" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "el-GR" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "en-029" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "en-AU" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "en-BZ" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "en-CA" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "en-GB" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "en-HK" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "en-IE" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "en-IN" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3,2,0]],
     "en-JM" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "en-MY" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "en-NZ" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "en-PH" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "en-SG" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "en-TT" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "en-US" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "en-ZA" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "en-ZW" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "es-419" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "es-AR" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "es-BO" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "es-CL" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "es-CO" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "es-CR" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "es-DO" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "es-EC" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "es-ES" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "es-GT" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "es-HN" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "es-MX" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "es-NI" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "es-PA" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "es-PE" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "es-PR" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "es-PY" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "es-SV" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3,3,0]],
     "es-US" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3,0]],
     "es-UY" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "es-VE" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "et-EE" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "eu-ES" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "fa-IR" : ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹","/",",",3,"+","-",[3]],
     "ff-Latn-SN" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fi-FI" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fil-PH" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "fo-FO" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "fr-BE" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "fr-CA" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fr-CD" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fr-CH" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fr-CI" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fr-CM" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fr-FR" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fr-HT" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fr-LU" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fr-MA" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fr-MC" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fr-ML" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fr-RE" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fr-SN" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "fy-NL" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "ga-IE" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "gd-GB" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "gl-ES" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "gn-PY" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "gsw-FR" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "gu-IN" : ["૦","૧","૨","૩","૪","૫","૬","૭","૮","૯",".",",",1,"+","-",[3,2]],
     "ha-Latn-NG" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "haw-US" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "he-IL" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "hi-IN" : ["०","१","२","३","४","५","६","७","८","९",".",",",1,"+","-",[3,2]],
     "hr-BA" : ["0","1","2","3","4","5","6","7","8","9",",",".",2,"+","-",[3]],
     "hr-HR" : ["0","1","2","3","4","5","6","7","8","9",",",".",2,"+","-",[3]],
     "hsb-DE" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "hu-HU" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "hy-AM" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "id-ID" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "ig-NG" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "ii-CN" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "is-IS" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "it-CH" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "it-IT" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "iu-Cans-CA" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "iu-Latn-CA" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "ja-JP" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "jv-Latn-ID" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "ka-GE" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "kk-KZ" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "kl-GL" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3,0]],
     "km-KH" : ["០","១","២","៣","៤","៥","៦","៧","៨","៩",".",",",2,"+","-",[3,0]],
     "kn-IN" : ["೦","೧","೨","೩","೪","೫","೬","೭","೮","೯",".",",",1,"+","-",[3,2]],
     "ko-KR" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "kok-IN" : ["०","१","२","३","४","५","६","७","८","९",".",",",1,"+","-",[3,2]],
     "ku-Arab-IQ" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",".",",",1,"+","-",[3]],
     "ky-KG" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "lb-LU" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3,0]],
     "lo-LA" : ["໐","໑","໒","໓","໔","໕","໖","໗","໘","໙",".",",",1,"+","-",[3,0]],
     "lt-LT" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "lv-LV" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "mg-MG" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "mi-NZ" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "mk-MK" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "ml-IN" : ["൦","൧","൨","൩","൪","൫","൬","൭","൮","൯",".",",",1,"+","-",[3,2]],
     "mn-MN" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "mn-Mong-CN" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3,0]],
     "mn-Mong-MN" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3,0]],
     "moh-CA" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "mr-IN" : ["०","१","२","३","४","५","६","७","८","९",".",",",1,"+","-",[3,2]],
     "ms-BN" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "ms-MY" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "mt-MT" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "my-MM" : ["၀","၁","၂","၃","၄","၅","၆","၇","၈","၉",".",",",1,"+","-",[3]],
     "nb-NO" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "ne-IN" : ["०","१","२","३","४","५","६","७","८","९",".",",",1,"+","-",[3]],
     "ne-NP" : ["०","१","२","३","४","५","६","७","८","९",".",",",1,"+","-",[3,2]],
     "nl-BE" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "nl-NL" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "nn-NO" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "nqo-GN" : ["߀","߁","߂","߃","߄","߅","߆","߇","߈","߉",".",",",3,"+","-",[3]],
     "nso-ZA" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "oc-FR" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "om-ET" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "or-IN" : ["୦","୧","୨","୩","୪","୫","୬","୭","୮","୯",".",",",1,"+","-",[3,2]],
     "pa-Arab-PK" : ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹",".",",",2,"+","-",[3]],
     "pa-IN" : ["੦","੧","੨","੩","੪","੫","੬","੭","੮","੯",".",",",1,"+","-",[3,2]],
     "pl-PL" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "prs-AF" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",",",".",3,"+","-",[3]],
     "ps-AF" : ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩",".",",",3,"+","-",[3]],
     "pt-AO" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "pt-BR" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "pt-PT" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "qut-GT" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "quz-BO" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "quz-EC" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "quz-PE" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "rm-CH" : ["0","1","2","3","4","5","6","7","8","9",".","'",1,"+","-",[3]],
     "ro-MD" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "ro-RO" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "ru-RU" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "rw-RW" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "sa-IN" : ["०","१","२","३","४","५","६","७","८","९",".",",",1,"+","-",[3,2]],
     "sah-RU" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3,0]],
     "sd-Arab-PK" : ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹",".",",",3,"+","-",[3]],
     "se-FI" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "se-NO" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "se-SE" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "si-LK" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3,2]],
     "sk-SK" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "sl-SI" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "sma-NO" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "sma-SE" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "smj-NO" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "smj-SE" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "smn-FI" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "sms-FI" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "sn-Latn-ZW" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "so-SO" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "sq-AL" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "sr-Cyrl-BA" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "sr-Cyrl-CS" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "sr-Cyrl-ME" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "sr-Cyrl-RS" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "sr-Latn-BA" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "sr-Latn-CS" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "sr-Latn-ME" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "sr-Latn-RS" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "st-ZA" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "sv-FI" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "sv-SE" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "sw-KE" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "syr-SY" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "ta-IN" : ["௦","௧","௨","௩","௪","௫","௬","௭","௮","௯",".",",",1,"+","-",[3,2]],
     "ta-LK" : ["௦","௧","௨","௩","௪","௫","௬","௭","௮","௯",".",",",1,"+","-",[3,2]],
     "te-IN" : ["౦","౧","౨","౩","౪","౫","౬","౭","౮","౯",".",",",1,"+","-",[3,2]],
     "tg-Cyrl-TJ" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "th-TH" : ["๐","๑","๒","๓","๔","๕","๖","๗","๘","๙",".",",",1,"+","-",[3]],
     "ti-ER" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3,0]],
     "ti-ET" : ["0","1","2","3","4","5","6","7","8","9",".",",",0,"+","-",[3]],
     "tk-TM" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "tn-BW" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "tn-ZA" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "tr-TR" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "ts-ZA" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "tt-RU" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "tzm-Latn-DZ" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "tzm-Tfng-MA" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "ug-CN" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "uk-UA" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "ur-IN" : ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹",".",",",1,"+","-",[3,2]],
     "ur-PK" : ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹",".",",",1,"+","-",[3]],
     "uz-Cyrl-UZ" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "uz-Latn-UZ" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "vi-VN" : ["0","1","2","3","4","5","6","7","8","9",",",".",1,"+","-",[3]],
     "wo-SN" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "xh-ZA" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "yo-NG" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "zgh-Tfng-MA" : ["0","1","2","3","4","5","6","7","8","9",","," ",1,"+","-",[3]],
     "zh-CN" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "zh-HK" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "zh-MO" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "zh-SG" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "zh-TW" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]],
     "zu-ZA" : ["0","1","2","3","4","5","6","7","8","9",".",",",1,"+","-",[3]]
}

var localePercentageInfo={
     "af-ZA" : ["%",","," ",1,1,[3]],
     "am-ET" : ["%",".",",",1,1,[3]],
     "ar-AE" : ["%",".",",",0,0,[3]],
     "ar-BH" : ["%",".",",",0,0,[3]],
     "ar-DZ" : ["%",".",",",0,0,[3]],
     "ar-EG" : ["%",".",",",0,0,[3]],
     "ar-IQ" : ["%",".",",",0,0,[3]],
     "ar-JO" : ["%",".",",",0,0,[3]],
     "ar-KW" : ["%",".",",",0,0,[3]],
     "ar-LB" : ["%",".",",",0,0,[3]],
     "ar-LY" : ["%",".",",",0,0,[3]],
     "ar-MA" : ["%",".",",",0,0,[3]],
     "ar-OM" : ["%",".",",",0,0,[3]],
     "ar-QA" : ["%",".",",",0,0,[3]],
     "ar-SA" : ["%",".",",",0,0,[3]],
     "ar-SY" : ["%",".",",",0,0,[3]],
     "ar-TN" : ["%",".",",",0,0,[3]],
     "ar-YE" : ["%",".",",",0,0,[3]],
     "arn-CL" : ["%",",",".",0,0,[3]],
     "as-IN" : ["%",".",",",1,1,[3,2]],
     "az-Cyrl-AZ" : ["%",","," ",1,1,[3]],
     "az-Latn-AZ" : ["%",","," ",1,1,[3]],
     "ba-RU" : ["%",","," ",1,1,[3]],
     "be-BY" : ["%",","," ",0,0,[3]],
     "bg-BG" : ["%",","," ",0,0,[3]],
     "bn-BD" : ["%",".",",",0,1,[3,2]],
     "bn-IN" : ["%",".",",",0,1,[3,2]],
     "bo-CN" : ["%",".",",",1,1,[3,0]],
     "br-FR" : ["%",","," ",0,0,[3]],
     "bs-Cyrl-BA" : ["%",",",".",0,0,[3]],
     "bs-Latn-BA" : ["%",",",".",0,0,[3]],
     "ca-ES" : ["%",",",".",1,1,[3]],
     "ca-ES-valencia" : ["%",",",".",1,1,[3]],
     "chr-Cher-US" : ["%",".",",",0,0,[3]],
     "co-FR" : ["%",","," ",0,0,[3]],
     "cs-CZ" : ["%",","," ",0,0,[3]],
     "cy-GB" : ["%",".",",",1,1,[3]],
     "da-DK" : ["%",",",".",0,0,[3]],
     "de-AT" : ["%",","," ",1,1,[3]],
     "de-CH" : ["%",","," ",1,1,[3]],
     "de-DE" : ["%",",",".",0,0,[3]],
     "de-LI" : ["%",",",".",1,1,[3]],
     "de-LU" : ["%",",",".",1,1,[3]],
     "dsb-DE" : ["%",",",".",0,0,[3]],
     "dv-MV" : ["%",".",",",0,0,[3]],
     "el-GR" : ["%",",",".",1,1,[3]],
     "en-029" : ["%",".",",",0,0,[3]],
     "en-AU" : ["%",".",",",1,1,[3]],
     "en-BZ" : ["%",".",",",0,0,[3]],
     "en-CA" : ["%",".",",",0,0,[3]],
     "en-GB" : ["%",".",",",1,1,[3]],
     "en-HK" : ["%",".",",",2,1,[3]],
     "en-IE" : ["%",".",",",1,1,[3]],
     "en-IN" : ["%",".",",",1,1,[3,2,0]],
     "en-JM" : ["%",".",",",0,0,[3]],
     "en-MY" : ["%",".",",",1,1,[3]],
     "en-NZ" : ["%",".",",",0,0,[3]],
     "en-PH" : ["%",".",",",0,0,[3]],
     "en-SG" : ["%",".",",",1,1,[3]],
     "en-TT" : ["%",".",",",0,0,[3]],
     "en-US" : ["%",".",",",0,0,[3]],
     "en-ZA" : ["%",","," ",1,1,[3]],
     "en-ZW" : ["%",".",",",1,1,[3]],
     "es-419" : ["%",".",",",2,1,[3]],
     "es-AR" : ["%",",",".",0,0,[3]],
     "es-BO" : ["%",",",".",0,0,[3]],
     "es-CL" : ["%",",",".",0,0,[3]],
     "es-CO" : ["%",",",".",1,1,[3]],
     "es-CR" : ["%",",",".",1,1,[3]],
     "es-DO" : ["%",".",",",1,1,[3]],
     "es-EC" : ["%",",",".",0,0,[3]],
     "es-ES" : ["%",",",".",0,0,[3]],
     "es-GT" : ["%",".",",",1,1,[3]],
     "es-HN" : ["%",".",",",1,1,[3]],
     "es-MX" : ["%",".",",",0,0,[3]],
     "es-NI" : ["%",".",",",1,1,[3]],
     "es-PA" : ["%",".",",",1,1,[3]],
     "es-PE" : ["%",".",",",0,0,[3]],
     "es-PR" : ["%",".",",",1,1,[3]],
     "es-PY" : ["%",",",".",0,0,[3]],
     "es-SV" : ["%",".",",",0,0,[3,3,0]],
     "es-US" : ["%",".",",",1,1,[3,0]],
     "es-UY" : ["%",",",".",0,0,[3]],
     "es-VE" : ["%",",",".",0,0,[3]],
     "et-EE" : ["%",","," ",1,1,[3]],
     "eu-ES" : ["%",",",".",3,10,[3]],
     "fa-IR" : ["%","/",",",0,0,[3]],
     "ff-Latn-SN" : ["%",","," ",0,0,[3]],
     "fi-FI" : ["%",","," ",0,0,[3]],
     "fil-PH" : ["%",".",",",0,0,[3]],
     "fo-FO" : ["%",",",".",1,1,[3]],
     "fr-BE" : ["%",",",".",0,0,[3]],
     "fr-CA" : ["%",","," ",0,0,[3]],
     "fr-CD" : ["%",","," ",2,1,[3]],
     "fr-CH" : ["%",","," ",1,1,[3]],
     "fr-CI" : ["%",","," ",2,1,[3]],
     "fr-CM" : ["%",","," ",2,1,[3]],
     "fr-FR" : ["%",","," ",0,0,[3]],
     "fr-HT" : ["%",","," ",2,1,[3]],
     "fr-LU" : ["%",","," ",0,0,[3]],
     "fr-MA" : ["%",","," ",2,1,[3]],
     "fr-MC" : ["%",","," ",1,1,[3]],
     "fr-ML" : ["%",","," ",2,1,[3]],
     "fr-RE" : ["%",","," ",2,1,[3]],
     "fr-SN" : ["%",","," ",2,1,[3]],
     "fy-NL" : ["%",",",".",0,0,[3]],
     "ga-IE" : ["%",".",",",1,1,[3]],
     "gd-GB" : ["%",".",",",0,0,[3]],
     "gl-ES" : ["%",",",".",0,0,[3]],
     "gn-PY" : ["%",",",".",0,0,[3]],
     "gsw-FR" : ["%",","," ",0,0,[3]],
     "gu-IN" : ["%",".",",",0,0,[3,2]],
     "ha-Latn-NG" : ["%",".",",",0,0,[3]],
     "haw-US" : ["%",".",",",0,0,[3]],
     "he-IL" : ["%",".",",",1,1,[3]],
     "hi-IN" : ["%",".",",",0,0,[3,2]],
     "hr-BA" : ["%",",",".",0,0,[3]],
     "hr-HR" : ["%",",",".",1,1,[3]],
     "hsb-DE" : ["%",",",".",0,0,[3]],
     "hu-HU" : ["%",","," ",1,1,[3]],
     "hy-AM" : ["%",".",",",0,0,[3]],
     "id-ID" : ["%",",",".",1,1,[3]],
     "ig-NG" : ["%",".",",",0,0,[3]],
     "ii-CN" : ["%",".",",",1,1,[3]],
     "is-IS" : ["%",",",".",1,1,[3]],
     "it-CH" : ["%",","," ",1,1,[3]],
     "it-IT" : ["%",",",".",1,1,[3]],
     "iu-Cans-CA" : ["%",".",",",1,1,[3]],
     "iu-Latn-CA" : ["%",".",",",0,0,[3]],
     "ja-JP" : ["%",".",",",1,1,[3]],
     "jv-Latn-ID" : ["%",",",".",1,1,[3]],
     "ka-GE" : ["%",","," ",0,0,[3]],
     "kk-KZ" : ["%",","," ",1,1,[3]],
     "kl-GL" : ["%",",",".",0,0,[3,0]],
     "km-KH" : ["%",".",",",1,1,[3,0]],
     "kn-IN" : ["%",".",",",0,0,[3,2]],
     "ko-KR" : ["%",".",",",0,0,[3]],
     "kok-IN" : ["%",".",",",0,0,[3,2]],
     "ku-Arab-IQ" : ["٪",".",",",2,2,[3]],
     "ky-KG" : ["%",","," ",1,1,[3]],
     "lb-LU" : ["%",","," ",0,0,[3,0]],
     "lo-LA" : ["%",".",",",0,0,[3,0]],
     "lt-LT" : ["%",","," ",0,0,[3]],
     "lv-LV" : ["%",","," ",1,1,[3]],
     "mg-MG" : ["%",".",",",2,1,[3]],
     "mi-NZ" : ["%",".",",",2,2,[3]],
     "mk-MK" : ["%",",",".",0,0,[3]],
     "ml-IN" : ["%",".",",",2,2,[3,2]],
     "mn-MN" : ["%",","," ",0,0,[3]],
     "mn-Mong-CN" : ["%",".",",",1,1,[3,0]],
     "mn-Mong-MN" : ["%",".",",",1,1,[3,0]],
     "moh-CA" : ["%",".",",",0,0,[3]],
     "mr-IN" : ["%",".",",",0,0,[3,2]],
     "ms-BN" : ["%",",",".",0,0,[3]],
     "ms-MY" : ["%",".",",",0,0,[3]],
     "mt-MT" : ["%",".",",",0,0,[3]],
     "my-MM" : ["%",".",",",1,1,[3]],
     "nb-NO" : ["%",","," ",0,0,[3]],
     "ne-IN" : ["%",".",",",2,1,[3]],
     "ne-NP" : ["%",".",",",1,1,[3,2]],
     "nl-BE" : ["%",","," ",1,1,[3]],
     "nl-NL" : ["%",",",".",0,0,[3]],
     "nn-NO" : ["%",","," ",0,0,[3]],
     "nqo-GN" : ["%",".",",",2,3,[3]],
     "nso-ZA" : ["%",".",",",2,2,[3]],
     "oc-FR" : ["%",","," ",1,1,[3]],
     "om-ET" : ["%",".",",",2,1,[3]],
     "or-IN" : ["%",".",",",0,0,[3,2]],
     "pa-Arab-PK" : ["%",".",",",3,9,[3]],
     "pa-IN" : ["%",".",",",0,0,[3,2]],
     "pl-PL" : ["%",","," ",1,1,[3]],
     "prs-AF" : ["%",",",".",2,4,[3]],
     "ps-AF" : ["%",".",",",2,4,[3]],
     "pt-AO" : ["%",",",".",2,1,[3]],
     "pt-BR" : ["%",",",".",1,1,[3]],
     "pt-PT" : ["%",","," ",1,1,[3]],
     "qut-GT" : ["%",".",",",0,0,[3]],
     "quz-BO" : ["%",",",".",2,2,[3]],
     "quz-EC" : ["%",",",".",1,1,[3]],
     "quz-PE" : ["%",".",",",0,0,[3]],
     "rm-CH" : ["%",".","'",1,1,[3]],
     "ro-MD" : ["%",",",".",2,1,[3]],
     "ro-RO" : ["%",",",".",1,1,[3]],
     "ru-RU" : ["%",","," ",1,1,[3]],
     "rw-RW" : ["%",","," ",0,0,[3]],
     "sa-IN" : ["%",".",",",0,0,[3,2]],
     "sah-RU" : ["%",","," ",1,1,[3,0]],
     "sd-Arab-PK" : ["%",".",",",3,0,[3]],
     "se-FI" : ["%",","," ",0,0,[3]],
     "se-NO" : ["%",","," ",2,2,[3]],
     "se-SE" : ["%",","," ",0,0,[3]],
     "si-LK" : ["%",".",",",0,0,[3,2]],
     "sk-SK" : ["%",","," ",0,0,[3]],
     "sl-SI" : ["%",",",".",0,0,[3]],
     "sma-NO" : ["%",","," ",2,2,[3]],
     "sma-SE" : ["%",","," ",0,0,[3]],
     "smj-NO" : ["%",","," ",2,2,[3]],
     "smj-SE" : ["%",","," ",0,0,[3]],
     "smn-FI" : ["%",","," ",0,0,[3]],
     "sms-FI" : ["%",","," ",0,0,[3]],
     "sn-Latn-ZW" : ["%",".",",",0,0,[3]],
     "so-SO" : ["%",".",",",2,1,[3]],
     "sq-AL" : ["%",",",".",0,0,[3]],
     "sr-Cyrl-BA" : ["%",",",".",1,1,[3]],
     "sr-Cyrl-CS" : ["%",",",".",1,1,[3]],
     "sr-Cyrl-ME" : ["%",",",".",1,1,[3]],
     "sr-Cyrl-RS" : ["%",",",".",1,1,[3]],
     "sr-Latn-BA" : ["%",",",".",1,1,[3]],
     "sr-Latn-CS" : ["%",",",".",1,1,[3]],
     "sr-Latn-ME" : ["%",",",".",1,1,[3]],
     "sr-Latn-RS" : ["%",",",".",1,1,[3]],
     "st-ZA" : ["%",","," ",2,1,[3]],
     "sv-FI" : ["%",","," ",0,0,[3]],
     "sv-SE" : ["%",","," ",0,0,[3]],
     "sw-KE" : ["%",".",",",0,0,[3]],
     "syr-SY" : ["%",".",",",0,0,[3]],
     "ta-IN" : ["%",".",",",0,0,[3,2]],
     "ta-LK" : ["%",".",",",1,1,[3,2]],
     "te-IN" : ["%",".",",",0,0,[3,2]],
     "tg-Cyrl-TJ" : ["%",","," ",1,1,[3]],
     "th-TH" : ["%",".",",",0,0,[3]],
     "ti-ER" : ["%",".",",",1,1,[3,0]],
     "ti-ET" : ["%",".",",",1,1,[3]],
     "tk-TM" : ["%",","," ",1,1,[3]],
     "tn-BW" : ["%",".",",",2,2,[3]],
     "tn-ZA" : ["%",".",",",2,2,[3]],
     "tr-TR" : ["%",",",".",2,2,[3]],
     "ts-ZA" : ["%",","," ",2,1,[3]],
     "tt-RU" : ["%",","," ",0,0,[3]],
     "tzm-Latn-DZ" : ["%",","," ",0,0,[3]],
     "tzm-Tfng-MA" : ["%",","," ",0,0,[3]],
     "ug-CN" : ["%",".",",",1,1,[3]],
     "uk-UA" : ["%",","," ",1,1,[3]],
     "ur-IN" : ["٪",".",",",2,1,[3,2]],
     "ur-PK" : ["%",".",",",0,0,[3]],
     "uz-Cyrl-UZ" : ["%",","," ",1,1,[3]],
     "uz-Latn-UZ" : ["%",","," ",1,1,[3]],
     "vi-VN" : ["%",",",".",0,0,[3]],
     "wo-SN" : ["%",","," ",0,0,[3]],
     "xh-ZA" : ["%",".",",",2,2,[3]],
     "yo-NG" : ["%",".",",",0,0,[3]],
     "zgh-Tfng-MA" : ["%",","," ",0,0,[3]],
     "zh-CN" : ["%",".",",",1,1,[3]],
     "zh-HK" : ["%",".",",",1,1,[3]],
     "zh-MO" : ["%",".",",",1,1,[3]],
     "zh-SG" : ["%",".",",",1,1,[3]],
     "zh-TW" : ["%",".",",",1,1,[3]],
     "zu-ZA" : ["%",".",",",2,2,[3]]
}

var localeCountryDialingCodes={
    "AD": "376",
    "AE": "971",
    "AF": "93",
    "AG": "1 268",
    "AI": "1 264",
    "AL": "355",
    "AM": "374",
    "AN": "599",
    "AO": "244",
    "AQ": "672",
    "AR": "54",
    "AS": "1 684",
    "AT": "43",
    "AU": "61",
    "AW": "297",
    "AZ": "994",
    "BA": "387",
    "BB": "1 246",
    "BD": "880",
    "BE": "32",
    "BF": "226",
    "BG": "359",
    "BH": "973",
    "BI": "257",
    "BJ": "229",
    "BL": "590",
    "BM": "1 441",
    "BN": "673",
    "BO": "591",
    "BR": "55",
    "BS": "1 242",
    "BT": "975",
    "BW": "267",
    "BY": "375",
    "BZ": "501",
    "CA": "1",
    "CC": "61",
    "CD": "243",
    "CF": "236",
    "CG": "242",
    "CH": "41",
    "CI": "225",
    "CK": "682",
    "CL": "56",
    "CM": "237",
    "CN": "86",
    "CO": "57",
    "CR": "506",
    "CU": "53",
    "CV": "238",
    "CX": "61",
    "CY": "357",
    "CZ": "420",
    "DE": "49",
    "DJ": "253",
    "DK": "45",
    "DM": "1 767",
    "DO": "1 809",
    "DZ": "213",
    "EC": "593",
    "EE": "372",
    "EG": "20",
    "ER": "291",
    "ES": "34",
    "ET": "251",
    "FI": "358",
    "FJ": "679",
    "FK": "500",
    "FM": "691",
    "FO": "298",
    "FR": "33",
    "GA": "241",
    "GB": "44",
    "GD": "1 473",
    "GE": "995",
    "GH": "233",
    "GI": "350",
    "GL": "299",
    "GM": "220",
    "GN": "224",
    "GQ": "240",
    "GR": "30",
    "GT": "502",
    "GU": "1 671",
    "GW": "245",
    "GY": "592",
    "HK": "852",
    "HN": "504",
    "HR": "385",
    "HT": "509",
    "HU": "36",
    "ID": "62",
    "IE": "353",
    "IL": "972",
    "IM": "44",
    "IN": "91",
    "IQ": "964",
    "IR": "98",
    "IS": "354",
    "IT": "39",
    "JM": "1 876",
    "JO": "962",
    "JP": "81",
    "KE": "254",
    "KG": "996",
    "KH": "855",
    "KI": "686",
    "KM": "269",
    "KN": "1 869",
    "KP": "850",
    "KR": "82",
    "KW": "965",
    "KY": "1 345",
    "KZ": "7",
    "LA": "856",
    "LB": "961",
    "LC": "1 758",
    "LI": "423",
    "LK": "94",
    "LR": "231",
    "LS": "266",
    "LT": "370",
    "LU": "352",
    "LV": "371",
    "LY": "218",
    "MA": "212",
    "MC": "377",
    "MD": "373",
    "ME": "382",
    "MF": "1 599",
    "MG": "261",
    "MH": "692",
    "MK": "389",
    "ML": "223",
    "MM": "95",
    "MN": "976",
    "MO": "853",
    "MP": "1 670",
    "MR": "222",
    "MS": "1 664",
    "MT": "356",
    "MU": "230",
    "MV": "960",
    "MW": "265",
    "MX": "52",
    "MY": "60",
    "MZ": "258",
    "NA": "264",
    "NC": "687",
    "NE": "227",
    "NG": "234",
    "NI": "505",
    "NL": "31",
    "NO": "47",
    "NP": "977",
    "NR": "674",
    "NU": "683",
    "NZ": "64",
    "OM": "968",
    "PA": "507",
    "PE": "51",
    "PF": "689",
    "PG": "675",
    "PH": "63",
    "PK": "92",
    "PL": "48",
    "PM": "508",
    "PN": "870",
    "PR": "1",
    "PT": "351",
    "PW": "680",
    "PY": "595",
    "QA": "974",
    "RO": "40",
    "RS": "381",
    "RU": "7",
    "RW": "250",
    "SA": "966",
    "SB": "677",
    "SC": "248",
    "SD": "249",
    "SE": "46",
    "SG": "65",
    "SH": "290",
    "SI": "386",
    "SK": "421",
    "SL": "232",
    "SM": "378",
    "SN": "221",
    "SO": "252",
    "SR": "597",
    "ST": "239",
    "SV": "503",
    "SY": "963",
    "SZ": "268",
    "TC": "1 649",
    "TD": "235",
    "TG": "228",
    "TH": "66",
    "TJ": "992",
    "TK": "690",
    "TL": "670",
    "TM": "993",
    "TN": "216",
    "TO": "676",
    "TR": "90",
    "TT": "1 868",
    "TV": "688",
    "TW": "886",
    "TZ": "255",
    "UA": "380",
    "UG": "256",
    "US": "1",
    "UY": "598",
    "UZ": "998",
    "VA": "39",
    "VC": "1 784",
    "VE": "58",
    "VG": "1 284",
    "VI": "1 340",
    "VN": "84",
    "VU": "678",
    "WF": "681",
    "WS": "685",
    "YE": "967",
    "YT": "262",
    "ZA": "27",
    "ZM": "260",
    "ZW": "263"
}

var localeDialingCodeCountries={
    "1": "CA",
    "1": "PR",
    "1": "US",
    "1 242": "BS",
    "1 246": "BB",
    "1 264": "AI",
    "1 268": "AG",
    "1 284": "VG",
    "1 340": "VI",
    "1 345": "KY",
    "1 441": "BM",
    "1 473": "GD",
    "1 599": "MF",
    "1 649": "TC",
    "1 664": "MS",
    "1 670": "MP",
    "1 671": "GU",
    "1 684": "AS",
    "1 758": "LC",
    "1 767": "DM",
    "1 784": "VC",
    "1 809": "DO",
    "1 868": "TT",
    "1 869": "KN",
    "1 876": "JM",
    "20": "EG",
    "212": "MA",
    "213": "DZ",
    "216": "TN",
    "218": "LY",
    "220": "GM",
    "221": "SN",
    "222": "MR",
    "223": "ML",
    "224": "GN",
    "225": "CI",
    "226": "BF",
    "227": "NE",
    "228": "TG",
    "229": "BJ",
    "230": "MU",
    "231": "LR",
    "232": "SL",
    "233": "GH",
    "234": "NG",
    "235": "TD",
    "236": "CF",
    "237": "CM",
    "238": "CV",
    "239": "ST",
    "240": "GQ",
    "241": "GA",
    "242": "CG",
    "243": "CD",
    "244": "AO",
    "245": "GW",
    "248": "SC",
    "249": "SD",
    "250": "RW",
    "251": "ET",
    "252": "SO",
    "253": "DJ",
    "254": "KE",
    "255": "TZ",
    "256": "UG",
    "257": "BI",
    "258": "MZ",
    "260": "ZM",
    "261": "MG",
    "262": "YT",
    "263": "ZW",
    "264": "NA",
    "265": "MW",
    "266": "LS",
    "267": "BW",
    "268": "SZ",
    "269": "KM",
    "27": "ZA",
    "290": "SH",
    "291": "ER",
    "297": "AW",
    "298": "FO",
    "299": "GL",
    "30": "GR",
    "31": "NL",
    "32": "BE",
    "33": "FR",
    "34": "ES",
    "350": "GI",
    "351": "PT",
    "352": "LU",
    "353": "IE",
    "354": "IS",
    "355": "AL",
    "356": "MT",
    "357": "CY",
    "358": "FI",
    "359": "BG",
    "36": "HU",
    "370": "LT",
    "371": "LV",
    "372": "EE",
    "373": "MD",
    "374": "AM",
    "375": "BY",
    "376": "AD",
    "377": "MC",
    "378": "SM",
    "380": "UA",
    "381": "RS",
    "382": "ME",
    "385": "HR",
    "386": "SI",
    "387": "BA",
    "389": "MK",
    "39": "IT",
    "39": "VA",
    "40": "RO",
    "41": "CH",
    "420": "CZ",
    "421": "SK",
    "423": "LI",
    "43": "AT",
    "44": "IM",
    "44": "GB",
    "45": "DK",
    "46": "SE",
    "47": "NO",
    "48": "PL",
    "49": "DE",
    "500": "FK",
    "501": "BZ",
    "502": "GT",
    "503": "SV",
    "504": "HN",
    "505": "NI",
    "506": "CR",
    "507": "PA",
    "508": "PM",
    "509": "HT",
    "51": "PE",
    "52": "MX",
    "53": "CU",
    "54": "AR",
    "55": "BR",
    "56": "CL",
    "57": "CO",
    "58": "VE",
    "590": "BL",
    "591": "BO",
    "592": "GY",
    "593": "EC",
    "595": "PY",
    "597": "SR",
    "598": "UY",
    "599": "AN",
    "60": "MY",
    "61": "AU",
    "61": "CX",
    "61": "CC",
    "62": "ID",
    "63": "PH",
    "64": "NZ",
    "65": "SG",
    "66": "TH",
    "670": "TL",
    "672": "AQ",
    "673": "BN",
    "674": "NR",
    "675": "PG",
    "676": "TO",
    "677": "SB",
    "678": "VU",
    "679": "FJ",
    "680": "PW",
    "681": "WF",
    "682": "CK",
    "683": "NU",
    "685": "WS",
    "686": "KI",
    "687": "NC",
    "688": "TV",
    "689": "PF",
    "690": "TK",
    "691": "FM",
    "692": "MH",
    "7": "KZ",
    "7": "RU",
    "81": "JP",
    "82": "KR",
    "84": "VN",
    "850": "KP",
    "852": "HK",
    "853": "MO",
    "855": "KH",
    "856": "LA",
    "86": "CN",
    "870": "PN",
    "880": "BD",
    "886": "TW",
    "90": "TR",
    "91": "IN",
    "92": "PK",
    "93": "AF",
    "94": "LK",
    "95": "MM",
    "960": "MV",
    "961": "LB",
    "962": "JO",
    "963": "SY",
    "964": "IQ",
    "965": "KW",
    "966": "SA",
    "967": "YE",
    "968": "OM",
    "971": "AE",
    "972": "IL",
    "973": "BH",
    "974": "QA",
    "975": "BT",
    "976": "MN",
    "977": "NP",
    "98": "IR",
    "992": "TJ",
    "993": "TM",
    "994": "AZ",
    "995": "GE",
    "996": "KG",
    "998": "UZ"
}

var localeTimeZones={
    "Dateline Standard Time" : ["(UTC-12:00) International Date Line West","Dateline Summer Time",-720],
    "UTC-11" : ["(UTC-11:00) Co-ordinated Universal Time-11","UTC-11",-660],
    "Hawaiian Standard Time" : ["(UTC-10:00) Hawaii","Hawaiian Summer Time",-600],
    "Alaskan Standard Time" : ["(UTC-09:00) Alaska","Alaskan Summer Time",-540],
    "Pacific Standard Time (Mexico)" : ["(UTC-08:00) Baja California","Pacific Summer Time (Mexico)",-480],
    "Pacific Standard Time" : ["(UTC-08:00) Pacific Time (US & Canada)","Pacific Summer Time",-480],
    "US Mountain Standard Time" : ["(UTC-07:00) Arizona","US Mountain Summer Time",-420],
    "Mountain Standard Time (Mexico)" : ["(UTC-07:00) Chihuahua, La Paz, Mazatlan","Mountain Summer Time (Mexico)",-420],
    "Mountain Standard Time" : ["(UTC-07:00) Mountain Time (US & Canada)","Mountain Summer Time",-420],
    "Central America Standard Time" : ["(UTC-06:00) Central America","Central America Summer Time",-360],
    "Central Standard Time" : ["(UTC-06:00) Central Time (US & Canada)","Central Summer Time",-360],
    "Central Standard Time (Mexico)" : ["(UTC-06:00) Guadalajara, Mexico City, Monterrey","Central Summer Time (Mexico)",-360],
    "Canada Central Standard Time" : ["(UTC-06:00) Saskatchewan","Canada Central Summer Time",-360],
    "SA Pacific Standard Time" : ["(UTC-05:00) Bogota, Lima, Quito, Rio Branco","SA Pacific Summer Time",-300],
    "Eastern Standard Time" : ["(UTC-05:00) Eastern Time (US & Canada)","Eastern Summer Time",-300],
    "US Eastern Standard Time" : ["(UTC-05:00) Indiana (East)","US Eastern Summer Time",-300],
    "Venezuela Standard Time" : ["(UTC-04:30) Caracas","Venezuela Summer Time",-270],
    "Paraguay Standard Time" : ["(UTC-04:00) Asuncion","Paraguay Summer Time",-240],
    "Atlantic Standard Time" : ["(UTC-04:00) Atlantic Time (Canada)","Atlantic Summer Time",-240],
    "Central Brazilian Standard Time" : ["(UTC-04:00) Cuiaba","Central Brazilian Summer Time",-240],
    "SA Western Standard Time" : ["(UTC-04:00) Georgetown, La Paz, Manaus, San Juan","SA Western Summer Time",-240],
    "Pacific SA Standard Time" : ["(UTC-04:00) Santiago","Pacific SA Summer Time",-240],
    "Newfoundland Standard Time" : ["(UTC-03:30) Newfoundland","Newfoundland Summer Time",-210],
    "E. South America Standard Time" : ["(UTC-03:00) Brasilia","E. South America Summer Time",-180],
    "Argentina Standard Time" : ["(UTC-03:00) Buenos Aires","Argentina Summer Time",-180],
    "SA Eastern Standard Time" : ["(UTC-03:00) Cayenne, Fortaleza","SA Eastern Summer Time",-180],
    "Greenland Standard Time" : ["(UTC-03:00) Greenland","Greenland Summer Time",-180],
    "Montevideo Standard Time" : ["(UTC-03:00) Montevideo","Montevideo Summer Time",-180],
    "Bahia Standard Time" : ["(UTC-03:00) Salvador","Bahia Summer Time",-180],
    "UTC-02" : ["(UTC-02:00) Co-ordinated Universal Time-02","UTC-02",-120],
    "Mid-Atlantic Standard Time" : ["(UTC-02:00) Mid-Atlantic - Old","Mid-Atlantic Summer Time",-120],
    "Azores Standard Time" : ["(UTC-01:00) Azores","Azores SummerTime",-60],
    "Cape Verde Standard Time" : ["(UTC-01:00) Cape Verde Is.","Cape Verde Summer Time",-60],
    "Morocco Standard Time" : ["(UTC) Casablanca","Morocco Summer Time",0],
    "Co-ordinated Universal Time" : ["(UTC) Co-ordinated Universal Time","Co-ordinated Universal Time",0],
    "GMT Standard Time" : ["(UTC) Dublin, Edinburgh, Lisbon, London","GMT Summer Time",0],
    "Zulu Time" : ["(UTC) Zulu Time (Coordinated Universal Time)", "Zulu Time",0],
    "Greenwich Standard Time" : ["(UTC) Monrovia, Reykjavik","Greenwich Summer Time",0],
    "W. Europe Standard Time" : ["(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna","W. Europe Summer Time",60],
    "Central Europe Standard Time" : ["(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague","Central Europe Summer Time",60],
    "Romance Standard Time" : ["(UTC+01:00) Brussels, Copenhagen, Madrid, Paris","Romance Summer Time",60],
    "Central European Standard Time" : ["(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb","Central European Summer Time",60],
    "W. Central Africa Standard Time" : ["(UTC+01:00) West Central Africa","W. Central Africa Summer Time",60],
    "Namibia Standard Time" : ["(UTC+01:00) Windhoek","Namibia Summer Time",60],
    "Jordan Standard Time" : ["(UTC+02:00) Amman","Jordan Summer Time",120],
    "GTB Standard Time" : ["(UTC+02:00) Athens, Bucharest","GTB Summer Time",120],
    "Middle East Standard Time" : ["(UTC+02:00) Beirut","Middle East Summer Time",120],
    "Egypt Standard Time" : ["(UTC+02:00) Cairo","Egypt Summer Time",120],
    "Syria Standard Time" : ["(UTC+02:00) Damascus","Syria Summer Time",120],
    "E. Europe Standard Time" : ["(UTC+02:00) E. Europe","E. Europe Summer Time",120],
    "South Africa Standard Time" : ["(UTC+02:00) Harare, Pretoria","South Africa Summer Time",120],
    "FLE Standard Time" : ["(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius","FLE Summer Time",120],
    "Turkey Standard Time" : ["(UTC+02:00) Istanbul","Turkey Summer Time",120],
    "Jerusalem Standard Time" : ["(UTC+02:00) Jerusalem","Jerusalem Summer Time",120],
    "Libya Standard Time" : ["(UTC+02:00) Tripoli","Libya Summer Time",120],
    "Arabic Standard Time" : ["(UTC+03:00) Baghdad","Arabic Summer Time",180],
    "Kaliningrad Standard Time" : ["(UTC+03:00) Kaliningrad, Minsk","Kaliningrad Summer Time",180],
    "Arab Standard Time" : ["(UTC+03:00) Kuwait, Riyadh","Arab Summer Time",180],
    "E. Africa Standard Time" : ["(UTC+03:00) Nairobi","E. Africa Summer Time",180],
    "Iran Standard Time" : ["(UTC+03:30) Tehran","Iran Summer Time",210],
    "Arabian Standard Time" : ["(UTC+04:00) Abu Dhabi, Muscat","Arabian Summer Time",240],
    "Azerbaijan Standard Time" : ["(UTC+04:00) Baku","Azerbaijan Summer Time",240],
    "Russian Standard Time" : ["(UTC+04:00) Moscow, St. Petersburg, Volgograd","Russian Summer Time",240],
    "Mauritius Standard Time" : ["(UTC+04:00) Port Louis","Mauritius Summer Time",240],
    "Georgian Standard Time" : ["(UTC+04:00) Tbilisi","Georgian Summer Time",240],
    "Caucasus Standard Time" : ["(UTC+04:00) Yerevan","Caucasus Summer Time",240],
    "Afghanistan Standard Time" : ["(UTC+04:30) Kabul","Afghanistan Summer Time",270],
    "West Asia Standard Time" : ["(UTC+05:00) Ashgabat, Tashkent","West Asia Summer Time",300],
    "Pakistan Standard Time" : ["(UTC+05:00) Islamabad, Karachi","Pakistan Summer Time",300],
    "India Standard Time" : ["(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi","India Summer Time",330],
    "Sri Lanka Standard Time" : ["(UTC+05:30) Sri Jayawardenepura","Sri Lanka Summer Time",330],
    "Nepal Standard Time" : ["(UTC+05:45) Kathmandu","Nepal Summer Time",345],
    "Central Asia Standard Time" : ["(UTC+06:00) Astana","Central Asia Summer Time",360],
    "Bangladesh Standard Time" : ["(UTC+06:00) Dhaka","Bangladesh Summer Time",360],
    "Ekaterinburg Standard Time" : ["(UTC+06:00) Ekaterinburg","Ekaterinburg Summer Time",360],
    "Myanmar Standard Time" : ["(UTC+06:30) Yangon (Rangoon)","Myanmar Summer Time",390],
    "SE Asia Standard Time" : ["(UTC+07:00) Bangkok, Hanoi, Jakarta","SE Asia Summer Time",420],
    "N. Central Asia Standard Time" : ["(UTC+07:00) Novosibirsk","N. Central Asia Summer Time",420],
    "China Standard Time" : ["(UTC+08:00) Beijing, Chongqing, Hong Kong SAR, Urumqi","China Summer Time",480],
    "North Asia Standard Time" : ["(UTC+08:00) Krasnoyarsk","North Asia Summer Time",480],
    "Malay Peninsula Standard Time" : ["(UTC+08:00) Kuala Lumpur, Singapore","Malay Peninsula Summer Time",480],
    "W. Australia Standard Time" : ["(UTC+08:00) Perth","W. Australia Summer Time",480],
    "Taipei Standard Time" : ["(UTC+08:00) Taipei","Taipei Summer Time",480],
    "Ulaanbaatar Standard Time" : ["(UTC+08:00) Ulaanbaatar","Ulaanbaatar Summer Time",480],
    "North Asia East Standard Time" : ["(UTC+09:00) Irkutsk","North Asia East Summer Time",540],
    "Tokyo Standard Time" : ["(UTC+09:00) Osaka, Sapporo, Tokyo","Tokyo Summer Time",540],
    "Korea Standard Time" : ["(UTC+09:00) Seoul","Korea Summer Time",540],
    "Cen. Australia Standard Time" : ["(UTC+09:30) Adelaide","Cen. Australia Summer Time",570],
    "AUS Central Standard Time" : ["(UTC+09:30) Darwin","AUS Central Summer Time",570],
    "E. Australia Standard Time" : ["(UTC+10:00) Brisbane","E. Australia Summer Time",600],
    "AUS Eastern Standard Time" : ["(UTC+10:00) Canberra, Melbourne, Sydney","AUS Eastern Summer Time",600],
    "West Pacific Standard Time" : ["(UTC+10:00) Guam, Port Moresby","West Pacific Summer Time",600],
    "Tasmania Standard Time" : ["(UTC+10:00) Hobart","Tasmania Summer Time",600],
    "Yakutsk Standard Time" : ["(UTC+10:00) Yakutsk","Yakutsk Summer Time",600],
    "Central Pacific Standard Time" : ["(UTC+11:00) Solomon Is., New Caledonia","Central Pacific Summer Time",660],
    "Vladivostok Standard Time" : ["(UTC+11:00) Vladivostok","Vladivostok Summer Time",660],
    "New Zealand Standard Time" : ["(UTC+12:00) Auckland, Wellington","New Zealand Summer Time",720],
    "UTC+12" : ["(UTC+12:00) Co-ordinated Universal Time+12","UTC+12",720],
    "Fiji Standard Time" : ["(UTC+12:00) Fiji","Fiji Summer Time",720],
    "Magadan Standard Time" : ["(UTC+12:00) Magadan","Magadan Summer Time",720],
    "Kamchatka Standard Time" : ["(UTC+12:00) Petropavlovsk-Kamchatsky - Old","Kamchatka Summer Time",720],
    "Tonga Standard Time" : ["(UTC+13:00) Nuku'alofa","Tonga Summer Time",780],
    "Samoa Standard Time" : ["(UTC+13:00) Samoa","Samoa Summer Time",780],
    "Line Islands Standard Time" : ["(UTC+14:00) Kiritimati Island","Line Islands Daylight Time",840]
}

/*********************************************************************************
/
/ The following are numeric patterns used in locale formatting
/
/*********************************************************************************/

var localePositiveCurrencyPatterns={
    0 : "$n",
    1 : "n$",
    2 : "$ n",
    3 : "n $"
}

var localeNegativeCurrencyPatterns={
    0 : "($n)",
    1 : "-$n",
    2 : "$-n",
    3 : "$n-",
    4 : "(n$)",
    5 : "-n$",
    6 : "n-$",
    7 : "n$-",
    8 : "-n $",
    9 : "-$ n",
    10 : "n $-",
    11 : "$ n-",
    12 : "$ -n",
    13 : "n- $",
    14 : "($ n)",
    15 : "(n $)"
}

var localeNegativeNumberPatterns={
    0 : "(n)",
    1 : "-n",
    2 : "- n",
    3 : "n-",
    4 : "n -"
}

var localePositivePercentPatterns={
    0 : "n %",
    1 : "n%",
    2 : "%n",
    3 : "% n"
}

var localeNegativePercentPatterns={
    0 : "-n %",
    1 : "-n%",
    2 : "-%n",
    3 : "%-n",
    4 : "%n-",
    5 : "n-%",
    6 : "n%-",
    7 : "-% n",
    8 : "n %-",
    9 : "% n-",
    10 : "% -n",
    11 : "n- %"
}


// Keep this as last statement:

var localeLibLoaded = true;