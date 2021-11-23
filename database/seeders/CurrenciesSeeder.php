<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrenciesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('currencies')->truncate();
        DB::table('currencies')->insert([
            ['currency_id' =>'KRW', 'currency_name' => '(South) Korean Won'],
            ['currency_id' =>'AFA', 'currency_name' => 'Afghanistan Afghani'],
            ['currency_id' =>'ALL', 'currency_name' => 'Albanian Lek'],
            ['currency_id' =>'DZD', 'currency_name' => 'Algerian Dinar'],
            ['currency_id' =>'ADP', 'currency_name' => 'Andorran Peseta'],
            ['currency_id' =>'AOK', 'currency_name' => 'Angolan Kwanza'],
            ['currency_id' =>'ARS', 'currency_name' => 'Argentine Peso'],
            ['currency_id' =>'AMD', 'currency_name' => 'Armenian Dram'],
            ['currency_id' =>'AWG', 'currency_name' => 'Aruban Florin'],
            ['currency_id' =>'AUD', 'currency_name' => 'Australian Dollar'],
            ['currency_id' =>'BSD', 'currency_name' => 'Bahamian Dollar'],
            ['currency_id' =>'BHD', 'currency_name' => 'Bahraini Dinar'],
            ['currency_id' =>'BDT', 'currency_name' => 'Bangladeshi Taka'],
            ['currency_id' =>'BBD', 'currency_name' => 'Barbados Dollar'],
            ['currency_id' =>'BZD', 'currency_name' => 'Belize Dollar'],
            ['currency_id' =>'BMD', 'currency_name' => 'Bermudian Dollar'],
            ['currency_id' =>'BTN', 'currency_name' => 'Bhutan Ngultrum'],
            ['currency_id' =>'BOB', 'currency_name' => 'Bolivian Boliviano'],
            ['currency_id' =>'BWP', 'currency_name' => 'Botswanian Pula'],
            ['currency_id' =>'BRL', 'currency_name' => 'Brazilian Real'],
            ['currency_id' =>'GBP', 'currency_name' => 'British Pound'],
            ['currency_id' =>'BND', 'currency_name' => 'Brunei Dollar'],
            ['currency_id' =>'BGN', 'currency_name' => 'Bulgarian Lev'],
            ['currency_id' =>'BUK', 'currency_name' => 'Burma Kyat'],
            ['currency_id' =>'BIF', 'currency_name' => 'Burundi Franc'],
            ['currency_id' =>'CAD', 'currency_name' => 'Canadian Dollar'],
            ['currency_id' =>'CVE', 'currency_name' => 'Cape Verde Escudo'],
            ['currency_id' =>'KYD', 'currency_name' => 'Cayman Islands Dollar'],
            ['currency_id' =>'CLP', 'currency_name' => 'Chilean Peso'],
            ['currency_id' =>'CLF', 'currency_name' => 'Chilean Unidades de Fomento'],
            ['currency_id' =>'COP', 'currency_name' => 'Colombian Peso'],
            ['currency_id' =>'XOF', 'currency_name' => 'Communauté Financière Africaine BCEAO - Francs'],
            ['currency_id' =>'XAF', 'currency_name' => 'Communauté Financière Africaine BEAC, Francs'],
            ['currency_id' =>'KMF', 'currency_name' => 'Comoros Franc'],
            ['currency_id' =>'XPF', 'currency_name' => 'Comptoirs Français du Pacifique Francs'],
            ['currency_id' =>'CRC', 'currency_name' => 'Costa Rican Colon'],
            ['currency_id' =>'CUP', 'currency_name' => 'Cuban Peso'],
            ['currency_id' =>'CYP', 'currency_name' => 'Cyprus Pound'],
            ['currency_id' =>'CZK', 'currency_name' => 'Czech Republic Koruna'],
            ['currency_id' =>'DKK', 'currency_name' => 'Danish Krone'],
            ['currency_id' =>'YDD', 'currency_name' => 'Democratic Yemeni Dinar'],
            ['currency_id' =>'DOP', 'currency_name' => 'Dominican Peso'],
            ['currency_id' =>'XCD', 'currency_name' => 'East Caribbean Dollar'],
            ['currency_id' =>'TPE', 'currency_name' => 'East Timor Escudo'],
            ['currency_id' =>'ECS', 'currency_name' => 'Ecuador Sucre'],
            ['currency_id' =>'EGP', 'currency_name' => 'Egyptian Pound'],
            ['currency_id' =>'SVC', 'currency_name' => 'El Salvador Colon'],
            ['currency_id' =>'EEK', 'currency_name' => 'Estonian Kroon (EEK)'],
            ['currency_id' =>'ETB', 'currency_name' => 'Ethiopian Birr'],
            ['currency_id' =>'EUR', 'currency_name' => 'Euro'],
            ['currency_id' =>'FKP', 'currency_name' => 'Falkland Islands Pound'],
            ['currency_id' =>'FJD', 'currency_name' => 'Fiji Dollar'],
            ['currency_id' =>'GMD', 'currency_name' => 'Gambian Dalasi'],
            ['currency_id' =>'GHC', 'currency_name' => 'Ghanaian Cedi'],
            ['currency_id' =>'GIP', 'currency_name' => 'Gibraltar Pound'],
            ['currency_id' =>'XAU', 'currency_name' => 'Gold, Ounces'],
            ['currency_id' =>'GTQ', 'currency_name' => 'Guatemalan Quetzal'],
            ['currency_id' =>'GNF', 'currency_name' => 'Guinea Franc'],
            ['currency_id' =>'GWP', 'currency_name' => 'Guinea-Bissau Peso'],
            ['currency_id' =>'GYD', 'currency_name' => 'Guyanan Dollar'],
            ['currency_id' =>'HTG', 'currency_name' => 'Haitian Gourde'],
            ['currency_id' =>'HNL', 'currency_name' => 'Honduran Lempira'],
            ['currency_id' =>'HKD', 'currency_name' => 'Hong Kong Dollar'],
            ['currency_id' =>'HUF', 'currency_name' => 'Hungarian Forint'],
            ['currency_id' =>'INR', 'currency_name' => 'Indian Rupee'],
            ['currency_id' =>'IDR', 'currency_name' => 'Indonesian Rupiah'],
            ['currency_id' =>'XDR', 'currency_name' => 'International Monetary Fund (IMF Special Drawing Rights)'],
            ['currency_id' =>'IRR', 'currency_name' => 'Iranian Rial'],
            ['currency_id' =>'IQD', 'currency_name' => 'Iraqi Dinar'],
            ['currency_id' =>'IEP', 'currency_name' => 'Irish Punt'],
            ['currency_id' =>'ILS', 'currency_name' => 'Israeli Shekel'],
            ['currency_id' =>'JMD', 'currency_name' => 'Jamaican Dollar'],
            ['currency_id' =>'JPY', 'currency_name' => 'Japanese Yen'],
            ['currency_id' =>'JOD', 'currency_name' => 'Jordanian Dinar'],
            ['currency_id' =>'KHR', 'currency_name' => 'Kampuchean (Cambodian Riel)'],
            ['currency_id' =>'KES', 'currency_name' => 'Kenyan Schilling'],
            ['currency_id' =>'KWD', 'currency_name' => 'Kuwaiti Dinar'],
            ['currency_id' =>'LAK', 'currency_name' => 'Lao Kip'],
            ['currency_id' =>'LBP', 'currency_name' => 'Lebanese Pound'],
            ['currency_id' =>'LSL', 'currency_name' => 'Lesotho Loti'],
            ['currency_id' =>'LRD', 'currency_name' => 'Liberian Dollar'],
            ['currency_id' =>'LYD', 'currency_name' => 'Libyan Dinar'],
            ['currency_id' =>'MOP', 'currency_name' => 'Macau Pataca'],
            ['currency_id' =>'MGF', 'currency_name' => 'Malagasy Franc'],
            ['currency_id' =>'MWK', 'currency_name' => 'Malawi Kwacha'],
            ['currency_id' =>'MYR', 'currency_name' => 'Malaysian Ringgit'],
            ['currency_id' =>'MVR', 'currency_name' => 'Maldive Rufiyaa'],
            ['currency_id' =>'MTL', 'currency_name' => 'Maltese Lira'],
            ['currency_id' =>'MRO', 'currency_name' => 'Mauritanian Ouguiya'],
            ['currency_id' =>'MUR', 'currency_name' => 'Mauritius Rupee'],
            ['currency_id' =>'MXP', 'currency_name' => 'Mexican Peso'],
            ['currency_id' =>'MNT', 'currency_name' => 'Mongolian Tugrik'],
            ['currency_id' =>'MAD', 'currency_name' => 'Moroccan Dirham'],
            ['currency_id' =>'MZM', 'currency_name' => 'Mozambique Metical'],
            ['currency_id' =>'NAD', 'currency_name' => 'Namibian Dollar'],
            ['currency_id' =>'NPR', 'currency_name' => 'Nepalese Rupee'],
            ['currency_id' =>'ANG', 'currency_name' => 'Netherlands Antillian Guilder'],
            ['currency_id' =>'YUD', 'currency_name' => 'New Yugoslavia Dinar'],
            ['currency_id' =>'NZD', 'currency_name' => 'New Zealand Dollar'],
            ['currency_id' =>'NIO', 'currency_name' => 'Nicaraguan Cordoba'],
            ['currency_id' =>'NGN', 'currency_name' => 'Nigerian Naira'],
            ['currency_id' =>'KPW', 'currency_name' => 'North Korean Won'],
            ['currency_id' =>'NOK', 'currency_name' => 'Norwegian Kroner'],
            ['currency_id' =>'OMR', 'currency_name' => 'Omani Rial'],
            ['currency_id' =>'PKR', 'currency_name' => 'Pakistan Rupee'],
            ['currency_id' =>'XPD', 'currency_name' => 'Palladium Ounces'],
            ['currency_id' =>'PAB', 'currency_name' => 'Panamanian Balboa'],
            ['currency_id' =>'PGK', 'currency_name' => 'Papua New Guinea Kina'],
            ['currency_id' =>'PYG', 'currency_name' => 'Paraguay Guarani'],
            ['currency_id' =>'PEN', 'currency_name' => 'Peruvian Nuevo Sol'],
            ['currency_id' =>'PHP', 'currency_name' => 'Philippine Peso'],
            ['currency_id' =>'XPT', 'currency_name' => 'Platinum, Ounces'],
            ['currency_id' =>'PLN', 'currency_name' => 'Polish Zloty'],
            ['currency_id' =>'QAR', 'currency_name' => 'Qatari Rial'],
            ['currency_id' =>'RON', 'currency_name' => 'Romanian Leu'],
            ['currency_id' =>'RUB', 'currency_name' => 'Russian Ruble'],
            ['currency_id' =>'RWF', 'currency_name' => 'Rwanda Franc'],
            ['currency_id' =>'WST', 'currency_name' => 'Samoan Tala'],
            ['currency_id' =>'STD', 'currency_name' => 'Sao Tome and Principe Dobra'],
            ['currency_id' =>'SAR', 'currency_name' => 'Saudi Arabian Riyal'],
            ['currency_id' =>'SCR', 'currency_name' => 'Seychelles Rupee'],
            ['currency_id' =>'SLL', 'currency_name' => 'Sierra Leone Leone'],
            ['currency_id' =>'XAG', 'currency_name' => 'Silver, Ounces'],
            ['currency_id' =>'SGD', 'currency_name' => 'Singapore Dollar'],
            ['currency_id' =>'SKK', 'currency_name' => 'Slovak Koruna'],
            ['currency_id' =>'SBD', 'currency_name' => 'Solomon Islands Dollar'],
            ['currency_id' =>'SOS', 'currency_name' => 'Somali Schilling'],
            ['currency_id' =>'ZAR', 'currency_name' => 'South African Rand'],
            ['currency_id' =>'LKR', 'currency_name' => 'Sri Lanka Rupee'],
            ['currency_id' =>'SHP', 'currency_name' => 'St. Helena Pound'],
            ['currency_id' =>'SDP', 'currency_name' => 'Sudanese Pound'],
            ['currency_id' =>'SRG', 'currency_name' => 'Suriname Guilder'],
            ['currency_id' =>'SZL', 'currency_name' => 'Swaziland Lilangeni'],
            ['currency_id' =>'SEK', 'currency_name' => 'Swedish Krona'],
            ['currency_id' =>'CHF', 'currency_name' => 'Swiss Franc'],
            ['currency_id' =>'SYP', 'currency_name' => 'Syrian Potmd'],
            ['currency_id' =>'TWD', 'currency_name' => 'Taiwan Dollar'],
            ['currency_id' =>'TZS', 'currency_name' => 'Tanzanian Schilling'],
            ['currency_id' =>'THB', 'currency_name' => 'Thai Baht'],
            ['currency_id' =>'TOP', 'currency_name' => 'Tongan Paanga'],
            ['currency_id' =>'TTD', 'currency_name' => 'Trinidad and Tobago Dollar'],
            ['currency_id' =>'TND', 'currency_name' => 'Tunisian Dinar'],
            ['currency_id' =>'TRY', 'currency_name' => 'Turkish Lira'],
            ['currency_id' =>'UGX', 'currency_name' => 'Uganda Shilling'],
            ['currency_id' =>'AED', 'currency_name' => 'United Arab Emirates Dirham'],
            ['currency_id' =>'UYU', 'currency_name' => 'Uruguayan Peso'],
            ['currency_id' =>'USD', 'currency_name' => 'US Dollar'],
            ['currency_id' =>'VUV', 'currency_name' => 'Vanuatu Vatu'],
            ['currency_id' =>'VEF', 'currency_name' => 'Venezualan Bolivar'],
            ['currency_id' =>'VND', 'currency_name' => 'Vietnamese Dong'],
            ['currency_id' =>'YER', 'currency_name' => 'Yemeni Rial'],
            ['currency_id' =>'CNY', 'currency_name' => 'Yuan (Chinese Renminbi)'],
            ['currency_id' =>'ZRZ', 'currency_name' => 'Zaire Zaire'],
            ['currency_id' =>'ZMK', 'currency_name' => 'Zambian Kwacha'],
            ['currency_id' =>'ZWD', 'currency_name' => 'Zimbabwe Dollar']
        ]);
    }
}