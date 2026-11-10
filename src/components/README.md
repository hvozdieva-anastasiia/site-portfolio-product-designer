# Components

The UI is built bottom-up in five layers. Each component lives in its own
folder with its code, its styles and its Storybook stories:

```
Button/
  Button.tsx          the component
  Button.css          only this component's styles
  Button.stories.tsx  how it looks, and an accessibility check
```

| Layer         | Folder           | What it is                                       | Examples                                                                                                                                                           |
| ------------- | ---------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Atoms         | `atoms/`         | The smallest pieces. No knowledge of the site.   | `Button`, `Key`, `Kbd`, `Chip`, `Pill`, `Glyph`, `Avatar`, `Label`, `TextLink`, `Input`, `Display`, `Icon`, `Slab`, `Aurora`, `Skeleton`, `ToolTile`, `RouterLink` |
| Molecules     | `molecules/`     | A few atoms working as one unit.                 | `SectionHead`, `Field`, `SegmentedRadios`, `MediaCard`, `QuoteFigure`, `ProcessList`, `PagerControls`, `SocialLinks`, `Wordmark`, `ThemeToggle`, `DialogCard`      |
| Illustrations | `illustrations/` | Decorative drawings built from atoms.            | `ArticleArt`, `CaseArt`, `CharacterScene`                                                                                                                          |
| Organisms     | `organisms/`     | Larger parts with their own behaviour.           | `CaseCard`, `ProcessStage`, `ToolkitPanel`, `ReviewsSlider`, `ContactForm`, `ContactDialog`, `RiveSlot`                                                            |
| Blocks        | `blocks/`        | **The sections of the page.** Each stands alone. | `Header`, `Hero`, `Cases`, `Articles`, `Talks`, `Toolkit`, `Reviews`, `Contact`, `Footer`                                                                          |

Pages live in `src/pages/` and only wire content into blocks.

## Rules (enforced by ESLint)

1. **Only import downwards.** atoms → molecules → organisms → blocks → pages.
   Illustrations sit beside molecules and use atoms only.
2. **Blocks never import other blocks.** That is what makes each one portable.
3. **Components never import site data.** Content arrives through props. The one
   exception is `content/types`, for shared types. (Stories may use the data.)
4. **Styles stay with the component.** A component imports its own `.css`.
   Colours, spacing and fonts come from the tokens in `src/styles/tokens.css`,
   which also hold the dark theme.

## Moving, reusing and making new versions

- **Move a block to another page:** import it and pass it props. For example
  `<Cases items={cases} heading={...} />` works on any page.
- **Make a new version of the site:** copy `src/pages/HomePage`, reorder or drop
  blocks, change the content passed in. Nothing else needs to change.
- **Change a look everywhere:** edit the atom (for example `Button.css`).
- **Change one section only:** edit that block's folder. It cannot affect the others.

## Adding a component

1. Pick the lowest layer that fits.
2. Create `Name/Name.tsx`, `Name/Name.css` and `Name/Name.stories.tsx`.
3. Prefer explicit variants (`variant="carbon"`) and `children` over boolean
   props and render props.
4. Export it from the layer's `index.ts`.
