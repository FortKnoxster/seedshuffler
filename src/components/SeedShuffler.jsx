import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled/macro'
import { FormattedMessage, useIntl } from 'react-intl'
import { WL_ENGLISH, PDF_FILE_NAME } from '../constants/variables'
import { shuffleArray } from '../helpers/csprng'
import Select from 'react-select'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { bip39LanguageOptions, loadFont } from '../helpers/ui'
import { isMobile } from '../helpers/utils'
import logo from '../assets/seedshuffler-logo.png'
import DownloadModal from './DownloadModal'

const showLanguageSelector = false

// eslint-disable-next-line no-empty-pattern
const SeedShuffler = ({}) => {
  const intl = useIntl()
  const gridRef = useRef()
  const buttonRef = useRef()
  const [shuffledWordlist, setShuffledWordlist] = useState(null)
  const [wordlist, setWordlist] = useState(null)
  const [currentFont, setCurrentFont] = useState(null)
  const [language, setLanguage] = useState(WL_ENGLISH)
  const [showSeed, setShowSeed] = useState(false)
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false)

  useEffect(() => {
    async function initWordlist() {
      const wl = await import(`../wordlists/${language}.json`)
      setWordlist(wl.default)
      setCurrentFont(await loadFont(language))
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

  async function preparePdf() {
    const doc = new jsPDF()
    doc.addImage(logo, 'PNG', 67, 10)
    doc.setFontSize(10)
    const { font, fontName, fileName, fontSize } = currentFont //await loadFont(language)
    doc.addFileToVFS(fileName, font)
    doc.addFont(fileName, fontName, 'normal')
    doc.setFont(fontName)
    return { doc, fontName, fontSize }
  }

  async function downloadPdf() {
    const { doc, fontName, fontSize } = await preparePdf()

    doc.text(intl.formatMessage({ id: 'pdf.intro.1' }), 10, 29)
    doc.text(intl.formatMessage({ id: 'pdf.intro.2' }), 10, 34)

    const maxCols = 14

    Object.keys(shuffledWordlist)
      .sort()
      .forEach((letter, j) => {
        let colIndex = 1
        let rowIndex = 0
        const rows = []
        shuffledWordlist[letter].forEach(({ word, index }, i) => {
          if (colIndex > maxCols) {
            colIndex = 1
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
                font: fontName,
                fontSize: fontSize,
                textColor: '#000000',
              },
            },
            {
              content: word,
              styles: {
                cellPadding: 1,
                font: fontName,
                fontSize: fontSize,
                textColor: '#000000',
              },
            },
          )
          colIndex += 2
        })

        autoTable(doc, {
          head: [
            [
              {
                content: letter,
                styles: {
                  halign: 'center',
                  cellPadding: 1,
                  font: fontName,
                  fontSize: 12,
                  textColor: '#000000',
                  fontStyle: 'bold',
                  fillColor: '#f3ba2f',
                },
              },
              {
                content: '',
                colSpan: maxCols - 1,
                styles: {
                  cellPadding: 1,
                  fillColor: '#f3ba2f',
                },
              },
            ],
          ],
          body: rows,
          startY: j === 0 ? 41 : undefined,
          margin: 10,
          showHead: 'firstPage',
        })
      })

    // Create PDF footer

    doc.autoTable({
      html: '#pdf-footer',
      alternateRowStyles: { fillColor: '#ffffff' },
      margin: 8,
      styles: {
        cellPadding: 2,
        font: fontName,
        fontSize: 11,
        textColor: '#000000',
        fillColor: '#ffffff',
        fontStyle: 'bold',
      },
      didDrawPage: (e) => {
        const { y } = e.cursor
        doc.setTextColor('#000000')
        doc.setFontSize(16)

        const signupLink = intl.formatMessage({ id: 'signup.link' })
        doc.textWithLink(signupLink, 65, y + 10, {
          url: 'https://diefi.fortknoxster.com/register?ref=SeedShuffler',
          //url: 'https://fortknoxster.com/',
        })
        const textWidth = doc.getTextWidth(signupLink)
        doc.setFillColor('#000000')
        doc.line(65, y + 11, 65 + textWidth, y + 11, 'F')

        doc.setFontSize(11)
        doc.setTextColor('#000000')
        doc.setFillColor('#000000')
        const visitLink = intl.formatMessage({ id: 'pdf.footer.3' })
        doc.textWithLink(visitLink, 50, y + 30, {
          url: 'https://fortknoxster.com/',
        })
        const textWidth2 = doc.getTextWidth(visitLink)
        doc.line(50, y + 31, 50 + textWidth2, y + 31, 'F')
      },
    })

    const pageCount = doc.internal.getNumberOfPages()

    // For each page, print the page number and the total pages
    for (let i = 1; i <= pageCount; i++) {
      // Go to page i
      doc.setPage(i)
      doc.text(
        intl.formatMessage(
          { id: 'pdf.footer.timestamp' },
          { timestamp: new Date().toGMTString() },
        ),
        10,
        290,
        null,
        null,
        'left',
      )
      //Print Page 1 of 4 for example
      doc.text(
        intl.formatMessage(
          { id: 'pdf.footer.pageNumbers' },
          { x: String(i), y: String(pageCount) },
        ),
        200,
        290,
        null,
        null,
        'right',
      )
    }

    if (navigator.share && isMobile()) {
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

  function reshuffleSeedMatrix() {
    if (
      window.confirm(intl.formatMessage({ id: 'seed.alert.confirmReshuffle' }))
    ) {
      setShuffledWordlist(null)
      generateSeedMatric()
    }
  }

  return (
    <Container>
      <h1>
        <FormattedMessage id="seed.title" />
      </h1>
      <h2 className="title">
        <FormattedMessage id="seed.subtitle" />
      </h2>
      <ExplainerVideo className="intro-text">
        <a
          href="https://youtu.be/W_Z9ysETLR4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage id="nav.ex.title" />
        </a>
      </ExplainerVideo>
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
      <p className="intro-text">
        <FormattedMessage
          id="seed.disclaimer.text.1"
          values={{
            important: (
              <strong>
                {intl.formatMessage({ id: 'seed.disclaimer.title' })}
              </strong>
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

      {!Boolean(shuffledWordlist) && (
        <GenerateWrapper>
          {showLanguageSelector && (
            <SelectWrapper>
              <Select
                name="language"
                options={bip39LanguageOptions}
                defaultValue={bip39LanguageOptions[0]}
                value={bip39LanguageOptions.find((o) => o.value === language)}
                onChange={handleLanguageChange}
                styles={{
                  control: (styles, state) => ({
                    ...styles,
                    border: `2px solid var(--theme-brand)`,
                    borderColor: 'var(--theme-brand)',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: 'var(--theme-brand)',
                    },
                    '&:focus': {
                      border: `2px solid var(--theme-brand)`,
                    },
                    backgroundColor: 'var(--theme-dropdown-background)',
                  }),
                  singleValue: (styles) => ({
                    ...styles,
                    color: 'var(--theme-font)',
                  }),
                  menu: (styles) => ({
                    ...styles,
                    backgroundColor: 'var(--theme-dropdown-background)',
                    border: `2px solid var(--theme-brand)`,
                  }),
                  option: (styles) => ({
                    ...styles,
                    backgroundColor: 'inherit',
                    cursor: 'pointer',
                    color: 'var(--theme-font)',
                    //fontWeight: 400,
                    //fontSize: '1.25rem',
                    '&:hover': {
                      backgroundColor: 'var(--theme-brand)',
                      color: '#ffffff',
                    },
                  }),
                }}
              />
            </SelectWrapper>
          )}
          <button
            className="button"
            disabled={!wordlist}
            onClick={() => generateSeedMatric()}
          >
            <FormattedMessage id="seed.button.generate" />
          </button>
          <p className="intro-text">
            <FormattedMessage id="seed.disclaimer.text.2" />
          </p>
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
              onClick={() => setShowDownloadPrompt(true)}
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
            <ReshuffleSeedMatrix onClick={() => reshuffleSeedMatrix()}>
              <FormattedMessage id="seed.reshuffle" />
            </ReshuffleSeedMatrix>
            <p className="intro-text">
              <FormattedMessage id="seed.disclaimer.text.2" />
            </p>
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

      <table className="hidden" id="pdf-footer">
        <tbody>
          <tr>
            <td>{intl.formatMessage({ id: 'pdf.footer.1' })}</td>
          </tr>
          <tr>
            <td>{intl.formatMessage({ id: 'pdf.footer.2' })}</td>
          </tr>
        </tbody>
      </table>
      <DownloadModal
        hasAppMenu={true}
        onDownload={downloadPdf}
        isVisible={showDownloadPrompt}
        onClose={() => setShowDownloadPrompt(false)}
      />
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
  paddingLeft: 55,
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
    paddingLeft: 10,
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
    width: '55%',
  },
  '@media (max-width: 1000px)': {
    width: '100%',
  },
  '@media (max-width: 768px)': {
    width: '100%',
    maxWidth: '100%',
  },
  h2: {
    paddingTop: 22,
    paddingBottom: 20,
  },
  p: {
    width: '100%',
    minWidth: '100%',
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
  //color: '#2e2e2e',
  overflow: 'auto',
  textAlign: 'left',
  width: '90%',
  '& .wordlist': {
    display: 'flex',
    justifyContent: 'space-between',
  },
  h3: {
    margin: '0 0 10px 0',
    color: 'var(--theme-brand)',
    padding: 0,
  },
})

const GenerateWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 40,
  width: '35%',
  '@media (max-width: 2200px)': {
    width: '55%',
  },
  '@media (max-width: 1000px)': {
    width: '90%',
  },
  '@media (max-width: 768px)': {
    width: '100%',
    maxWidth: '100%',
  },
  h2: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  p: {
    marginTop: 50,
    width: '100%',
    minWidth: '100%',
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
  color: 'var(--theme-reshuffle-actions)',
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

const ReshuffleSeedMatrix = styled(ShowSeedMatrix)({
  marginTop: 20,
})

const ExplainerVideo = styled.p({
  textAlign: 'center',
  paddingBottom: 20,
  marginBottom: 0,
  a: {
    color: 'var(--theme-font)',
    ':hover': {
      color: 'var(--theme-brand)',
    },
  },
})
