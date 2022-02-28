import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'

let TEXT = `
Online Banking transfer to CHK 7325 Confirmation# 3555236074
Online Transfer to CHK ...2863 transaction#: 9178118821
HK BEST DIM SUM INC 10/25 PURCHASE SAN JOSE CA
PAYPAL DES:INST XFER ID:APPLE.COM BILL INDN:JEAN-CLAUDE LANDAU CO ID:PAYPALSI77 WEB
Debit PIN Purchase - FOOD 4 LESS 012 1465 CRPASO ROBLES CAUS05154
POS CARL'S JR 445 - MEMO=PURCHASE 08/29 SAN DIEGO CA CARD 2758
Withdrawal Aspen Financial CO: Aspen Financial
POS Card purchase FLYERS 201382 - MEMO=POS Card purchase FLYERS 201382 5541 56269 TWENTYNINE PALMS YUCCA VALLEY CA
TROYS BURGERS 07/04 PURCHASE SAN PEDRO CA
Electronic Deposit Robinhood
VALLEJO SINCLAIR 101 LINCOLN ROAD WEST VALLEJO CAUS
DOLLAR GENERAL 07/20 PURCHASE RIVERDALE CA
WAL-MART #1660 08/14 PURCHASE PALMDALE CA
POS MARUTI VALERO ANDERSON - MEMO=PURCHASE 05/28 ANDERSON CA CARD 7818
SUBWAY 03304342 STOCKTON CA 02/26 DEBIT_CARD
Withdrawal ACH OverdraftFee
POS COFFEE BEAN STORE - MEMO=PURCHASE 06/26 LA PALMA CA CARD 3505
ATM WITHDRAWAL 002770 02/0444325 CHA ATM
INT INTEREST PAYMENT
Online Transfer from SAV ...3091 transaction#: 9525704667
PAYPAL DES:INST XFER ID:USPOSTALSER INDN:CHERYLL COMBS CO ID:PAYPALSI77 WEB
MCDONALD'S F30904 HEMET CA 01/12 DEBIT_CARD
DEBIT CHEVRON 0210285 0 ELK GROVE CA - MEMO=CHEVRON 0210285 0 ELK GROVE CA US
Withdrawal #080517 / CASINO LIQUOR 16924 S WESTERN AV GARDENA CA %% Card 15 #9202
DEBIT ATM WITHDRAWAL - MEMO=03/08 1221 W. REDONDO BEACH BLV GARDENA CA 0408A 5205
ATM Service Charge Reversal ATM
GOOD STUFF BURGERS LOS ANGELES CA 08/31 DEBIT_CARD
AVIS RENT-A-CAR 11/02 PURCHASE LOS ANGELES CA
DEBIT CAPITAL ONE CRCARDPMT 2009 - MEMO=BUSINESS TO BUSINESS ACH 08 025230180028728 WEBB JOE
POS PHILS FISH GRILL - MEMO=PURCHASE 02/29 TORRANCE CA CARD 8852
POS HOP HING'S NAPA - MEMO=PURCHASE 06/25 NAPA CA CARD 4463
Check Card: HOTELSCOM9196032056745 HOTELS.COM WA 06/18/20%% Card 17 #57
POS 7-ELEVEN COMPTON CA 7-ELEVEN O
99 CENTS ONLY STO 12/28 PURCHASE SAN BERNARDIN CA
AMAZON.COM*MV31I1V81 SEATTLE WA Card 5896/Withdrawal Bill Payment #GFI5415J8CQG DEBIT
GEICO AUTO WASHINGTON DCUS - MEMO=GEICO AUTO WASHINGTON DCUS
ML PLUS LOAN MONEYLION PPD ID: 8800008293 ACH_DEBIT
Debit Card Purchase 11/03 04:48p #0569 - MCDONALD'S F7818 FRESNO CA 19308
Debit Card Purchase 01/27 06:23p #4823 - CA FAST AUTO LOANS 800-9228803 CA 20029
OLIVE GARDEN 0 4195 CENTURY BLVD - MEMO=OLIVE GARDEN 0 4195 CENTURY BLVD PITTSBURG CAUS
DIRECTDEBIT ACE CASH EXPRESS LOANPAYMNT - MEMO=112119 000000027371872 20000538302360000
Everi 03/09 #000149522 WITHDRWL Everi FRIANT CA FEE
POS SHELL SERVICE STATION - MEMO=PURCHASE 06/19 CYPRESS CA CARD 3505
INTERNATIONAL TRANSACTION FEE 02/02 CYBERBOOSTS NEWPORT
SQ *BEAN N BREW ON 532 07/10 PURCHASE CAMANO ISLAND WA
TACO BELL #3120 ANAHEIM CA 02/28 DEBIT_CARD
Electronic Withdrawal Big Picture Loan
WM SUPERC Wal-Mart Sup KELLER TX 05/13 DEBIT_CARD
UBER *TRIP 800-592-8996 CA 10/05 DEBIT_CARD
DEBIT DOORDASH DASHPASS - MEMO=RECURRING PAYMENT 10/28 WWW.DOORDASH. CA CARD 3347
VITALITY BOWLS 35111 NEWARK BLVD - MEMO=VITALITY BOWLS 35111 NEWARK BLVD STE GNEWARK CAUS
NETFLIX.COM 04/06 PURCHASE NETFLIX.COM CA
POS CHEVRON 0097947 - MEMO=PURCHASE 04/03 CAMERON PARK CA CARD 2032
ARCO#83451GIL MOORE OIL 8361 SHELDON Debit Card Withdrawal: Visa Debit
UBER TRIP 10/07 PURCHASE HELP.UBER.COM CA
BUDS JOLLY KONE RED BLUFF CA 11/02 DEBIT_CARD
CASH APP*MARIROD 8774174551 CA 09/16 DEBIT_CARD
JACK IN THE BOX 0054 03/04 PURCHASE EL CAJON CA
Online Banking transfer from SAV 2741 Confirmation# 7515852601
XX5100 CHK PURCHASE APPLEBEES CAMA15 CAM ARILLO CA 07 063708
Credit Voucher ZELGALLEGOS AMAND - MEMO=Credit Voucher ZELGALLEGOS AMANDA Visa Direct AZ Date 120619 220 6012
MCDONALD'S F23304 05/03 PURCHASE SOUTH EL MONT CA
POS TST* PHO KING WAY- - MEMO=PURCHASE 03/29 MISSION VIEJO CA CARD 0339
ATM ATM864511 1625 N. MARKET STREET - MEMO=ATM864511 1625 N. MARKET STREET VDPS0 GOLDEN 1 CREDIT UNION SACRAMENTO CA US
Debit: Foreign Transaction Surcharge
SQ *BAD ASS COFFEE 11/09 PURCHASE SAN DIEGO CA
Entrance Bar & Lounge Arcadia CA 03/24 DEBIT_CARD
Zelle Transfer Conf# 234465337; ELIJAH A LARIOS
ATM CHECK DEPOSIT - MEMO=09/15 4649 CARMEL MOUNTAIN RD San Diego CA 9929C 2758
Chevron CC DES:CHVTX EPAY ID:60859367 INDN: 7061592014379074 CO ID:XXXXX72103 WEB
LA LOGGIA 06/18 PURCHASE STUDIO CITY CA
FOREIGN EXCHANGE RATE ADJUSTMENT FEE 12/29HOXTON GR FEE_TRANSACTION
Debit PIN Purchase - WAL-MART #1692 COLTON CAUS05154
POS VERIZON-VICTRA CA - MEMO=PURCHASE 05/29 ROSEVILLE CA CARD 0604
Online Transfer from CHK ...5385 transaction#: 9801112621 ACCT_XFER
Online Transfer from CHK ...5669 transaction#: 8920524791 ACCT_XFER
MCDONALD'S F3848 09/13 PURCHASE COLTON CA
AMZN MKTP US*M62XQ3O90 06/05 PURCHASE AMZN.COM/BILL WA
Check 3894
CHECK #3857
STARBUCKS 02/20 PURCHASE 800-782-7282 WA
WM SUPERC Wal- 02/26 PURCHASE SOUTH GATE CA
ATM CASH DEPOSIT - MEMO=12/05 32222 CAMINO CAPISTRNO SAN JUAN CAP CA 2314I 7816
TARGET DEBIT CRD ACH TRAN CO ID:XXXXX15170 POS TARGET -1980 REDONDO BEACH CA
DEBIT RALPHS #0755 ALISO VIEJO CA
AT&T S253 5953 05/29 PURCHASE ELK GROVE CA
DISCOUNT MARKET INGLEWOOD CA 135058 05/05 DEBIT_CARD
DOMINO'S 8174 09/10 PURCHASE COVINA CA
PROGRESSIVE LEASING 09/14 PURCHASE https://progl UT
SAFEWAY #0256 CHICO CA 360016 08/29 DEBIT_CARD
AMZN DIGITAL*EC4ZM40T3 03/30 PURCHASE 888-802-3080 WA
DEBIT ATM WITHDRAWAL - MEMO=09/24 29265 N CENTRAL AVE LAKE ELSINORE CA 9944G 7604
Amazon Prime*MS38X4A Amzn.com/bill WA 06/21 DEBIT_CARD
SPOTLOAN ACH Withdrawal: SPOTLOAN
DEBIT - MEMO=Whdr Paid NSF Fee
WFGINSURANCEAGENCY 770-246-9889 GA 04/02 DEBIT_CARD
PANERA BREAD #203263 5626685097 CA 1331 W
MY NAILS A 4401 CENTURY BLVD PIT - MEMO=MY NAILS A 4401 CENTURY BLVD PITTSBURG CAUS
POS WAL-MART Wal-Mart Sup - MEMO=PURCHASE 09/28 ANAHEIM CA CARD 3505
STATERBROS022 4680 LA RIVERSIDE CA 506227 01/11 DEBIT_CARD
`

const newText = TEXT.split('\n').filter((item) => item.length > 0)

const Content = () => {
  return (
    <div style={{ overflowY: 'scroll', height: '95vh' }}>
      <Table>
        <TableHead
          style={{
            position: 'sticky',
            top: '0',
            zIndex: 100,
            backgroundColor: '#000',
          }}
        >
          <TableRow>
            <TableCell style={{ color: '#FFF', fontSize: 18 }}>
              All Transactions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newText.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Content
