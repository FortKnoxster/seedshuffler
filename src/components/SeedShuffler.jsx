import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled/macro'
import { FormattedMessage, useIntl } from 'react-intl'
import {
  WL_ENGLISH,
  APP_BRAND_NAME,
  PDF_FILE_NAME,
} from '../constants/variables'
import { shuffleArray } from '../helpers/csprng'
import Select from 'react-select'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { bip39LanguageOptions } from '../helpers/ui'
import logo from '../assets/seedshuffler-logo.png'
import { NotoSansRegular } from '../assets/fonts/noto-sans/NotoSans-Regular-normal.js'
//import { MPLUS1 } from '../assets/fonts/mplus1/MPLUS1-normal.js'

// eslint-disable-next-line no-empty-pattern
const SeedShuffler = ({}) => {
  const intl = useIntl()
  const gridRef = useRef()
  const buttonRef = useRef()
  const [shuffledWordlist, setShuffledWordlist] = useState(null)
  const [wordlist, setWordlist] = useState(null)
  const [language, setLanguage] = useState(WL_ENGLISH)
  const [showSeed, setShowSeed] = useState(false)

  useEffect(() => {
    async function initWordlist() {
      const wl = await import(`../wordlists/${language}.json`)
      setWordlist(wl.default)
    }
    initWordlist()
  }, [language])

  async function generateSeedMatric() {
    try {
      const wordlistCopy = [...wordlist]
      const swl = await shuffleArray(wordlistCopy)
      const list = {}
      swl.forEach((word, index) => {
        const firstLetter = word.charAt(0).toUpperCase()
        if (!list[firstLetter]) {
          list[firstLetter] = []
        }
        list[firstLetter].push({ index: index + 1, word })
      })
      Object.keys(list).map((l) =>
        list[l].sort((a, b) => a.word.localeCompare(b.word)),
      )
      setShuffledWordlist(list)
    } catch (err) {
      console.error(err)
    }
  }

  function downloadPdf() {
    const doc = new jsPDF()

    doc.addFileToVFS('NotoSans-Regular-normal.ttf', NotoSansRegular)
    doc.addFont('NotoSans-Regular-normal.ttf', 'NotoSans-Regular', 'normal')
    doc.setFont('NotoSans-Regular')
    /*
    doc.addFileToVFS('MPLUS1-normal.ttf', MPLUS1)
    doc.addFont('MPLUS1.ttf', 'MPLUS1', 'normal')
    doc.setFont('MPLUS1')
    console.log('font size', doc.getFontSize())
    */

    //doc.addSvgAsImage(logo, 60, 5, 79, 13)

    doc.addImage(logo, 'PNG', 72, 5, 60, 38)
    doc.setFontSize(10)
    doc.text(intl.formatMessage({ id: 'pdf.intro.1' }), 10, 49)
    doc.text(intl.formatMessage({ id: 'pdf.intro.2' }), 10, 54)
    const maxCols = 14
    let y = 25
    Object.keys(shuffledWordlist)
      .sort()
      .forEach((letter, j) => {
        //doc.text(letter, x, y)
        y += 5
        //doc.text(shuffledWordlist[letter], 10, y)
        let text = ''

        let colIndex = 1
        let rowIndex = 0
        const rows = []
        shuffledWordlist[letter].forEach(({ word, index }, i) => {
          //y += 5
          text += `${word} ${index}  `
          if (colIndex > maxCols) {
            colIndex = 0
            ++rowIndex
            rows[rowIndex] = []
          }
          if (!rows[rowIndex]) {
            rows[rowIndex] = []
          }
          rows[rowIndex].push(
            {
              content: index,
              styles: {
                halign: 'right',
                cellPadding: 1,
                font: 'NotoSans-Regular',
                fontSize: 9,
                textColor: '#000000',
              },
            },
            {
              content: word,
              styles: {
                cellPadding: 1,
                font: 'NotoSans-Regular',
                fontSize: 9,
                textColor: '#000000',
              },
            },
          )
          colIndex += 2
        })
        const lineHeight = doc.getLineHeight(text) / doc.internal.scaleFactor
        const splittedText = doc.splitTextToSize(text, 190)
        //console.log('splittedText', splittedText)
        const lines = splittedText.length // splitted text is a string array
        const blockHeight = lines * lineHeight
        //console.log('rows', rows)
        //console.log('shuffledWordlist[letter]', shuffledWordlist[letter])
        autoTable(doc, {
          //head: [[{ content: shuffledWordlist[letter], colSpan: maxCols }]],
          head: [
            [
              {
                content: letter,
                colSpan: maxCols,
                styles: {
                  halign: 'left',
                  cellPadding: 1,
                  font: 'helvetica',
                  fontSize: 11,
                  textColor: '#000000',
                  fontStyle: 'bold',
                  fillColor: '#f3ba2f',
                },
              },
            ],
          ],
          body: rows,
          startY: j === 0 ? 60 : undefined,
          margin: 10,
          showHead: 'firstPage',
        })

        //const r = doc.text(splittedText, x, y)
        if (y >= 265) {
          y = 5
          //doc.addPage()
        } else {
          y += blockHeight
        }
        y += 5
      })

    if (navigator.share) {
      const blob = doc.output('blob', { filename: PDF_FILE_NAME })
      const file = new File([blob], PDF_FILE_NAME, { type: blob.type })
      navigator
        .share({
          title: 'My SeedShuffler Seedbook Matrix',
          url: 'https://seedshuffler.com',
          files: [file],
        })
        .then(() => {
          console.log('Share success!')
        })
        .catch((err) => {
          console.error(err)
          doc.save(PDF_FILE_NAME)
        })
    } else {
      doc.save(PDF_FILE_NAME)
    }
  }

  function handleLanguageChange(e) {
    const { value } = e
    setLanguage(value)
  }

  function showSeedMatrix() {
    setShowSeed(!showSeed)
    setTimeout(() => {
      window.scrollTo(0, buttonRef.current.offsetTop - 20)
    }, 250)
  }

  return (
    <Container>
      <h1>
        <FormattedMessage id="seed.title" />
      </h1>
      <h2 className="title">
        <FormattedMessage id="seed.subtitle" />
      </h2>
      <p className="intro-text">
        <FormattedMessage
          id="seed.intro.1"
          values={{
            number: (
              <span className="underline">
                {intl.formatMessage({ id: 'number' })}
              </span>
            ),
          }}
        />
      </p>
      <Ol>
        <li className="intro-text">
          <FormattedMessage id="seed.bullet.1" />
        </li>
        <li className="intro-text">
          <FormattedMessage id="seed.bullet.2" />
        </li>
        <li className="intro-text">
          <FormattedMessage id="seed.bullet.3" />
        </li>
        <li className="intro-text">
          <FormattedMessage id="seed.bullet.4" />
        </li>
        <li className="intro-text">
          <FormattedMessage id="seed.bullet.5" />
        </li>
      </Ol>
      <p className="intro-text">
        <FormattedMessage id="seed.intro.2" />
      </p>
      <p className="intro-text">
        <FormattedMessage id="seed.intro.3" />
      </p>
      {!Boolean(shuffledWordlist) && (
        <GenerateWrapper>
          <SelectWrapper>
            <Select
              name="language"
              options={bip39LanguageOptions}
              defaultValue={bip39LanguageOptions[0]}
              value={bip39LanguageOptions.find((o) => o.value === language)}
              onChange={handleLanguageChange}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  border: `2px solid var(--theme-brand)`,
                  '&:hover': {
                    borderColor: 'var(--theme-brand)',
                  },
                  '&:focus': {
                    border: `2px solid var(--theme-brand)`,
                  },
                }),
              }}
            />
          </SelectWrapper>
          <button
            className="button"
            disabled={!wordlist}
            onClick={() => generateSeedMatric()}
          >
            <FormattedMessage id="seed.button.generate" />
          </button>
        </GenerateWrapper>
      )}
      {Boolean(0) && (
        <h2 className="subtitle">
          <FormattedMessage id="seed.yourSeed" />
        </h2>
      )}

      {Boolean(shuffledWordlist) && (
        <>
          <Panel>
            <button
              ref={buttonRef}
              className="button button-inverse"
              disabled={!wordlist}
              onClick={() => downloadPdf()}
            >
              <FormattedMessage id="seed.button.download" />
            </button>
            {showSeed ? (
              <ShowSeedMatrix onClick={() => setShowSeed(!showSeed)}>
                <FormattedMessage id="seed.hideSeed" />
              </ShowSeedMatrix>
            ) : (
              <ShowSeedMatrix onClick={() => showSeedMatrix()}>
                <FormattedMessage id="seed.showSeed" />
              </ShowSeedMatrix>
            )}
          </Panel>

          {showSeed && (
            <Grid ref={gridRef}>
              {Boolean(shuffledWordlist) &&
                Object.keys(shuffledWordlist)
                  .sort()
                  .map((letter) => {
                    return (
                      <WordBox key={letter}>
                        <h3>{letter}</h3>
                        {shuffledWordlist[letter].map(({ word, index }) => {
                          return (
                            <div key={index} className="wordlist">
                              <div>{index}</div>
                              <div>{word}</div>
                            </div>
                          )
                        })}
                      </WordBox>
                    )
                  })}
            </Grid>
          )}
        </>
      )}
    </Container>
  )
}

export default SeedShuffler

const Container = styled.div({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1.5rem 2.2rem',
  width: '80%',
  height: '100%',
  h3: {
    maxWidth: '55%',
  },
  p: {
    maxWidth: '55%',
    minWidth: '55%',
    '@media (max-width: 2200px)': {
      maxWidth: '75%',
      minWidth: '75%',
    },
    '@media (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
  '@media (max-width: 768px)': {
    width: '90%',
  },
})

const Ol = styled.ol({
  maxWidth: '55%',
  minWidth: '55%',
  margin: '10px 0',
  paddingLeft: 45,
  '@media (max-width: 2200px)': {
    maxWidth: '75%',
    minWidth: '75%',
  },
  '@media (max-width: 768px)': {
    maxWidth: '100%',
    marginLeft: 0,
    paddingLeft: 15,
  },
  li: {
    marginBottom: 10,
  },
})

const Panel = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '35%',
  '& .button': {
    marginTop: 40,
    '@media (max-width: 768px)': {
      marginTop: 20,
    },
  },
  '@media (max-width: 2200px)': {
    maxWidth: '55%',
  },
  '@media (max-width: 768px)': {
    width: '100%',
    maxWidth: '100%',
  },
})

const Grid = styled.div({
  width: '90%',
  padding: '1.5rem 2.2rem',
  display: 'grid',
  gap: '1.2rem',
  gridTemplateColumns: 'repeat(5, 1fr)',
  '@media (max-width: 2200px)': {
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
  '@media (max-width: 1024px)': {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
  '@media (max-width: 768px)': {
    width: '95%',
    gap: '1.4rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
})

const WordBox = styled.code({
  position: 'relative',
  padding: '1rem',
  height: 280,
  transition: 'transform 100ms ease-in',
  backgroundColor: 'var(--theme-wordbox-background)',
  color: '#2e2e2e',
  overflow: 'auto',
  textAlign: 'left',
  width: '90%',
  '& .wordlist': {
    display: 'flex',
    justifyContent: 'space-between',
  },
  h3: {
    margin: '0 0 10px 0',
    padding: 0,
  },
})

const GenerateWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '35%',
  '@media (max-width: 2200px)': {
    maxWidth: '55%',
  },
  '@media (max-width: 768px)': {
    width: '100%',
    maxWidth: '100%',
  },
})

const SelectWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 40,
  marginBottom: 40,
  '@media (max-width: 768px)': {
    marginTop: 20,
    marginBottom: 20,
  },
})

const ShowSeedMatrix = styled.div({
  textDecoration: 'underline',
  textAlign: 'center',
  cursor: 'pointer',
  marginTop: 40,
  marginBottom: 20,
  '&:hover': {
    textDEcoration: 'none',
  },
  '@media (max-width: 768px)': {
    marginTop: 20,
    marginBottom: 10,
  },
})
